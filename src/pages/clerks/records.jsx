import React, { useState } from "react";
import ErrorMessage from "../../components/errorMessage";
import { useNavigate } from "react-router-dom";

function Records() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product: "", quantity: "",
    paymentStatus: "unpaid",
    buyingPrice: "",
    sellingPrice: "", spoilt: "",});

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev,
      [name]: value, }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.product || !formData.quantity) {
      setError("Product and quantity are required.");
      return;
    }
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:5000/records", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,},
        body: JSON.stringify({
          product_id: Number(formData.product),
          items_received: Number(formData.quantity),
          items_in_stock: Number(formData.quantity),
          items_spoilt: Number(formData.spoilt || 0),
          buying_price: Number(formData.buyingPrice),
          selling_price: Number(formData.sellingPrice),
          payment_status: formData.paymentStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save record.");
      }

      setSuccess("Record added successfully.");
      setError("");

      setFormData({product: "", quantity: "",
        paymentStatus: "unpaid", buyingPrice: "",
        sellingPrice: "", spoilt: "", });

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div style={{ padding: "24px", maxWidth: "600px" }}>
      <button
        onClick={() => navigate("/clerk")}
        style={{ background: "#6B7280",
          color: "white", border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          marginBottom: "20px",cursor: "pointer",
        }}>
        Back to Dashboard </button>

      <h1>Record Inventory</h1>

      <ErrorMessage message={error} />

      {success && (
        <div
          style={{ background: "#DCFCE7",
            color: "#166534",
            padding: "12px",
            borderRadius: "8px", marginBottom: "16px",
          }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Keep all your input fields here */}

        <button type="submit" style={{ background: "#2563EB", color: "white" }}>
          Save Record </button>
      </form>
    </div>
  );
}

export default Records;