import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ClerkDashboard() {
  const [stats, setStats] = useState({ received: 245, stock: 180,
    spoilt: 12, unpaid: 20,});
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);

   useEffect(() => {
  const token = localStorage.getItem("token");

  Promise.all([
    fetch("http://127.0.0.1:5000/clerk/dashboard", {
      headers: {Authorization: `Bearer ${token}`,},
    }).then((res) => res.json()),

    fetch("http://127.0.0.1:5000/records", {
      headers: {Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
  ])
    .then(([dashboardData, recordsData]) => {
      setStats(dashboardData);
      setRecords(recordsData);
    })
    .catch(console.error);
}, []);


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

      <div style={{ marginTop: "40px" }}>
  <h2>Recent Inventory Records</h2>

  {records.length === 0 ? (
    <p>No records yet.</p>
  ) : (
    records.slice(0, 5).map((record) => (
      <div key={record.record_id} style={recordCard}>
        <div>
          <h3>Product #{record.product_id}</h3>

          <p>Received: {record.items_received}</p>
          <p>Stock: {record.items_in_stock}</p>
          <p>Spoilt: {record.items_spoilt}</p>
          <p>Buying: KSh {record.buying_price}</p>
          <p>Selling: KSh {record.selling_price}</p>
          <p>Status: {record.payment_status}</p>
        </div>

       <button style={buttonStyle}
         onClick={() => {console.log(record.record_id);
         navigate(`/clerk/edit/${record.record_id}`);
  }}>Edit</button>
      </div>
    ))
  )}
</div>

  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
    <button style={buttonStyle}
      onClick={() => navigate("/clerk/records")}>
      Record Inventory </button>

    <button style={buttonStyle}
      onClick={() => navigate("/clerk/supplyreq")}>
      Request Supply</button>

    <button style={buttonStyle}
      onClick={() => navigate("/clerk/inventory")}>
      View Inventory</button>
 
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
