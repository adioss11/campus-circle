from sqlalchemy.orm import Session

from app.models.event import Event
from app.models.rsvp import Rsvp
from app.models.user import User
from app.schemas.event import EventOut


def event_to_out(event: Event, db: Session) -> EventOut:
    """Build the JSON the frontend expects, including RSVP name lists.

    goingPeople / lookingPeople are not stored as lists on the event row.
    We read the rsvps table, look up each user's name, and group by status.
    """
    rsvps = db.query(Rsvp).filter(Rsvp.event_id == event.id).all()
    user_ids = [rsvp.user_id for rsvp in rsvps]
    names_by_id = {}
    if user_ids:
        users = db.query(User).filter(User.id.in_(user_ids)).all()
        names_by_id = {user.id: user.name for user in users}

    going_people = [
        names_by_id[rsvp.user_id]
        for rsvp in rsvps
        if rsvp.status == "going" and rsvp.user_id in names_by_id
    ]
    looking_people = [
        names_by_id[rsvp.user_id]
        for rsvp in rsvps
        if rsvp.status == "looking" and rsvp.user_id in names_by_id
    ]

    return EventOut(
        id=event.id,
        title=event.title,
        day=event.day,
        month=event.month,
        time=event.time,
        location=event.location,
        description=event.description,
        goingPeople=going_people,
        lookingPeople=looking_people,
    )
