import { useState } from "react";
import type { CampusEvent } from "../types/event";

type PostEventModalProps = {
  onClose: () => void;
  onCreate: (event: CampusEvent) => void;
};

export function PostEventModal({ onClose, onCreate }: PostEventModalProps) {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <form
        className="modal"
        role="dialog"
        aria-labelledby="post-event-title"
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          const nextTitle = title.trim();
          const nextDay = day.trim();
          const nextMonth = month.trim();
          const nextTime = time.trim();
          const nextLocation = location.trim();
          const nextDescription = description.trim();
          if (
            !nextTitle ||
            !nextDay ||
            !nextMonth ||
            !nextTime ||
            !nextLocation ||
            !nextDescription
          ) {
            return;
          }
          onCreate({
            id: `posted-${Date.now()}`,
            title: nextTitle,
            day: nextDay,
            month: nextMonth,
            time: nextTime,
            location: nextLocation,
            description: nextDescription,
            goingPeople: [],
            lookingPeople: [],
          });
        }}
      >
        <h2 id="post-event-title">Post an event</h2>
        <p className="auth-copy">
          Preview only. This stays in your browser until you refresh.
        </p>

        <div className="fields">
          <label className="field" htmlFor="event-title">
            <span>Title</span>
            <input
              id="event-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>
          <div className="field-row">
            <label className="field" htmlFor="event-day">
              <span>Day</span>
              <input
                id="event-day"
                value={day}
                placeholder="15"
                onChange={(event) => setDay(event.target.value)}
                required
              />
            </label>
            <label className="field" htmlFor="event-month">
              <span>Month</span>
              <input
                id="event-month"
                value={month}
                placeholder="SEP"
                onChange={(event) => setMonth(event.target.value)}
                required
              />
            </label>
          </div>
          <label className="field" htmlFor="event-time">
            <span>Time</span>
            <input
              id="event-time"
              value={time}
              placeholder="6:00 PM"
              onChange={(event) => setTime(event.target.value)}
              required
            />
          </label>
          <label className="field" htmlFor="event-location">
            <span>Location</span>
            <input
              id="event-location"
              value={location}
              placeholder="Student Center"
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </label>
          <label className="field" htmlFor="event-description">
            <span>Description</span>
            <textarea
              id="event-description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
