import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", { name, email, password });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input placeholder="Name" onChange={e => setName(e.target.value)} />
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
