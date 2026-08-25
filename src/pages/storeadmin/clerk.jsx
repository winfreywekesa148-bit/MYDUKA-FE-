import { useState } from "react";
import ErrorMessage from "../../components/errorMessage";

function Records() {
  const [formData, setFormData] = useState({
    product: "",  quantity: "",
    paymentStatus: "unpaid",  buyingPrice: "",
    sellingPrice: "",  spoilt: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev,
      [name]: value,}));
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
    console.log(formData); }

  return (
    <div style={{ padding: "24px", maxWidth: "600px" }}>
      <h1>Record Inventory</h1>

      <ErrorMessage message={error} />

      {success && (
        <div
          style={{
            background: "#DCFCE7",
            color: "#166534",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}>
          {success}
        </div>
      )}

      