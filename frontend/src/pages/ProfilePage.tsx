import { useEffect, useState } from "react";
import { getProfile, type CampusProfile } from "../api/profile";
import { ProfileEventList } from "../components/ProfileEventList";
import { Sidebar } from "../components/Sidebar";
import "./EventsPage.css";
import "./ProfilePage.css";

export function ProfilePage() {
  const [profile, setProfile] = useState<CampusProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getProfile();
        if (!cancelled) {
          setProfile(data);
          setLoadError(null);
        }
      } catch {
        if (!cancelled) {
          setLoadError(
            "Could not load profile. Is the API running on port 8000?",
          );
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
      <div className="events-layout profile-layout">
        <Sidebar />
        <main className="feed">
          {loading ? <p className="feed-status">Loading profile…</p> : null}
          {loadError ? (
            <p className="feed-status feed-status-error">{loadError}</p>
          ) : null}
          {profile ? (
            <>
              <header className="profile-header">
                <div className="profile-avatar" aria-hidden="true">
                  {profile.initials}
                </div>
                <div>
                  <p className="eyebrow">MY PROFILE</p>
                  <h1>{profile.name}</h1>
                  <p>
                    Lists come from your RSVPs in PostgreSQL. Photo upload
                    comes later with real accounts.
                  </p>
                </div>
              </header>

              <ProfileEventList
                heading="Going"
                events={profile.going}
                emptyText="You have not marked Going on any events yet."
              />
              <ProfileEventList
                heading="Looking for someone"
                events={profile.looking}
                emptyText="You have not marked Looking for someone on any events yet."
              />
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}
