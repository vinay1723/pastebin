import { useState } from "react";
import "./Home.css"; // add this css file
import { Link } from "react-router";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  const createPaste = async () => {
    const res = await fetch("https://binserver-nine.vercel.app/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined,
      }),
    });

    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div className="container">
      <h1 className="title">New Paste</h1>

      <textarea
        className="editor"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your text here..."
      />

      <div className="settings">
        <h3>Optional Paste Settings</h3>

        <div className="row">
          <input
            className="input"
            placeholder="TTL seconds"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />

          <input
            className="input"
            placeholder="Max views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
        </div>

        <button className="btn" onClick={createPaste}>
          Create Paste
        </button>
      </div>

      {url && (
        <p className="link">
          Share Link:{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </p>
      )}
    </div>
  );
}
