import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
    setScore(null);
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(response.data.prediction);
      setScore(Number(response.data.score)); // Sørger for tallverdi
    } catch (error) {
      console.error("Error sending image:", error);
      setResult("Feil ved sending av bilde.");
    }
    setLoading(false);
  };

  // Beregn sikkerhet hvis score finnes
  const certainty = score !== null && !isNaN(score)
  ? (result === "Positive" ? score * 100 : (100 - score * 100)).toFixed(2)
  : null;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9f9f9",
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        🫁 Chest X-ray Predictor
      </h1>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        maxWidth: "500px"
      }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ fontSize: "1rem" }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "0.5rem",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={!image || loading}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
            cursor: !image || loading ? "not-allowed" : "pointer",
            opacity: !image || loading ? 0.6 : 1,
          }}
        >
          {loading ? "Analyserer..." : "Last opp og prediker"}
        </button>

        {result && (
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>
              Resultat:{" "}
              <span style={{
                color:
                  result === "Positive" ? "#dc2626"
                  : result === "Feil ved sending av bilde." ? "#f59e0b"
                  : "#16a34a",
              }}>
                {result}
              </span>
            </p>

            {certainty && (
              <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                Modellen er <strong>{certainty}%</strong> sikker på at bildet viser en{" "}
                {result === "Positive" ? "lunge med lungebetennelse" : "frisk lunge"}.
              </p>
            )}

            {score !== null && score > 45 && score < 55 && (
              <p style={{
                color: "#f59e0b",
                fontStyle: "italic",
                marginTop: "0.5rem"
              }}>
                ⚠️ Lav sikkerhet – resultatet bør vurderes med forsiktighet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
