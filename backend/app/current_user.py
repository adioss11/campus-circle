from fastapi import Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.session import LoginSession
from app.models.user import User


def get_current_user(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
) -> User:
    """Read Authorization: Bearer <token> and return that logged-in person.

    The token is the wristband from login. We look it up in the sessions table.
    No token, or a token we deleted on logout, means 401: log in required.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Log in required")
    token = authorization.removeprefix("Bearer ").strip()
    row = db.query(LoginSession).filter(LoginSession.token == token).first()
    if not row:
        raise HTTPException(status_code=401, detail="Log in required")
    user = db.query(User).filter(User.id == row.user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="Log in required")
    return user
