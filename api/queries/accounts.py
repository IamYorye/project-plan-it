from pydantic import BaseModel
import os
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class AccountIn(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str


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
                        first_name, last_name, email, password
                    )
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, first_name, last_name, password
                    """,
                    [
                        account.first_name,
                        account.last_name,
                        account.email,
                        hashed_password
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
            hashed_password=hashed_password)


class DuplicateAccountError(ValueError):
    pass
