import os
from psycopg_pool import ConnectionPool
from typing import List, Union, Optional
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class AccountOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    years_of_experience: Optional[int]
    education: Optional[str]
    picture: Optional[str]
    is_mentor: bool = False


class AccountIn(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    years_of_experience: Optional[int]
    education: Optional[str]
    picture: Optional[str]
    is_mentor: bool = False


class AccountRepository:
    def get_all_accounts(self) -> Union[Error, List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , first_name
                            , last_name
                            , email
                            , password
                            , years_of_experience
                            , education
                            , picture
                            , is_mentor
                        FROM account
                        ORDER BY first_name, last_name;
                        """
                    )

                    return [
                        AccountOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            email=record[3],
                            password=record[4],
                            years_of_experience=record[5],
                            education=record[6],
                            picture=record[7],
                            is_mentor=record[8],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}

    def get_account(self, account_id: int) -> Optional[AccountOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , first_name
                            , last_name
                            , email
                            , password
                            , years_of_experience
                            , education
                            , picture
                            , is_mentor
                        FROM account
                        WHERE id = %s
                        """,
                        [account_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def delete_account(self, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                    DELETE FROM account
                    WHERE id = %s
                    """,
                        [account_id],
                    )
                return True
        except Exception as e:
            print(e)
            return False

    def update_account(self, account_id: int, account: AccountIn) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE account
                        SET first_name = %s
                            , last_name = %s
                            , email = %s
                            , password = %s
                            , years_of_experience = %s
                            , education = %s
                            , picture = %s
                            , is_mentor = %s
                        WHERE id = %s
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.password,
                            account.years_of_experience,
                            account.education,
                            account.picture,
                            account.is_mentor,
                            account_id
                        ]
                    )
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not update that account"}

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out(self, record):
        return AccountOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            password=record[4],
            years_of_experience=record[5],
            education=record[6],
            picture=record[7],
            is_mentor=record[8],
        )


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountRepo:
    def get(self, email: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, email, first_name, last_name, password
                    FROM account
                    WHERE email = %s;
                    """,
                    [email],
                )
                ac = cur.fetchone()
                return AccountOutWithPassword(
                    id=ac[0],
                    email=ac[1],
                    first_name=ac[2],
                    last_name=ac[3],
                    hashed_password=ac[4]
                )

    def create(
            self,
            account: AccountIn,
            hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO account (
                        first_name, last_name, email, password, years_of_experience, education, picture, is_mentor
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, first_name, last_name, password, years_of_experience, education, picture, is_mentor
                    """,
                    [
                        account.first_name,
                        account.last_name,
                        account.email,
                        hashed_password,
                        account.years_of_experience,
                        account.education,
                        account.picture,
                        account.is_mentor
                    ],
                )
                id = result.fetchone()[0]
                return self.account_in_to_out(id, account, hashed_password)

    def account_in_to_out(self, id: int, account: AccountIn, hashed_password):
        return AccountOutWithPassword(
            id=id,
            email=account.email,
            first_name=account.first_name,
            last_name=account.last_name,
            hashed_password=hashed_password,
            years_of_experience=account.years_of_experience,
            education=account.education,
            picture=account.picture,
            is_mentor=account.is_mentor
        )


class DuplicateAccountError(ValueError):
    pass