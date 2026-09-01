import { useMemo, useState } from "react";
import type { CampusEvent } from "../types/event";
import {
  CAMPUS_LOCATIONS,
  DESCRIPTION_MAX,
  MONTHS,
  TITLE_MAX,
  daysInMonth,
  formatClockTime,
  timeToMinutes,
} from "../data/eventOptions";

type PostEventModalProps = {
  onClose: () => void;
  onCreate: (event: CampusEvent) => void;
};

export function PostEventModal({ onClose, onCreate }: PostEventModalProps) {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [timeError, setTimeError] = useState("");

  const dayOptions = useMemo(() => {
    const lastDay = daysInMonth(month);
    return Array.from({ length: lastDay }, (_, index) => String(index + 1));
  }, [month]);

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
          const nextLocation = location.trim();
          const nextDescription = description.trim();
          const starts = formatClockTime(startTime);
          const ends = formatClockTime(endTime);

          if (
            !nextTitle ||
            !nextDay ||
            !nextMonth ||
            !starts ||
            !ends ||
            !nextLocation ||
            !nextDescription
          ) {
            return;
          }

          if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
            setTimeError("End time must be after start time.");
            return;
          }

          onCreate({
            id: `posted-${Date.now()}`,
            title: nextTitle,
            day: nextDay,
            month: nextMonth,
            time: `${starts} – ${ends}`,
            location: nextLocation,
            description: nextDescription,
            goingPeople: [],
            lookingPeople: [],
          });
        }}
      >
        <h2 id="post-event-title">Post an event</h2>
        <p className="auth-copy">
          Preview only. This stays in your browser until you refresh. Locations
          are a fake campus list for now.
        </p>

        <div className="fields">
          <label className="field" htmlFor="event-title">
            <span>Title</span>
            <input
              id="event-title"
              value={title}
              maxLength={TITLE_MAX}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <small className="char-count">
              {title.length}/{TITLE_MAX}
            </small>
          </label>

          <div className="field-row">
            <label className="field" htmlFor="event-month">
              <span>Month</span>
              <select
                id="event-month"
                value={month}
                onChange={(event) => {
                  const nextMonth = event.target.value;
                  setMonth(nextMonth);
                  const lastDay = daysInMonth(nextMonth);
                  if (Number(day) > lastDay) {
                    setDay("");
                  }
                }}
                required
              >
                <option value="" disabled>
                  Choose month
                </option>
                {MONTHS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="field" htmlFor="event-day">
              <span>Day</span>
              <select
                id="event-day"
                value={day}
                onChange={(event) => setDay(event.target.value)}
                required
              >
                <option value="" disabled>
                  Choose day
                </option>
                {dayOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="field-row">
            <label className="field" htmlFor="event-start">
              <span>Starts</span>
              <input
                id="event-start"
                type="time"
                value={startTime}
                onChange={(event) => {
                  setStartTime(event.target.value);
                  setTimeError("");
                }}
                required
              />
            </label>
            <label className="field" htmlFor="event-end">
              <span>Ends</span>
              <input
                id="event-end"
                type="time"
                value={endTime}
                onChange={(event) => {
                  setEndTime(event.target.value);
                  setTimeError("");
                }}
                required
              />
            </label>
          </div>
          {timeError ? <p className="form-error">{timeError}</p> : null}

          <label className="field" htmlFor="event-location">
            <span>Location</span>
            <select
              id="event-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            >
              <option value="" disabled>
                Choose a campus spot
              </option>
              {CAMPUS_LOCATIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="field" htmlFor="event-description">
            <span>Description</span>
            <textarea
              id="event-description"
              rows={3}
              value={description}
              maxLength={DESCRIPTION_MAX}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
            <small className="char-count">
              {description.length}/{DESCRIPTION_MAX}
            </small>
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
