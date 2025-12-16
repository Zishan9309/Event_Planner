import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/events")
      .then((res) => {
        const event = res.data.find((e) => e._id === id);
        setForm(event);
        setLoading(false);
      });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("dateTime", form.dateTime);
    data.append("location", form.location);
    data.append("capacity", form.capacity);
    if (form.imageFile) data.append("image", form.imageFile);

    await API.put(`/events/${id}`, data);
    navigate("/dashboard");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="form-box">
        <h2>Edit Event ✏️</h2>

        <form onSubmit={submit}>
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <input
            type="datetime-local"
            value={form.dateTime?.slice(0, 16)}
            onChange={(e) =>
              setForm({ ...form, dateTime: e.target.value })
            }
            required
          />

          <input
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            required
          />

          <input
            type="number"
            value={form.capacity}
            onChange={(e) =>
              setForm({ ...form, capacity: e.target.value })
            }
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, imageFile: e.target.files[0] })
            }
          />

          <button>Update Event</button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
