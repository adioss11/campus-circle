import { useEffect, useRef, useState } from "react";
import type { CampusEvent } from "../types/event";
import { coverForEvent } from "../data/fakeEvents";

type EventCardProps = {
  event: CampusEvent;
};

type RsvpKind = "going" | "looking";

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function RsvpMenu({
  kind,
  label,
  names,
  open,
  onOpen,
  onClose,
}: {
  kind: RsvpKind;
  label: string;
  names: string[];
  open: boolean;
  onOpen: (kind: RsvpKind) => void;
  onClose: () => void;
}) {
  return (
    <div
      className={open ? `rsvp is-open rsvp-${kind}` : `rsvp rsvp-${kind}`}
      onMouseEnter={() => onOpen(kind)}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className={kind === "going" ? "primary-button" : "secondary-button"}
        onClick={() => {
          if (canHover()) {
            return;
          }
          if (open) {
            onClose();
          } else {
            onOpen(kind);
          }
        }}
      >
        {label}
        <span className="rsvp-count">{names.length}</span>
      </button>
      <div className="rsvp-popover" role="tooltip">
        <p>{kind === "going" ? "Going" : "Looking for someone"}</p>
        {names.length === 0 ? (
          <span>Nobody yet</span>
        ) : (
          <ul>
            {names.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function EventCard({ event }: EventCardProps) {
  const [open, setOpen] = useState<RsvpKind | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [from, to] = coverForEvent(event.id);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!cardRef.current?.contains(event.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <article className="feed-card" ref={cardRef}>
      <div
        className="feed-cover"
        style={{
          background: `linear-gradient(135deg, ${from}, ${to})`,
        }}
      >
        <strong>{event.title}</strong>
      </div>

      <div className="feed-body">
        <p className="feed-meta">
          {event.day} {event.month} · {event.time} · {event.location}
        </p>
        <p className="feed-description">{event.description}</p>

        <div className="feed-actions">
          <RsvpMenu
            kind="going"
            label="Going"
            names={event.goingPeople}
            open={open === "going"}
            onOpen={setOpen}
            onClose={() => setOpen(null)}
          />
          <RsvpMenu
            kind="looking"
            label="Looking for someone"
            names={event.lookingPeople}
            open={open === "looking"}
            onOpen={setOpen}
            onClose={() => setOpen(null)}
          />
        </div>
      </div>
    </article>
  );
}
