from pydantic import BaseModel, Field


class SignupIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: str = Field(min_length=3, max_length=255)
    password: str = Field(min_length=8, max_length=128)


class LoginIn(BaseModel):
    email: str = Field(min_length=3, max_length=255)
    password: str = Field(min_length=1, max_length=128)


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
