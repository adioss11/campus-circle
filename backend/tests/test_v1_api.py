import hashlib
from threading import Thread

from app.database import SessionLocal
from app.models.rsvp import Rsvp
from app.models.user import User

PASSWORD = "password123"
EVENT = {
    "title": "Campus Tour",
    "day": "15",
    "month": "NOV",
    "time": "6:00 PM",
    "location": "Student Center",
    "description": "A short walk around campus.",
}


def signup(client, name, email, password=PASSWORD):
    response = client.post(
        "/signup",
        json={"name": name, "email": email, "password": password},
    )
    assert response.status_code == 201, response.text
    body = response.json()
    assert body["name"] == name
    assert body["email"] == email
    assert body["token"]
    assert "password" not in body
    return body


def auth(token):
    return {"Authorization": f"Bearer {token}"}


def rsvp_count(event_id, user_id):
    db = SessionLocal()
    try:
        return (
            db.query(Rsvp)
            .filter(Rsvp.event_id == event_id, Rsvp.user_id == user_id)
            .count()
        )
    finally:
        db.close()


def test_signup_succeeds(client):
    body = signup(client, "Sam Lee", "sam@campus.test")
    assert body["id"] > 0


def test_duplicate_signup_is_a_conflict(client):
    signup(client, "Sam Lee", "sam@campus.test")
    again = client.post(
        "/signup",
        json={"name": "Sam Lee", "email": "sam@campus.test", "password": PASSWORD},
    )
    assert again.status_code == 409
    assert again.json()["detail"] == "An account with that email already exists"


