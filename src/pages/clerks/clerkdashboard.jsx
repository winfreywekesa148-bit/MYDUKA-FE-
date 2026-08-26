import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const emptyStats = { received: 0, stock: 0, spoilt: 0, unpaid: 0, last_updated: null };

function ClerkDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(emptyStats);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadDashboard = async () => {
      try {
        const [statsResponse, recordsResponse] = await Promise.all([
          fetch(`${API_URL}/clerk/dashboard`),
          fetch(`${API_URL}/records`),
        ]);
        if (!statsResponse.ok || !recordsResponse.ok) throw new Error("Unable to load inventory data.");

        const [statsData, recordsData] = await Promise.all([statsResponse.json(), recordsResponse.json()]);
        if (active) {
          setStats({ ...emptyStats, ...statsData });
          setRecords(Array.isArray(recordsData) ? recordsData : []);
          setError("");
        }
      } catch (loadError) {
        if (active) setError(loadError.message);
      }
    };

    loadDashboard();
    const intervalId = window.setInterval(loadDashboard, 30000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1>Clerk Dashboard</h1>
      <p>Today&apos;s inventory summary, refreshed from the API every 30 seconds.</p>
      {stats.last_updated && <small>Last updated: {new Date(stats.last_updated).toLocaleTimeString()}</small>}
      {error && <p role="alert">{error}</p>}

      <div style={summaryGrid}>
        <SummaryCard label="Items Received Today" value={stats.received} />
        <SummaryCard label="Items in Stock" value={stats.stock} />
        <SummaryCard label="Spoilt Items Today" value={stats.spoilt} />
        <SummaryCard label="Unpaid Records Today" value={stats.unpaid} />
      </div>

      <section style={{ marginTop: "32px" }}>
        <h2>Recent Inventory Records</h2>
        {records.length === 0 ? <p>No records yet.</p> : records.slice(0, 5).map((record) => (
          <div key={record.record_id} style={recordCard}>
            <div>
              <h3>{record.product_name || `Product #${record.product_id}`}</h3>
              <p>Supplier: {record.supplier_name || `Supplier #${record.supplier_id}`}</p>
              <p>In stock: {record.items_in_stock} · Status: {record.payment_status}</p>
            </div>
            <button style={buttonStyle} onClick={() => navigate(`/clerk/edit/${record.record_id}`)}>Edit</button>
          </div>
        ))}
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Quick Actions</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button style={buttonStyle} onClick={() => navigate("/clerk/records")}>Record Inventory</button>
          <button style={buttonStyle} onClick={() => navigate("/clerk/supplyreq")}>Request Supply</button>
          <button style={buttonStyle} onClick={() => navigate("/clerk/inventory")}>View Inventory</button>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return <div style={cardStyle}><h3>{label}</h3><h2>{value}</h2></div>;
}

const summaryGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginTop: "24px" };
const cardStyle = { border: "1px solid #E5E7EB", borderRadius: "12px", padding: "20px", textAlign: "center" };
const buttonStyle = { padding: "12px 18px", border: "none", borderRadius: "8px", background: "#2563EB", color: "white", cursor: "pointer" };
const recordCard = { border: "1px solid #E5E7EB", borderRadius: "12px", padding: "16px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" };

export default ClerkDashboard;
