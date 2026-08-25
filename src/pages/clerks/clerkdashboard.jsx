import { useState } from "react";

function ClerkDashboard() {
  const [stats] = useState({ received: 245, stock: 180,
    spoilt: 12, unpaid: 20,});

  return (
    <div style={{ padding: "24px" }}>
      <h1>Clerk Dashboard</h1>
      <p>Welcome back! Here's today's inventory summary.</p>

      <div
        style={{ display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px", marginTop: "24px",}}
      >
        <div style={cardStyle}>
          <h3>Items Received</h3>
          <h2>{stats.received}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Items in Stock</h3>
          <h2>{stats.stock}</h2>
        </div>