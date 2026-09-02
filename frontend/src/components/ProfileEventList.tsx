import type { CampusEvent } from "../types/event";

type ProfileEventListProps = {
  heading: string;
  events: CampusEvent[];
  emptyText: string;
};

export function ProfileEventList({
  heading,
  events,
  emptyText,
}: ProfileEventListProps) {
  return (
    <section className="profile-list">
      <h2>{heading}</h2>
      {events.length === 0 ? (
        <p className="profile-empty">{emptyText}</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="profile-event">
              <strong>{event.title}</strong>
              <p>
                {event.day} {event.month} · {event.time} · {event.location}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
