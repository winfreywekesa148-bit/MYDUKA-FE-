import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <button onClick={() => navigate("/clerk")}
        style={buttonStyle}>
        Back to Dashboard </button>

      <h1>Inventory</h1>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product.id}
            style={cardStyle}>
            <div>
              <h3>{product.name}</h3>
              <p>Stock: {product.stock}</p>
              <p>Selling Price: KSh {product.selling_price}</p>
            </div>

            <button style={editButton}
              onClick={() => navigate(`/clerk/edit/${product.id}`)}>
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