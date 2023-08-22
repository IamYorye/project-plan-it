from queries.attendees import (
    AttendeeIn,
    AttendeeRepo,
    AttendeeOut,
    ProjectAttendeeOut,
)
from fastapi import APIRouter, Depends
from authenticator import authenticator
from typing import Union, List
from queries.attendees import Error

router = APIRouter()


@router.post("/api/attendees", response_model=AttendeeOut)
async def create_attendee(
    info: AttendeeIn,
    repo: AttendeeRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    attendee = repo.create(info)
    return attendee


@router.get(
    "/api/attendees/{project_id}",
    response_model=Union[List[ProjectAttendeeOut], Error],
)
def get_project_attendees(
    project_id: int,
    repo: AttendeeRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_attendees(project_id)
