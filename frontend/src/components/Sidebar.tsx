import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutConfirmModal } from "./LogoutConfirmModal";

type SidebarProps = {
  onPost?: () => void;
};

export function Sidebar({ onPost }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const onEvents = location.pathname === "/events";
  const onProfile = location.pathname === "/profile";
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <>
      <aside className="sidebar">
        <p className="sidebar-mark">Campus Circle</p>

        <nav className="sidebar-nav">
          <button
            type="button"
            className={onEvents ? "sidebar-link is-current" : "sidebar-link"}
            onClick={() => {
              if (onEvents) {
                if ("scrollRestoration" in history) {
                  history.scrollRestoration = "manual";
                }
                sessionStorage.setItem("campusCircleScrollTop", "1");
                window.location.reload();
                return;
              }
              navigate("/events");
            }}
          >
            Events
          </button>
          {onProfile ? null : (
            <button
              type="button"
              className="sidebar-link"
              onClick={() => {
                if (onPost) {
                  onPost();
                  return;
                }
                navigate("/events");
              }}
            >
              Post event
            </button>
          )}
          <button
            type="button"
            className={onProfile ? "sidebar-link is-current" : "sidebar-link"}
            onClick={() => {
              if (onProfile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
              }
              navigate("/profile");
            }}
          >
            Profile
          </button>
          <button
            type="button"
            className="sidebar-link"
            onClick={() => setConfirmLogout(true)}
          >
            Log out
          </button>
        </nav>
      </aside>

      {confirmLogout ? (
        <LogoutConfirmModal
          onCancel={() => setConfirmLogout(false)}
          onConfirm={() => navigate("/")}
        />
      ) : null}
    </>
  );
}
