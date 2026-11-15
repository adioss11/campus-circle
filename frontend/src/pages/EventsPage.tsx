import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent, getEvents } from "../api/events";
import { toggleRsvp, type RsvpStatus } from "../api/rsvps";
import { readToken } from "../api/session";
import { EventCard } from "../components/EventCard";
import { PostEventModal } from "../components/PostEventModal";
import { Sidebar } from "../components/Sidebar";
import type { CampusEvent } from "../types/event";
import "./EventsPage.css";

export function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [rsvpError, setRsvpError] = useState<string | null>(null);
  const [rsvpBusyId, setRsvpBusyId] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [saving, setSaving] = useState(false);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("campusCircleScrollTop") === "1") {
      sessionStorage.removeItem("campusCircleScrollTop");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!readToken()) {
        if (!cancelled) {
          setNeedsLogin(true);
          setLoading(false);
        }
        return;
      }
      try {
        const data = await getEvents();
        if (!cancelled) {
          setEvents(data);
          setNeedsLogin(false);
          setLoadError(null);
        }
      } catch (reason) {
        if (!cancelled) {
          const message =
            reason instanceof Error
              ? reason.message
              : "Could not load events. Is the API running on port 8000?";
          if (message === "Log in to see events.") {
            setNeedsLogin(true);
            setLoadError(null);
          } else {
            setLoadError(message);
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="events-shell">
      <div className="atmosphere" aria-hidden="true" />
      <div className="events-layout">
        {needsLogin ? null : <Sidebar onPost={() => setPosting(true)} />}
        <main className="feed" id="event-feed">
          {needsLogin ? (
            <header className="feed-header">
              <p className="eyebrow">LOG IN REQUIRED</p>
              <h1>Log in to see events.</h1>
              <p>The events list is saved for people with an account.</p>
              <button
                type="button"
                className="primary-button"
                onClick={() => navigate("/")}
              >
                Log in
              </button>
            </header>
          ) : (
          <>
          <header className="feed-header">
            <p className="eyebrow">THIS WEEK ON CAMPUS</p>
            <h1>Events</h1>
            <p>See who is going — or find someone to go with.</p>
          </header>
          {loading ? <p className="feed-status">Loading events…</p> : null}
          {loadError ? <p className="feed-status feed-status-error">{loadError}</p> : null}
          {saveError ? <p className="feed-status feed-status-error">{saveError}</p> : null}
          {rsvpError ? <p className="feed-status feed-status-error">{rsvpError}</p> : null}
          {!loading && !loadError && events.length === 0 ? (
            <p className="feed-status">No events yet. Post the first one.</p>
          ) : null}
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              rsvpBusy={rsvpBusyId === event.id}
              onRsvp={(status: RsvpStatus) => {
                void (async () => {
                  setRsvpBusyId(event.id);
                  setRsvpError(null);
                  try {
                    const updated = await toggleRsvp(event.id, status);
                    setEvents((current) =>
                      current.map((item) =>
                        item.id === updated.id ? updated : item,
                      ),
                    );
                  } catch (reason) {
                    const message =
                      reason instanceof Error
                        ? reason.message
                        : "Could not save RSVP.";
                    setRsvpError(
                      message === "Failed to fetch"
                        ? "Could not reach the API. Is it running on port 8000?"
                        : message,
                    );
                  } finally {
                    setRsvpBusyId(null);
                  }
                })();
              }}
            />
          ))}
          </>
          )}
        </main>
      </div>
      {posting ? (
        <PostEventModal
          onClose={() => setPosting(false)}
          saving={saving}
          onCreate={(draft) => {
            void (async () => {
              setSaving(true);
              setSaveError(null);
              try {
                const saved = await createEvent({
                  title: draft.title,
                  day: draft.day,
                  month: draft.month,
                  time: draft.time,
                  location: draft.location,
                  description: draft.description,
                });
                setEvents((current) => [saved, ...current]);
                setPosting(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } catch (reason) {
                const message =
                  reason instanceof Error
                    ? reason.message
                    : "Could not save the event. Is the API running on port 8000?";
                setSaveError(message);
              } finally {
                setSaving(false);
              }
            })();
          }}
        />
      ) : null}
    </div>
  );
}
