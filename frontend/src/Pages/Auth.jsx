import React, { useState } from "react";
import axios from "axios";

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    school: "",
    role: "STUDENT", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/register";

    try {
      const response = await axios.post(url, formData);

      if (isLogin) {
        // Success: Store the JWT and user details in LocalStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.name);

        alert(`Welcome back, ${response.data.name}!`);
        onLoginSuccess(); // This function will hide the login page in App.jsx
      } else {
        alert("Registration successful! Please log in.");
        setIsLogin(true); // Switch to login mode
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert(error.response?.data || "Something went wrong. Check the console.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isLogin ? "Login to Portal" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <>
              <input
                style={styles.input}
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
              <input
                style={styles.input}
                name="school"
                placeholder="University/School"
                onChange={handleChange}
                required
              />
              <select name="role" style={styles.input} onChange={handleChange}>
                <option value="STUDENT">I am a Student</option>
                <option value="TEACHER">I am a Teacher</option>
              </select>
            </>
          )}

          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span style={styles.link} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

// Simple inline styles to get you started
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  card: {
    padding: "40px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    width: "350px",
  },
  title: { textAlign: "center", marginBottom: "20px", color: "#333" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  toggleText: { textAlign: "center", marginTop: "20px", fontSize: "14px" },
  link: { color: "#007bff", cursor: "pointer", textDecoration: "underline" },
};

export default Auth;
