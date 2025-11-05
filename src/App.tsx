import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "1rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "#333",
          }}
        >
          Hackaton App
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#666",
            marginBottom: "2rem",
          }}
        >
          React + TypeScript + Vite
        </p>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            transition: "transform 0.2s, background 0.2s",
            fontWeight: "600",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#764ba2";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#667eea";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Count is {count}
        </button>
        <p
          style={{
            marginTop: "2rem",
            color: "#888",
            fontSize: "0.9rem",
          }}
        >
          ✅ Ready for Vercel deployment
        </p>
      </div>
    </div>
  );
}

export default App;
