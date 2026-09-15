from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.demo_user import ensure_demo_user, initials_from_name
from app.event_payload import event_to_out
from app.models.event import Event
from app.models.rsvp import Rsvp
from app.schemas.profile import ProfileOut

router = APIRouter(tags=["profile"])


@router.get("/profile", response_model=ProfileOut)
def get_profile(db: Session = Depends(get_db)):
    """
    Return the demo user plus the events they marked Going / Looking.

    Flow:
    1. Find Alex Kim in users.
    2. Find that user's rows in rsvps.
    3. Load those events and split them by status.
    """
    user = ensure_demo_user(db)
    rsvps = db.query(Rsvp).filter(Rsvp.user_id == user.id).all()
    going_ids = [rsvp.event_id for rsvp in rsvps if rsvp.status == "going"]
    looking_ids = [rsvp.event_id for rsvp in rsvps if rsvp.status == "looking"]
    event_ids = going_ids + looking_ids

    events_by_id = {}
    if event_ids:
        events = db.query(Event).filter(Event.id.in_(event_ids)).all()
        events_by_id = {event.id: event for event in events}

    def events_for(ids: list[int]):
        found = [events_by_id[event_id] for event_id in ids if event_id in events_by_id]
        found.sort(key=lambda event: event.id, reverse=True)
        return [event_to_out(event, db) for event in found]

    return ProfileOut(
        id=user.id,
        name=user.name,
        initials=initials_from_name(user.name),
        going=events_for(going_ids),
        looking=events_for(looking_ids),
    )
