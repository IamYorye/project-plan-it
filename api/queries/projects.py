from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class ProjectIn(BaseModel):
    project_name: str
    project_picture: str
    goal: str
    is_completed: bool = False
    owner_id: int


class ProjectOut(BaseModel):
    id: int
    project_name: str
    project_picture: str
    goal: str
    is_completed: bool = False
    owner_id: int


class ProjectRepository:

    def delete(self, project_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM project
                        WHERE id = %s
                        """,
                        [project_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def create(self, project: ProjectIn) -> ProjectOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO project
                        (project_name, project_picture, goal, is_completed, owner_id)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        project.project_name,
                        project.project_picture,
                        project.goal,
                        project.is_completed,
                        project.owner_id
                    ]
                )
                id = result.fetchone()[0]
                old_data = project.dict()
                return ProjectOut(id=id, **old_data)
