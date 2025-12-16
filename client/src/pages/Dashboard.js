import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  useEffect(() => {
    API.get("/events").then((res) => setEvents(res.data));
  }, []);

  const rsvp = async (id) => {
    try {
      const res = await API.post(`/events/${id}/rsvp`);
      setEvents((prev) =>
        prev.map((e) => (e._id === id ? res.data : e))
      );
      setMessage("🎉 You have successfully joined this event!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(
        "⚠️ " + (err.response?.data?.message || "Unable to join")
      );
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await API.delete(`/events/${id}`);
    setEvents(events.filter((e) => e._id !== id));
  };

  return (
    <div className="container">
      <h2>Upcoming Events ✨</h2>

      {message && <div className="info-box">{message}</div>}

      {events.map((event) => {
        const creatorId =
          typeof event.createdBy === "object"
            ? event.createdBy._id
            : event.createdBy;

        const isCreator = creatorId === userId;

        const attendeeIds = event.attendees.map((a) =>
          typeof a === "object" ? a._id : a
        );

        const isJoined = attendeeIds.includes(userId);
        const isFull = event.attendees.length >= event.capacity;

        return (
          <div className="event-card" key={event._id}>
            {event.image && (
              <img
                src={`http://localhost:5000${event.image}`}
                alt="event"
                className="event-image"
              />
            )}

            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>📍 {event.location}</p>
            <p>🗓 {new Date(event.dateTime).toLocaleString()}</p>
            <p>
              👥 {event.attendees.length}/{event.capacity}
            </p>

            {/* JOIN EVENT BUTTON */}
            {!isCreator && (
              <button
                onClick={() => rsvp(event._id)}
                disabled={isJoined || isFull}
                style={{
                  opacity: isJoined || isFull ? 0.6 : 1,
                  cursor:
                    isJoined || isFull
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isJoined
                  ? "Joined ✔"
                  : isFull
                  ? "Event Full"
                  : "Join Event"}
              </button>
            )}

            {/* CREATOR CONTROLS */}
            {isCreator && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() =>
                    navigate(`/edit/${event._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  style={{ background: "#ef4444" }}
                  onClick={() => deleteEvent(event._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
