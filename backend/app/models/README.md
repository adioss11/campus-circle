# models

Database tables, usually with SQLAlchemy.

One model ≈ one table. CampusCircle will likely need:

- User (name, picture, login info)
- Event (title, time, location, description, image)
- RSVP (which user, which event, Going vs Looking for someone)

This folder describes **stored** data. It is not the JSON the frontend sees (`schemas/`) and not the URLs (`routers/`).
