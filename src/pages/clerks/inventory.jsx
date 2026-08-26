import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import Records from "./records";

function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/records`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <button onClick={() => navigate("/clerk")}
        style={buttonStyle}>
        Back to Dashboard </button>

      <h1>Inventory</h1>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((record) => (
          <div key={record.record_id} style={cardStyle}>
            <div>
              <h3>{record.name}</h3>
              <p>Product id: {record.product_id}</p>
              <p>Selling Price: KSh {record.selling_price}</p>
              <p>Received: {record.items_received}</p>
              <p>In Stock: {record.items_in_stock}</p>
             <p>Spoilt: {record.items_spoilt}</p>
             <p>Buying Price: KSh {record.buying_price}</p>
             <p>Selling Price: KSh {record.selling_price}</p>
             <p>Payment: {record.payment_status}</p>
           
            <div key={record.product_id} style={cardStyle}>

            </div>
         </div>

            <button style={editButton}
              onClick={() => navigate(`/clerk/edit/${record.record_id}`)}>
              Edit</button>
          </div>
        ))
      )}
    </div>
  );}

const cardStyle = {display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #E5E7EB",
  borderRadius: "10px",
  padding: "16px",
  marginBottom: "16px",
};

const buttonStyle = {background: "#6B7280",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "20px",
};

const editButton = {background: "#2563EB",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Inventory;