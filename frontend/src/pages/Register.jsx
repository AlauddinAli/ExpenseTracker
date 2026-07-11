import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!fullName || !username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      alert("Email already registered!");
      return;
    }

    const usernameExists = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (usernameExists) {
      alert("Username already taken!");
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName,
      username,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    navigate("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", background: "#f2f2f2" }}
    >
      <div
        className="card p-4 shadow"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">Register</h2>

        <input
          className="form-control mb-3"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-success w-100"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;