import secrets

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.current_user import get_current_user
from app.database import get_db
from app.models.session import LoginSession
from app.models.user import User
from app.passwords import hash_password, verify_password
from app.schemas.auth import AuthOut, LoginIn, SignupIn, UserOut

router = APIRouter(tags=["auth"])

_EMAIL_TAKEN = "An account with that email already exists"


def _is_duplicate_email(error: IntegrityError) -> bool:
    """True when Postgres rejected a second row with the same email."""
    orig = getattr(error, "orig", None)
    diag = getattr(orig, "diag", None)
    name = getattr(diag, "constraint_name", None)
    return name == "users_email_key" or "users_email_key" in str(orig)


def _start_session(db: Session, user: User) -> AuthOut:
    token = secrets.token_urlsafe(32)
    db.add(LoginSession(token=token, user_id=user.id))
    db.commit()
    return AuthOut(id=user.id, name=user.name, email=user.email or "", token=token)


@router.post("/signup", response_model=AuthOut, status_code=201)
def signup(payload: SignupIn, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=409, detail=_EMAIL_TAKEN)
    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError as error:
        db.rollback()
        if _is_duplicate_email(error):
            raise HTTPException(status_code=409, detail=_EMAIL_TAKEN)
        raise
    db.refresh(user)
    return _start_session(db, user)


@router.post("/login", response_model=AuthOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
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
