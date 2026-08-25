import { useState } from "react";
import ErrorMessage from "../../components/errorMessage";

function SupplyReq() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const [requests, setRequests] = useState([
    { id: 1,  product: "Rice",
      quantity: 50, status: "Pending",
    },
    { id: 2, product: "Milk",
      quantity: 20,
      status: "Approved",
    },
  ]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!product || !quantity) {
      setError("Please fill in all fields.");
      return;
    }

    const newRequest = { id: Date.now(),
      product, quantity,
      status: "Pending",};

    setRequests([newRequest, ...requests]);
    setProduct("");
    setQuantity("");
    setError("");
  }

  function getStatusStyle(status) {
    switch (status) {case "Approved":
        return { background: "#DCFCE7",
          color: "#166534",};

      case "Declined":
        return {background: "#FEE2E2",
          color: "#991B1B", };

      default:
        return { background: "#FEF3C7",
          color: "#92400E",};
    }}

  return (
    <div style={{ padding: "24px", maxWidth: "700px" }}>
      <h1>Supply Requests</h1>
      <p>Request additional stock from the store admin.</p>

      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>Product</label>
          <input type="text" value={product}
            onChange={(e) => setProduct(e.target.value)}
            style={{ width: "100%", padding: "10px" }}/>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Quantity</label>
          <input type="number" value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: "100%", padding: "10px" }}/>
        </div>