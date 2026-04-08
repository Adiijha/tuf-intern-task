export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "linear-gradient(180deg, #ece7de 0%, #dfd6ca 100%)",
        color: "#122033",
        fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif'
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: 0, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7 }}>Not Found</p>
        <h1 style={{ margin: "0.5rem 0 0", fontFamily: 'Georgia, "Times New Roman", serif' }}>
          This page slipped off the calendar.
        </h1>
      </div>
    </main>
  );
}
