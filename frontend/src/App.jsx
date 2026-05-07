import React, { useState, useEffect } from "react";
import { getIdeas, createIdea, deleteIdea } from "./api";

function App() {
  const [ideas, setIdeas] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    studentName: "",
  });

  // 1. Fetch ideas on load
  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const response = await getIdeas();
      console.log("Backend Response:", response.data); // Look for this in the Console tab!
      setIdeas(response.data);
    } catch (error) {
      console.error("Connection Failed:", error);
    }
  };

  // 2. Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3. Submit new idea
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createIdea(form);
    setForm({ title: "", description: "", studentName: "" }); // Reset form
    loadIdeas(); // Refresh list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Idea Portal</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="studentName"
          placeholder="Your Name"
          value={form.studentName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="title"
          placeholder="Idea Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="description"
          placeholder="Describe your idea..."
          value={form.description}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Upload Idea</button>
      </form>

      <hr />

      <h2>Submitted Ideas</h2>
      <ul>
        {ideas.map((idea) => (
          <li
            key={idea.id}
            style={{ color: idea.isDuplicate ? "red" : "black" }}
          >
            <strong>{idea.title}</strong> - {idea.studentName}
            <p>{idea.description}</p>
            {idea.isDuplicate && <span>⚠️ Possible Duplicate!</span>}
            <button
              onClick={async () => {
                await deleteIdea(idea.id);
                loadIdeas();
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
