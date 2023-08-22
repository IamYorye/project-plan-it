from queries.attendees import AttendeeIn, AttendeeRepo, AttendeeOut
from fastapi import APIRouter, Depends
from authenticator import authenticator

router = APIRouter()

@router.post("/api/attendees", response_model=AttendeeOut)
async def create_attendee(
    info: AttendeeIn,
    repo: AttendeeRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),

):
    attendee = repo.create(info)
    return attendee
