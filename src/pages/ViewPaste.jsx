import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ViewPaste.css"; // add css file

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://binserver-nine.vercel.app/api/pastes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setContent(data.content))
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  if (error) return <h2 className="error">{error}</h2>;

  return (
    <div className="view-container">
      <h1 className="view-title">View Paste</h1>

      <div className="paste-box">
        <pre>{content}</pre>
      </div>
    </div>
  );
}
