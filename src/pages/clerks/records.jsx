import { useState } from "react";
import ErrorMessage from "../../components/errorMessage";

function Records() {
  const [formData, setFormData] = useState({
    product: "", quantity: "",
    paymentStatus: "unpaid",
    buyingPrice: "",
    sellingPrice: "", spoilt: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.product || !formData.quantity) {
      setError("Product name and quantity are required.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Inventory record saved successfully.");
    console.log(formData);

    setFormData({product: "", quantity: "",
      paymentStatus: "unpaid", buyingPrice: "",
      sellingPrice: "", spoilt: "", });}

     return (
    <div style={{ padding: "24px", maxWidth: "600px" }}>
      <h1>Record Inventory</h1>
      <p>Enter the details of newly received products.</p>
      <ErrorMessage message={error} />

      {success && (
        <div style={{
            background: "#DCFCE7",
            color: "#166534",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
          }} >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>Product Name</label>
          <input type="text" name="product"
            value={formData.product}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }}/>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Quantity Received</label>
          <input type="number" name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }}/>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Payment Status</label>
          <select name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }} >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Buying Price</label>
          <input type="number" name="buyingPrice"
            value={formData.buyingPrice}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }}/>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Selling Price</label>
          <input type="number" name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }}/>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Spoilt Items</label>
          <input type="number" name="spoilt"
            value={formData.spoilt}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }}/>
        </div>

        <button type="submit"
          style={{ background: "#2563EB",
            color: "white",  border: "none",
            padding: "12px 20px",
            borderRadius: "8px",cursor: "pointer",
          }}> Save Record</button>
      </form>
    </div>
  );}

export default Records;

