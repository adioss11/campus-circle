import re

from pydantic import BaseModel, Field, field_validator

# One @, a dot in the domain, and no spaces. "a@b" is not enough.
_EMAIL = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def _strip(value: str) -> str:
    if isinstance(value, str):
        return value.strip()
    return value


class SignupIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: str = Field(min_length=3, max_length=255)
    password: str = Field(min_length=8, max_length=128)

    @field_validator("name", mode="before")
    @classmethod
    def strip_name(cls, value: str) -> str:
        return _strip(value)

    @field_validator("email", mode="before")
    @classmethod
    def strip_email(cls, value: str) -> str:
        cleaned = _strip(value)
        if isinstance(cleaned, str):
            return cleaned.lower()
        return cleaned

    @field_validator("email")
    @classmethod
    def check_email(cls, value: str) -> str:
        if not _EMAIL.fullmatch(value):
            raise ValueError("Enter a valid email")
        return value


class LoginIn(BaseModel):
    email: str = Field(min_length=3, max_length=255)
    password: str = Field(min_length=1, max_length=128)

    @field_validator("email", mode="before")
    @classmethod
    def strip_email(cls, value: str) -> str:
        cleaned = _strip(value)
        if isinstance(cleaned, str):
            return cleaned.lower()
        return cleaned

    @field_validator("email")
    @classmethod
    def check_email(cls, value: str) -> str:
        if not _EMAIL.fullmatch(value):
            raise ValueError("Enter a valid email")
        return value


class AuthOut(BaseModel):
    """What we send back after signup or login. Never includes the password."""

    id: int
    name: str
    email: str
    token: str


class UserOut(BaseModel):
    """Who the token belongs to. No password, no token."""

    id: int
    name: str
    email: str
