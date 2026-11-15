from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
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

    try:
        _apply_rsvp(db, event_id, user.id, payload.status)
        db.commit()
    except IntegrityError:
        # Two clicks inserted at the same time. The unique rule kept one row.
        # Apply the click again against that row instead of returning a 500.
        db.rollback()
        try:
            _apply_rsvp(db, event_id, user.id, payload.status)
            db.commit()
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=409,
                detail="Could not save that RSVP. Try again.",
            )

    saved = db.query(Event).filter(Event.id == event_id).first()
    return event_to_out(saved, db)


def _apply_rsvp(db: Session, event_id: int, user_id: int, status: str) -> None:
    existing = (
        db.query(Rsvp)
        .filter(Rsvp.event_id == event_id, Rsvp.user_id == user_id)
        .first()
    )
    if existing is None:
        db.add(Rsvp(event_id=event_id, user_id=user_id, status=status))
    elif existing.status == status:
        db.delete(existing)
    else:
        existing.status = status
