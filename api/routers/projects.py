from fastapi import APIRouter, Depends
from typing import Union
from queries.projects import ProjectIn, ProjectRepository, ProjectOut, Error

router = APIRouter()


@router.post("/projects", response_model=Union[ProjectOut, Error])
def create_project(
        project: ProjectIn,
        repo: ProjectRepository = Depends(),
):
    try:
        created_project = repo.create(project)
        return created_project
    except Exception as e:
        error_message = "An error occurred while processing the request."
        return Error(message=error_message)


@router.delete("/projects/{project_id}", response_model=bool)
def delete_project(
    project_id: int,
    repo: ProjectRepository = Depends(),
) -> bool:
    return repo.delete(project_id)
