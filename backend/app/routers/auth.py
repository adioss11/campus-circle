import secrets

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.session import LoginSession
from app.models.user import User
from app.passwords import hash_password, verify_password
from app.schemas.auth import AuthOut, LoginIn, SignupIn, UserOut

router = APIRouter(tags=["auth"])


def _normalize_email(email: str) -> str:
    return email.strip().lower()


def _start_session(db: Session, user: User) -> AuthOut:
    token = secrets.token_urlsafe(32)
    db.add(LoginSession(token=token, user_id=user.id))
    db.commit()
    return AuthOut(id=user.id, name=user.name, email=user.email or "", token=token)


def get_current_user(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
) -> User:
    """Read Authorization: Bearer <token> and return that user."""
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


@router.post("/signup", response_model=AuthOut, status_code=201)
def signup(payload: SignupIn, db: Session = Depends(get_db)):
    email = _normalize_email(payload.email)
    if "@" not in email or email.startswith("@") or email.endswith("@"):
        raise HTTPException(status_code=422, detail="Enter a valid email")
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=409, detail="An account with that email already exists")
    user = User(
        name=payload.name.strip(),
        email=email,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return _start_session(db, user)


@router.post("/login", response_model=AuthOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    email = _normalize_email(payload.email)
    user = db.query(User).filter(User.email == email).first()
    # Same error whether the email is missing or the password is wrong.
    # That way a stranger cannot use the API to discover which emails exist.
    if (
        not user
        or not user.password_hash
        or not verify_password(payload.password, user.password_hash)
    ):
        raise HTTPException(status_code=401, detail="Email or password is wrong")
    return _start_session(db, user)


@router.post("/logout")
def logout(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
):
    if authorization and authorization.startswith("Bearer "):
        token = authorization.removeprefix("Bearer ").strip()
        row = db.query(LoginSession).filter(LoginSession.token == token).first()
        if row:
            db.delete(row)
            db.commit()
    return {"ok": True}


@router.get("/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)):
    """Who is this token? We do not send the password or the token back."""
    return UserOut(id=user.id, name=user.name, email=user.email or "")