def test_login_succeeds(client):
    signup(client, "Sam Lee", "sam@campus.test")
    response = client.post(
        "/login",
        json={"email": " Sam@Campus.Test ", "password": PASSWORD},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["email"] == "sam@campus.test"
    assert body["token"]


def test_invalid_login_is_rejected(client):
    signup(client, "Sam Lee", "sam@campus.test")
    wrong = client.post(
        "/login",
        json={"email": "sam@campus.test", "password": "not-the-password"},
    )
    missing = client.post(
        "/login",
        json={"email": "missing@campus.test", "password": "not-the-password"},
    )
    assert wrong.status_code == 401
    assert missing.status_code == 401
    assert wrong.json()["detail"] == missing.json()["detail"]


def test_protected_routes_require_a_token(client):
    assert client.get("/events").status_code == 401
    assert client.get("/profile").status_code == 401
    assert client.get("/me").status_code == 401
    created = client.post("/events", json=EVENT)
    assert created.status_code == 401


def test_authenticated_user_can_list_and_create_events(client):
    token = signup(client, "Sam Lee", "sam@campus.test")["token"]
    created = client.post("/events", json=EVENT, headers=auth(token))
    assert created.status_code == 201
    assert created.json()["title"] == "Campus Tour"
    listed = client.get("/events", headers=auth(token))
    assert listed.status_code == 200
    assert listed.json()[0]["title"] == "Campus Tour"


def test_rsvp_can_be_created_and_changed(client):
    token = signup(client, "Sam Lee", "sam@campus.test")["token"]
    event_id = client.post("/events", json=EVENT, headers=auth(token)).json()["id"]

    going = client.post(
        f"/events/{event_id}/rsvp",
        json={"status": "going"},
        headers=auth(token),
    )
    assert going.status_code == 200
    assert going.json()["goingPeople"] == ["Sam Lee"]
    assert going.json()["lookingPeople"] == []

    looking = client.post(
        f"/events/{event_id}/rsvp",
        json={"status": "looking"},
        headers=auth(token),
    )
    assert looking.status_code == 200
    assert looking.json()["goingPeople"] == []
    assert looking.json()["lookingPeople"] == ["Sam Lee"]
    assert rsvp_count(event_id, _user_id(client, token)) == 1


def _user_id(client, token):
    return client.get("/me", headers=auth(token)).json()["id"]


def test_one_rsvp_row_per_user_and_event(client):
    token = signup(client, "Sam Lee", "sam@campus.test")["token"]
    user_id = _user_id(client, token)
    event_id = client.post("/events", json=EVENT, headers=auth(token)).json()["id"]
    headers = auth(token)
    codes = []

    def click():
        response = client.post(
            f"/events/{event_id}/rsvp",
            json={"status": "going"},
            headers=headers,
        )
        codes.append(response.status_code)

    threads = [Thread(target=click) for _ in range(2)]
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()

    assert codes
    assert all(code in (200, 409) for code in codes)
    assert rsvp_count(event_id, user_id) <= 1


def test_a_conflicting_insert_is_retried_instead_of_a_500(client, monkeypatch):
    from app.routers import rsvps as rsvp_routes

    token = signup(client, "Sam Lee", "sam@campus.test")["token"]
    user_id = _user_id(client, token)
    event_id = client.post("/events", json=EVENT, headers=auth(token)).json()["id"]
    first = client.post(
        f"/events/{event_id}/rsvp",
        json={"status": "going"},
        headers=auth(token),
    )
    assert first.status_code == 200
    real_apply = rsvp_routes._apply_rsvp
    calls = {"n": 0}

    def first_call_inserts_a_duplicate(db, event_id, user_id, status):
        calls["n"] += 1
        if calls["n"] == 1:
            db.add(Rsvp(event_id=event_id, user_id=user_id, status=status))
            return
        real_apply(db, event_id, user_id, status)

    monkeypatch.setattr(rsvp_routes, "_apply_rsvp", first_call_inserts_a_duplicate)
    retried = client.post(
        f"/events/{event_id}/rsvp",
        json={"status": "looking"},
        headers=auth(token),
    )
    assert retried.status_code == 200
    assert retried.json()["lookingPeople"] == ["Sam Lee"]
    assert rsvp_count(event_id, user_id) == 1


def test_same_display_name_uses_user_id(client):
    sam = signup(client, "Sam Lee", "sam.one@campus.test")
    other = signup(client, "Sam Lee", "sam.two@campus.test")
    event_id = client.post(
        "/events",
        json=EVENT,
        headers=auth(sam["token"]),
    ).json()["id"]
    marked = client.post(
        f"/events/{event_id}/rsvp",
        json={"status": "going"},
        headers=auth(sam["token"]),
    )
    assert marked.status_code == 200
    body = marked.json()
    assert body["goingPeople"] == ["Sam Lee"]
    assert body["goingUserIds"] == [sam["id"]]
    assert other["id"] not in body["goingUserIds"]
    assert body["lookingUserIds"] == []


def test_signup_unique_constraint_is_a_conflict(client, monkeypatch):
    from sqlalchemy.orm import Query

    signup(client, "Sam Lee", "sam@campus.test")
    monkeypatch.setattr(Query, "first", lambda self: None)
    raced = client.post(
        "/signup",
        json={"name": "Sam Lee", "email": "sam@campus.test", "password": PASSWORD},
    )
    assert raced.status_code == 409
    assert raced.json()["detail"] == "An account with that email already exists"


def test_profile_belongs_to_the_logged_in_user(client):
    sam = signup(client, "Sam Lee", "sam@campus.test")
    riley = signup(client, "Riley Chen", "riley@campus.test")
    event_id = client.post(
        "/events",
        json=EVENT,
        headers=auth(sam["token"]),
    ).json()["id"]
    client.post(
        f"/events/{event_id}/rsvp",
        json={"status": "going"},
        headers=auth(sam["token"]),
    )

    sam_profile = client.get("/profile", headers=auth(sam["token"]))
    riley_profile = client.get("/profile", headers=auth(riley["token"]))
    assert sam_profile.status_code == 200
    assert riley_profile.status_code == 200
    assert sam_profile.json()["name"] == "Sam Lee"
    assert [event["id"] for event in sam_profile.json()["going"]] == [event_id]
    assert riley_profile.json()["name"] == "Riley Chen"
    assert riley_profile.json()["going"] == []
    assert riley_profile.json()["looking"] == []


def test_logout_invalidates_the_token(client):
    token = signup(client, "Sam Lee", "sam@campus.test")["token"]
    assert client.get("/me", headers=auth(token)).status_code == 200
    logged_out = client.post("/logout", headers=auth(token))
    assert logged_out.status_code == 200
    assert client.get("/me", headers=auth(token)).status_code == 401
    assert client.get("/events", headers=auth(token)).status_code == 401


def test_blank_name_and_title_and_bad_email_are_rejected(client):
    blank_name = client.post(
        "/signup",
        json={"name": "   ", "email": "sam@campus.test", "password": PASSWORD},
    )
    bad_email = client.post(
        "/signup",
        json={"name": "Sam Lee", "email": "not-an-email", "password": PASSWORD},
    )
    assert blank_name.status_code == 422
    assert bad_email.status_code == 422

    token = signup(client, "Sam Lee", "sam@campus.test")["token"]
    blank_title = client.post(
        "/events",
        json={**EVENT, "title": "   "},
        headers=auth(token),
    )
    assert blank_title.status_code == 422


def test_login_still_accepts_a_hash_made_with_200000_rounds(client):
    salt = "ab" * 16
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        PASSWORD.encode(),
        salt.encode(),
        200_000,
    ).hex()
    db = SessionLocal()
    try:
        db.add(
            User(
                name="Old Account",
                email="old@campus.test",
                password_hash=f"{salt}${digest}",
            )
        )
        db.commit()
    finally:
        db.close()

    response = client.post(
        "/login",
        json={"email": "old@campus.test", "password": PASSWORD},
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Old Account"
