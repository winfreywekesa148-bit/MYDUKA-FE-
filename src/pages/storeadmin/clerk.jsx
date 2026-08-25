import { useState } from "react";
import ErrorMessage from "../../components/errorMessage";

function Records() {
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    paymentStatus: "unpaid",
    buyingPrice: "",
    sellingPrice: "",
    spoilt: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  