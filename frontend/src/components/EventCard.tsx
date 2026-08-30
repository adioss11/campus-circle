import type { CampusEvent } from "../types/event";

type EventCardProps = {
  event: CampusEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="event-card">
      <div className="event-card-date">
        <strong>{event.day}</strong>
        <span>{event.month}</span>
      </div>

      <h3>{event.title}</h3>
      <p className="event-card-meta">
        {event.location} · {event.time}
      </p>

      <div className="event-card-counts">
        <span>{event.goingCount} going</span>
        <span>{event.lookingCount} looking for someone</span>
      </div>

      <div className="event-card-actions">
        <button type="button" className="primary-button">
          Going
        </button>
        <button type="button" className="secondary-button">
          Looking for someone
        </button>
      </div>
    </article>
  );
}
