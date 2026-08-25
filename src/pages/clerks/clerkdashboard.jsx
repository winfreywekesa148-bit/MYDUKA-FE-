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

        <div style={cardStyle}>
          <h3>Spoilt Items</h3>
          <h2>{stats.spoilt}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Unpaid Items</h3>
          <h2>{stats.unpaid}</h2>
        </div>
      </div>

      <div style={{ marginTop: "32px" }}>
        <h2>Quick Actions</h2>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button style={buttonStyle}>Record Inventory</button>
          <button style={buttonStyle}>Request Supply</button>
        </div>
      </div>
    </div>
  );}

const cardStyle = {border: "1px solid #E5E7EB",
  borderRadius: "12px",padding: "20px",
  textAlign: "center",};

const buttonStyle = {padding: "12px 18px",
  border: "none",borderRadius: "8px",
  background: "#2563EB",
  color: "white",cursor: "pointer",};

export default ClerkDashboard;