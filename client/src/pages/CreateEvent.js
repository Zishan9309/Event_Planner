import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));

    await API.post("/events", data);
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Create Event</h2>
        <form onSubmit={submit}>
          <input placeholder="Title" required
            onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea placeholder="Description" required
            onChange={e => setForm({ ...form, description: e.target.value })} />
          <input type="datetime-local" required
            onChange={e => setForm({ ...form, dateTime: e.target.value })} />
          <input placeholder="Location" required
            onChange={e => setForm({ ...form, location: e.target.value })} />
          <input type="number" placeholder="Capacity" required
            onChange={e => setForm({ ...form, capacity: e.target.value })} />
          <input type="file" accept="image/*"
            onChange={e => setForm({ ...form, image: e.target.files[0] })} />
          <button>Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
