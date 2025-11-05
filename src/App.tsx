import { useState } from "react";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./theme";

function App() {
  const [count, setCount] = useState(0);
  const { palette } = useTheme();

  return (
    <>
      <ThemeToggle />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.secondary.main} 100%)`,
          transition: "background 0.3s ease",
        }}
      >
        <div
          style={{
            background: palette.background.elevated,
            padding: "3rem",
            borderRadius: "1rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            textAlign: "center",
            maxWidth: "500px",
            transition: "background 0.3s ease",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "1rem",
              color: palette.text.primary,
              transition: "color 0.3s ease",
            }}
          >
            Hackaton App
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: palette.text.secondary,
              marginBottom: "2rem",
              transition: "color 0.3s ease",
            }}
          >
            React + TypeScript + Vite
          </p>
          <button
            onClick={() => setCount((count) => count + 1)}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              background: palette.primary.main,
              color: palette.primary.contrast,
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              transition: "transform 0.2s, background 0.3s",
              fontWeight: "600",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = palette.secondary.main;
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = palette.primary.main;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Count is {count}
          </button>
          <p
            style={{
              marginTop: "2rem",
              color: palette.text.secondary,
              fontSize: "0.9rem",
              transition: "color 0.3s ease",
            }}
          >
            ✅ Ready for Vercel deployment
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
