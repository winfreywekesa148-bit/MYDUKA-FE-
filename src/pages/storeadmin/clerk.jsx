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
  }

  