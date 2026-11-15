from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.current_user import get_current_user
from app.database import get_db
from app.event_payload import event_to_out
from app.models.event import Event
from app.models.rsvp import Rsvp
from app.models.user import User
from app.schemas.event import EventOut
from app.schemas.rsvp import RsvpUpdate

router = APIRouter(prefix="/events", tags=["rsvps"])


@router.post("/{event_id}/rsvp", response_model=EventOut)
def toggle_rsvp(
    event_id: int,
    payload: RsvpUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """
    Save, switch, or remove the logged-in person's RSVP on one event.

    - No RSVP + click Going → save going
    - Going + click Going → delete the row (toggle off)
    - Looking + click Looking → delete the row (toggle off)
    - Going + click Looking → switch to looking (and the reverse)
    """
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    existing = (
        db.query(Rsvp)
        .filter(Rsvp.event_id == event_id, Rsvp.user_id == user.id)
        .first()
    )

    if existing is None:
        db.add(Rsvp(event_id=event_id, user_id=user.id, status=payload.status))
    elif existing.status == payload.status:
        db.delete(existing)
    else:
        existing.status = payload.status

    db.commit()
    db.refresh(event)
    return event_to_out(event, db)
