import React, { useState, useEffect } from "react";
import { getIdeas, createIdea, deleteIdea } from "../Api.js";

function Main() {
  const [ideas, setIdeas] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // Pull user info from localStorage (saved during login)
  const userName = localStorage.getItem("name");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const response = await getIdeas();
      setIdeas(response.data);
    } catch (error) {
      console.error("Connection Failed:", error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        handleLogout(); // Token might be expired or invalid
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // We send the idea; the backend now knows the student's name from the Token!
    try {
      await createIdea(form);
      setForm({ title: "", description: "" });
      loadIdeas();
    } catch (error) {
      alert("Failed to upload idea. Make sure you are authorized.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); // Redirects to Auth via App.jsx logic
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "2px solid #eee",
          paddingBottom: "10px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Welcome, {userName}!</h2>
          <span style={{ fontSize: "0.9rem", color: "#666" }}>
            Role: {userRole}
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Conditional Form: Only Students upload ideas */}
      {userRole === "STUDENT" ? (
        <section
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <h3>Submit Your Thesis Idea</h3>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              name="title"
              placeholder="Thesis Project Title"
              value={form.title}
              onChange={handleChange}
              style={{ padding: "10px" }}
              required
            />
            <textarea
              name="description"
              placeholder="Describe your architectural mobility solution..."
              value={form.description}
              onChange={handleChange}
              style={{ padding: "10px", minHeight: "80px" }}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload Idea
            </button>
          </form>
        </section>
      ) : (
        <section
          style={{
            backgroundColor: "#eef9ef",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <h3>Teacher Dashboard</h3>
          <p>Reviewing submissions from your collection.</p>
          {/* You can add a button here later to "Create New Collection" */}
        </section>
      )}

      {/* Ideas List */}
      <h2>Submitted Ideas</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {ideas.length === 0 ? (
          <p>No ideas submitted yet.</p>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea.id}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                borderLeft: idea.isDuplicate
                  ? "5px solid red"
                  : "5px solid green",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{idea.title}</strong>
                <span style={{ fontSize: "0.8rem", color: "#888" }}>
                  {idea.studentName}
                </span>
              </div>
              <p style={{ margin: "10px 0" }}>{idea.description}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {idea.isDuplicate ? (
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    ⚠️ Similarity Alert
                  </span>
                ) : (
                  <span style={{ color: "green", fontSize: "0.9rem" }}>
                    ✓ Unique Idea
                  </span>
                )}

                {/* Only show delete if user is teacher or the owner of the idea */}
                <button
                  onClick={async () => {
                    if (
                      window.confirm("Are you sure you want to remove this?")
                    ) {
                      await deleteIdea(idea.id);
                      loadIdeas();
                    }
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff4d4d",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Main;
