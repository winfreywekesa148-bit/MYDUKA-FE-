import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import Sidebar from "../../components/sidebar";

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  clerk_id: "",
  store_id: "",
  product_name: "",
  supplier_name: "",
  items_received: "",
  items_in_stock: "",
  items_spoilt: "0",
  buying_price: "",
  selling_price: "",
  payment_status: "unpaid",
};

// =====================================================
// MAIN COMPONENT
// =====================================================

function Records() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const change = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const submit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      // Validate Clerk ID
      if (!form.clerk_id || Number(form.clerk_id) <= 0) {
        throw new Error("Please enter a valid Clerk ID.");
      }

      // Validate Store ID
      if (!form.store_id || Number(form.store_id) <= 0) {
        throw new Error("Please enter a valid Store ID.");
      }

      // Validate product
      if (!form.product_name.trim()) {
        throw new Error("Please enter the product name.");
      }

      // Validate supplier
      if (!form.supplier_name.trim()) {
        throw new Error("Please enter the supplier name.");
      }

      // Prepare data for Flask
      const recordData = {
        clerk_id: Number(form.clerk_id),
        store_id: Number(form.store_id),

        product_name: form.product_name.trim(),
        supplier_name: form.supplier_name.trim(),

        items_received: Number(form.items_received),
        items_in_stock: Number(form.items_in_stock),
        items_spoilt: Number(form.items_spoilt || 0),

        buying_price: Number(form.buying_price),
        selling_price: Number(form.selling_price),

        payment_status: form.payment_status,
      };

      console.log("Sending inventory record:", recordData);

      // Send record to Flask
      const response = await fetch(`${API_URL}/records`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(recordData),
      });

      const data = await response.json();

      console.log("Backend response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to create the inventory record."
        );
      }

      // Successful save
      alert("Inventory record created successfully!");

      // Go back to inventory
      navigate("/clerk/inventory");

    } catch (submitError) {
      console.error("Inventory error:", submitError);

      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}
      <Sidebar role="clerk" />

      <main style={pageStyle}>

        {/* BACK BUTTON */}
        <button
          type="button"
          style={backButton}
          onClick={() => navigate("/clerk/dashboard")}
        >
          ← Back to Dashboard
        </button>

        {error && (
        <div
          style={{
            backgroundColor: "#DCFCE7",
            color: "#166534",
            border: "1px solid #86EFAC",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          {error}
          
        </div>
      )}

        {/* PAGE HEADER */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            Record Inventory
          </h1>

          <p style={subtitleStyle}>
            Record the products received, stock available,
            supplier information and payment status.
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div role="alert" style={errorStyle}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={submit} style={formStyle}>

          {/* ===============================
              CLERK ID
          =============================== */}

          <Field
            label="Clerk ID"
            name="clerk_id"
            value={form.clerk_id}
            onChange={change}
            min="1"
            placeholder="e.g. 1"
          />

          {/* ===============================
              STORE ID
          =============================== */}

          <Field
            label="Store ID"
            name="store_id"
            value={form.store_id}
            onChange={change}
            min="1"
            placeholder="e.g. 1"
          />

          {/* ===============================
              PRODUCT
          =============================== */}

          <TextField
            label="Product Name"
            name="product_name"
            value={form.product_name}
            onChange={change}
            placeholder="e.g. Pishori Rice"
          />

          {/* ===============================
              SUPPLIER
          =============================== */}

          <TextField
            label="Supplier Name"
            name="supplier_name"
            value={form.supplier_name}
            onChange={change}
            placeholder="e.g. Upendo Suppliers"
          />

          {/* ===============================
              ITEMS RECEIVED
          =============================== */}

          <Field
            label="Items Received"
            name="items_received"
            value={form.items_received}
            onChange={change}
            min="1"
            placeholder="e.g. 20"
          />

          {/* ===============================
              ITEMS IN STOCK
          =============================== */}

          <Field
            label="Items Now in Stock"
            name="items_in_stock"
            value={form.items_in_stock}
            onChange={change}
            min="0"
            placeholder="e.g. 20"
          />

          {/* ===============================
              SPOILT ITEMS
          =============================== */}

          <Field
            label="Spoilt Items"
            name="items_spoilt"
            value={form.items_spoilt}
            onChange={change}
            min="0"
            required={false}
            placeholder="e.g. 0"
          />

          {/* ===============================
              BUYING PRICE
          =============================== */}

          <Field
            label="Buying Price (KSh)"
            name="buying_price"
            value={form.buying_price}
            onChange={change}
            min="0"
            step="0.01"
            placeholder="e.g. 150"
          />

          {/* ===============================
              SELLING PRICE
          =============================== */}

          <Field
            label="Selling Price (KSh)"
            name="selling_price"
            value={form.selling_price}
            onChange={change}
            min="0"
            step="0.01"
            placeholder="e.g. 200"
          />

          {/* ===============================
              PAYMENT STATUS
          =============================== */}

          <div style={inputGroupStyle}>

            <label style={labelStyle}>
              Payment Status
            </label>

            <select
              name="payment_status"
              value={form.payment_status}
              onChange={change}
              style={inputStyle}
            >
              <option value="unpaid">
                Unpaid
              </option>

              <option value="partial">
                Partial
              </option>

              <option value="paid">
                Paid
              </option>
            </select>

          </div>

          {/* ===============================
              SUBMIT BUTTON
          =============================== */}

          <button
            type="submit"
            disabled={saving}
            style={{
              ...primaryButton,
              opacity: saving ? 0.6 : 1,
              cursor: saving
                ? "not-allowed"
                : "pointer",
            }}
          >
            {saving
              ? "Saving..."
              : "Save Inventory Record"}
          </button>

        </form>

      </main>
    </div>
  );
}

// =====================================================
// NUMBER FIELD
// =====================================================

function Field({
  label,
  name,
  value,
  onChange,
  required = true,
  ...props
}) {
  return (
    <div style={inputGroupStyle}>

      <label style={labelStyle}>
        {label}
      </label>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
        {...props}
      />

    </div>
  );
}

// =====================================================
// TEXT FIELD
// =====================================================

function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = true,
}) {
  return (
    <div style={inputGroupStyle}>

      <label style={labelStyle}>
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
      />

    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const pageStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "40px 20px",
  color: "#1F2937",
};

const headerStyle = {
  marginBottom: "25px",
};

const titleStyle = {
  margin: "0 0 8px",
  fontSize: "32px",
  fontWeight: "700",
};

const subtitleStyle = {
  margin: 0,
  color: "#64748B",
  fontSize: "16px",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",

  gap: "20px",

  padding: "30px",

  background: "#FFFFFF",

  border: "1px solid #e3f0e2",

  borderRadius: "16px",

  boxShadow:
    "0 8px 25px rgba(15, 23, 42, 0.08)",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",

  padding: "12px 14px",

  border: "1px solid #cbe1cc",

  borderRadius: "8px",

  fontSize: "15px",

  outline: "none",

  background: "#FFFFFF",
};

const primaryButton = {
  gridColumn: "1 / -1",

  background: "#14a02c",

  color: "#FFFFFF",

  border: "none",

  borderRadius: "8px",

  padding: "14px",

  fontSize: "16px",

  fontWeight: "600",

  marginTop: "5px",
};

const backButton = {
  background: "#4B5563",

  color: "#FFFFFF",

  border: "none",

  borderRadius: "8px",

  padding: "10px 16px",

  cursor: "pointer",

  fontWeight: "600",

  marginBottom: "25px",
};

const errorStyle = {
  color: "#B91C1C",

  background: "#FEF2F2",

  border: "1px solid #FECACA",

  padding: "12px 15px",

  borderRadius: "8px",

  marginBottom: "20px",
};

export default Records;
