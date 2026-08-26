import React, { useState } from "react";
import ErrorMessage from "../../components/errorMessage";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function Records() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product: "", quantity: "", supplierID: "",
    paymentStatus: "unpaid",
    buyingPrice: "",sellingPrice: "", 
    spoilt: "", clerkID: "", storeID: "", adminID: "",});

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
      const response = await fetch(`${API_URL}/records`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,},
        body: JSON.stringify({
          product_id: Number(formData.product),
          clerk_id: Number(formData.clerkID), 
          items_received: Number(formData.quantity),
          items_in_stock: Number(formData.quantity),
          supplier_id: Number(formData.supplierID),
          items_spoilt: Number(formData.spoilt || 0),
          buying_price: Number(formData.buyingPrice),
          selling_price: Number(formData.sellingPrice),
          payment_status: formData.paymentStatus,
          store_id: Number(formData.storeID), 
          admin_id: Number(formData.adminID),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save record.");
      }

      setSuccess("Record added successfully.");
      setError("");

      setFormData({product: "", quantity: "", supplierID: "",
        paymentStatus: "unpaid", buyingPrice: "",
        sellingPrice: "", spoilt: "", clerkID: "", storeID: "", adminID: "",});

    } catch (error) {
      setError(error.message);
    }
  }

const labelStyle = {display: "block", fontWeight: "600",
  marginBottom: "5px",  color: "#374151",};

const inputStyle = {width: "100%", padding: "10px",
  marginBottom: "16px", border: "1px solid #D1D5DB",
  borderRadius: "6px", boxSizing: "border-box",};

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
            color: "#166534", padding: "12px",
            borderRadius: "8px", marginBottom: "16px",
          }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* product input */}
        <label style={labelStyle}>Product ID</label>

        <input type="number" name="product"
          value={formData.product} onChange={handleChange}
          placeholder="Enter product ID" style={inputStyle}/>

        {/*clerkID */}
        <label style={labelStyle}>Clerk ID</label>
        <input type="number" name="clerkID"
          value={formData.clerkID} onChange={handleChange}
          placeholder="Enter clerk ID" style={inputStyle}/>

        {/*storeID */}
        <label style={labelStyle}>Store ID</label>
        <input type="number" name="storeID"
          value={formData.storeID} onChange={handleChange}
          placeholder="Enter store ID" style={inputStyle}/>

        {/* Admin ID */}
        <label style={labelStyle}>Admin ID</label>
        <input type="number" name="adminID"
          value={formData.adminID} onChange={handleChange}
          placeholder="Enter admin ID" style={inputStyle}/>
        
        <label style={labelStyle}>Supplier ID</label>
        <input type="number" name="supplierID"
          value={formData.supplierID} onChange={handleChange}
          placeholder="Enter supplier ID" required style={inputStyle}/>
       
        {/* Quantity */}
        <label style={labelStyle}>Quantity Received</label>
        <input type="number" name="quantity"
          value={formData.quantity} onChange={handleChange}
          placeholder="Enter quantity" min="1"
          style={inputStyle} />

        {/* Buying Price */}
        <label style={labelStyle}>Buying Price</label>

        <input type="number" name="buyingPrice"
          value={formData.buyingPrice} onChange={handleChange}
          placeholder="Enter buying price"
          min="0" step="0.01"
          style={inputStyle}/>

        {/* Selling Price */}
        <label style={labelStyle}>Selling Price</label>

        <input type="number"  name="sellingPrice"
          value={formData.sellingPrice} onChange={handleChange}
          placeholder="Enter selling price"
          min="0" step="0.01"
          style={inputStyle}/>

        {/* Spoilt Items */}
        <label style={labelStyle}>Spoilt Items</label>

        <input type="number"  name="spoilt"
          value={formData.spoilt} onChange={handleChange}
          placeholder="Enter number of spoilt items"
          min="0" style={inputStyle}/>

        {/* Payment Status */}
        <label style={labelStyle}>Payment Status</label>

        <select name="paymentStatus"
          value={formData.paymentStatus} onChange={handleChange}
          style={inputStyle} >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
          <option value="partial">Partial</option>
        </select>

        <button type="submit" style={{ background: "#2563EB", color: "white" }}>
          Save Record </button>
      </form>
    </div>
  );
}

export default Records;
