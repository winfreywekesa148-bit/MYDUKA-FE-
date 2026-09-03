import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";

function Inventory() {
  const navigate = useNavigate();

  // =====================================================
  // SAMPLE INVENTORY DATA
  // =====================================================

  const records = [
    {
      record_id: 1,
      product_id: 1,
      product_name: "Pishori Rice",
      supplier_id: 1,
      supplier_name: "Upendo Suppliers",
      clerk_id: 1,
      clerk_name: "John Mwangi",
      store_id: 1,
      store_name: "Main Branch",
      items_received: 50,
      items_in_stock: 42,
      items_spoilt: 2,
      buying_price: 150,
      selling_price: 200,
      payment_status: "Paid",
      created_at: "2026-09-03T09:30:00",
    },

    {
      record_id: 2,
      product_id: 2,
      product_name: "White Sugar",
      supplier_id: 2,
      supplier_name: "Kenya Foods Ltd",
      clerk_id: 2,
      clerk_name: "Mary Wanjiku",
      store_id: 1,
      store_name: "Main Branch",
      items_received: 100,
      items_in_stock: 76,
      items_spoilt: 1,
      buying_price: 120,
      selling_price: 160,
      payment_status: "Partial",
      created_at: "2026-09-03T10:15:00",
    },

    {
      record_id: 3,
      product_id: 3,
      product_name: "Cooking Oil 1L",
      supplier_id: 3,
      supplier_name: "Bidco Africa",
      clerk_id: 1,
      clerk_name: "John Mwangi",
      store_id: 2,
      store_name: "Westlands Branch",
      items_received: 60,
      items_in_stock: 48,
      items_spoilt: 0,
      buying_price: 210,
      selling_price: 260,
      payment_status: "Paid",
      created_at: "2026-09-03T11:00:00",
    },

    {
      record_id: 4,
      product_id: 4,
      product_name: "Maize Flour 2KG",
      supplier_id: 4,
      supplier_name: "Unga Group",
      clerk_id: 3,
      clerk_name: "Peter Otieno",
      store_id: 2,
      store_name: "Westlands Branch",
      items_received: 80,
      items_in_stock: 65,
      items_spoilt: 3,
      buying_price: 110,
      selling_price: 145,
      payment_status: "Unpaid",
      created_at: "2026-09-03T12:20:00",
    },

    {
      record_id: 5,
      product_id: 5,
      product_name: "Blue Band 500G",
      supplier_id: 5,
      supplier_name: "Brookside Suppliers",
      clerk_id: 2,
      clerk_name: "Mary Wanjiku",
      store_id: 1,
      store_name: "Main Branch",
      items_received: 40,
      items_in_stock: 31,
      items_spoilt: 1,
      buying_price: 180,
      selling_price: 230,
      payment_status: "Paid",
      created_at: "2026-09-03T13:10:00",
    },
  ];

  // =====================================================
  // PAYMENT STATUS STYLE
  // =====================================================

  const getPaymentStatusStyle = (status) => {
    const value = status.toLowerCase();

    if (value === "paid") {
      return {
        background: "#DCFCE7",
        color: "#166534",
      };
    }

    if (value === "partial") {
      return {
        background: "#FEF3C7",
        color: "#92400E",
      };
    }

    return {
      background: "#FEE2E2",
      color: "#991B1B",
    };
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="admin-dashboard">

      <Sidebar role="clerk" />

      <main style={pageStyle}>

        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate("/clerk/dashboard")}
          style={backButtonStyle}
        >
          ← Back to Dashboard
        </button>

        {/* HEADER */}
        <div style={headerStyle}>

          <div>
            <h1 style={titleStyle}>
              Inventory
            </h1>

            <p style={subtitleStyle}>
              View and manage all inventory records.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/clerk/records")}
            style={addButtonStyle}
          >
            + Add Inventory
          </button>

        </div>

        {/* SUMMARY CARDS */}
        <div style={summaryContainer}>

          <div style={summaryCard}>
            <p style={summaryLabel}>
              Total Products
            </p>

            <h2 style={summaryValue}>
              {records.length}
            </h2>
          </div>

          <div style={summaryCard}>
            <p style={summaryLabel}>
              Items Received
            </p>

            <h2 style={summaryValue}>
              {records.reduce(
                (total, record) =>
                  total + record.items_received,
                0
              )}
            </h2>
          </div>

          <div style={summaryCard}>
            <p style={summaryLabel}>
              Items In Stock
            </p>

            <h2 style={summaryValue}>
              {records.reduce(
                (total, record) =>
                  total + record.items_in_stock,
                0
              )}
            </h2>
          </div>

          <div style={summaryCard}>
            <p style={summaryLabel}>
              Spoilt Items
            </p>

            <h2 style={summaryValue}>
              {records.reduce(
                (total, record) =>
                  total + record.items_spoilt,
                0
              )}
            </h2>
          </div>

        </div>

        {/* INVENTORY TABLE */}
        <div style={tableContainer}>

          <table style={tableStyle}>

            {/* =================================================
                TABLE HEAD
            ================================================= */}

            <thead>

              <tr style={tableHeaderRow}>

                <th style={thStyle}>
                  #
                </th>

                <th style={thStyle}>
                  Product
                </th>

                <th style={thStyle}>
                  Supplier
                </th>

                <th style={thStyle}>
                  Clerk
                </th>

                <th style={thStyle}>
                  Store
                </th>

                <th style={thStyle}>
                  Received
                </th>

                <th style={thStyle}>
                  In Stock
                </th>

                <th style={thStyle}>
                  Spoilt
                </th>

                <th style={thStyle}>
                  Buying Price
                </th>

                <th style={thStyle}>
                  Selling Price
                </th>

                <th style={thStyle}>
                  Payment
                </th>

                <th style={thStyle}>
                  Action
                </th>

              </tr>

            </thead>

            {/* =================================================
                TABLE BODY
            ================================================= */}

            <tbody>

              {records.map((record) => (

                <tr
                  key={record.record_id}
                  style={tableRowStyle}
                >

                  {/* ID */}
                  <td style={tdStyle}>
                    {record.record_id}
                  </td>

                  {/* PRODUCT */}
                  <td style={tdStyle}>

                    <strong>
                      {record.product_name}
                    </strong>

                    <small style={smallText}>
                      ID: {record.product_id}
                    </small>

                  </td>

                  {/* SUPPLIER */}
                  <td style={tdStyle}>

                    {record.supplier_name}

                    <small style={smallText}>
                      ID: {record.supplier_id}
                    </small>

                  </td>

                  {/* CLERK */}
                  <td style={tdStyle}>

                    {record.clerk_name}

                    <small style={smallText}>
                      ID: {record.clerk_id}
                    </small>

                  </td>

                  {/* STORE */}
                  <td style={tdStyle}>

                    {record.store_name}

                    <small style={smallText}>
                      ID: {record.store_id}
                    </small>

                  </td>

                  {/* RECEIVED */}
                  <td style={tdStyle}>
                    {record.items_received}
                  </td>

                  {/* STOCK */}
                  <td style={tdStyle}>

                    <strong>
                      {record.items_in_stock}
                    </strong>

                  </td>

                  {/* SPOILT */}
                  <td style={tdStyle}>

                    <span
                      style={{
                        color:
                          record.items_spoilt > 0
                            ? "#DC2626"
                            : "#16A34A",
                        fontWeight: "600",
                      }}
                    >
                      {record.items_spoilt}
                    </span>

                  </td>

                  {/* BUYING PRICE */}
                  <td style={tdStyle}>

                    KSh{" "}
                    {record.buying_price.toLocaleString()}

                  </td>

                  {/* SELLING PRICE */}
                  <td style={tdStyle}>

                    KSh{" "}
                    {record.selling_price.toLocaleString()}

                  </td>

                  {/* PAYMENT */}
                  <td style={tdStyle}>

                    <span
                      style={{
                        ...statusStyle,
                        ...getPaymentStatusStyle(
                          record.payment_status
                        ),
                      }}
                    >
                      {record.payment_status}
                    </span>

                  </td>

                  {/* ACTION */}
                  <td style={tdStyle}>

                    <button
                      type="button"
                      style={editButton}
                      onClick={() =>
                        navigate(
                          `/clerk/edit/${record.record_id}`
                        )
                      }
                    >
                      Edit
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}


// ============================================================
// PAGE STYLE
// ============================================================

const pageStyle = {
  padding: "30px",
  width: "100%",
  boxSizing: "border-box",
};


// ============================================================
// HEADER
// ============================================================

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
  gap: "20px",
};


const titleStyle = {
  margin: "0 0 5px",
  fontSize: "32px",
  fontWeight: "700",
  color: "#1F2937",
};


const subtitleStyle = {
  margin: 0,
  color: "#64748B",
};


// ============================================================
// BACK BUTTON
// ============================================================

const backButtonStyle = {
  background: "#6B7280",
  color: "#FFFFFF",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "20px",
  fontWeight: "600",
};


// ============================================================
// ADD BUTTON
// ============================================================

const addButtonStyle = {
  background: "#14A02C",
  color: "#FFFFFF",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
};


// ============================================================
// SUMMARY CARDS
// ============================================================

const summaryContainer = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  marginBottom: "25px",
};


const summaryCard = {
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "12px",
  padding: "20px",
  boxShadow:
    "0 4px 12px rgba(15, 23, 42, 0.06)",
};


const summaryLabel = {
  margin: "0 0 8px",
  color: "#64748B",
  fontSize: "14px",
};


const summaryValue = {
  margin: 0,
  fontSize: "28px",
  color: "#14A02C",
};


// ============================================================
// TABLE
// ============================================================

const tableContainer = {
  width: "100%",
  overflowX: "auto",
  background: "#FFFFFF",
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
  boxShadow:
    "0 4px 15px rgba(15, 23, 42, 0.06)",
};


const tableStyle = {
  width: "100%",
  minWidth: "1200px",
  borderCollapse: "collapse",
};


const tableHeaderRow = {
  background: "#F0FDF4",
};


const thStyle = {
  padding: "14px 12px",
  textAlign: "left",
  fontSize: "13px",
  fontWeight: "700",
  color: "#166534",
  borderBottom: "2px solid #BBF7D0",
  whiteSpace: "nowrap",
};


const tableRowStyle = {
  borderBottom: "1px solid #E5E7EB",
};


const tdStyle = {
  padding: "14px 12px",
  fontSize: "14px",
  color: "#374151",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
};


// ============================================================
// SMALL TEXT
// ============================================================

const smallText = {
  display: "block",
  fontSize: "11px",
  color: "#94A3B8",
  marginTop: "3px",
};


// ============================================================
// PAYMENT STATUS
// ============================================================

const statusStyle = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
};


// ============================================================
// EDIT BUTTON
// ============================================================

const editButton = {
  background: "#2563EB",
  color: "#FFFFFF",
  border: "none",
  padding: "7px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
};


export default Inventory;
