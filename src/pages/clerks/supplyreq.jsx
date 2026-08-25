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