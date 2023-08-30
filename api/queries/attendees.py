import os
from psycopg_pool import ConnectionPool
from typing import List, Union, Optional
from pydantic import BaseModel, ValidationError

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


class ProjectAttendeeOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str


class AttendeeIn(BaseModel):
    project_id: int
    account_id: int


class AttendeeOut(BaseModel):
    id: int
    project_id: int
    account_id: int


class AttendeeRepo:
    def create(self, attendee: AttendeeIn) -> AttendeeOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO attendees (
                            project_id, account_id
                        )
                        VALUES (%s, %s)
                        RETURNING id, project_id, account_id
                        """,
                        [attendee.project_id, attendee.account_id],
                    )
                    id = result.fetchone()[0]
                    return self.attendee_in_to_out(id, attendee)
        except Exception as e:
            print(e)
            return {"message": "Could not create attendee"}

    def attendee_in_to_out(self, id: int, attendee: AttendeeIn):
        return AttendeeOut(
            id=id,
            project_id=attendee.project_id,
            account_id=attendee.account_id,
        )

    def get_attendees(
        self, project_id: int
    ) -> Union[Error, List[ProjectAttendeeOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT account.id, account.first_name, account.last_name, account.email, account.username
                        FROM account
                        INNER JOIN attendees
                        ON account.id = attendees.account_id
                        INNER JOIN project
                        ON project.id = attendees.project_id
                        WHERE project.id = %s
                        """,
                        [project_id],
                    )
                    return [
                        ProjectAttendeeOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            email=record[3],
                            username=record[4],
                        )
                        for record in db.fetchall()
                    ]
        except ValidationError as e:
            print(e)
            return {"message": "Could not get attendees"}
