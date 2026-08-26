import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRecord() {
  const { recordId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    items_received: "",
    items_in_stock: "",
    items_spoilt: "",
    buying_price: "",
    selling_price: "",
    payment_status: "unpaid",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/records/${recordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(console.error);
  }, [recordId]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`http://127.0.0.1:5000/records/${recordId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    navigate("/clerk");
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>Edit Record #{recordId}</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="items_received"
          value={formData.items_received}
          onChange={handleChange}
          placeholder="Items Received"
        />

        <input
          name="items_in_stock"
          value={formData.items_in_stock}
          onChange={handleChange}
          placeholder="Items in Stock"
        />

        <input name="items_spoilt"
          value={formData.items_spoilt}
          onChange={handleChange}
          placeholder="Spoilt Items"
        />

        <input name="buying_price"
          value={formData.buying_price}
          onChange={handleChange}
          placeholder="Buying Price"/>

        <input name="selling_price"
          value={formData.selling_price}
          onChange={handleChange}
          placeholder="Selling Price"/>

        <select name="payment_status"
          value={formData.payment_status}
          onChange={handleChange}>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditRecord;