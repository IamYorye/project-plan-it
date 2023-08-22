import os
from psycopg_pool import ConnectionPool
from typing import List, Union, Optional
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


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
                        [
                            attendee.project_id,
                            attendee.account_id
                        ],
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
            account_id=attendee.account_id
        )
