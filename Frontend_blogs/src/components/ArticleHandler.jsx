import React, { useState } from "react";
import axios from "axios";

const ArticleHandler = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await axios.post("http://127.0.0.1:8000/api/handleArticleInput", { input });
      setResponse(result.data.output);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred while processing your input."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>AI Article Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="inputText">Enter your input:</label>
          <textarea
            id="inputText"
            className="form-control"
            rows="5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter an article, topic, or points here..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}
      {response && (
        <div className="alert alert-success">
          <h5>AI Response:</h5>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ArticleHandler;
