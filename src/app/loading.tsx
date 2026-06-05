export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
        flexDirection: "column",
        gap: 16,
      }}
      aria-label="Loading"
      role="status"
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: "3px solid var(--border2)",
          borderTopColor: "var(--accent)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ color: "var(--text3)", fontSize: 14 }}>Loading…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
