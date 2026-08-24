import { useState } from "react";
import DeleteButton from "../../components/delete_button";
import ErrorMessage from "../../components/errorMessage";

function ClerkDashboard() {
  const [error, setError] = useState("");

  const records = [
    { id: 1, name: "Rice", stock: 120 },
    { id: 2, name: "Milk", stock: 45 },
    { id: 3, name: "Sugar", stock: 80 },
  ];

  function handleDelete(id) {
    setError(`Delete action for record ${id} is not connected yet.`);
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>Clerk Dashboard</h1>
      <p>Manage inventory records.</p>

      <ErrorMessage message={error} />

      {records.map((record) => (
        <div
          key={record.id}
          style={{ border: "1px solid #E5E7EB",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <div>
            <h3>{record.name}</h3>
            <p>Stock: {record.stock}</p>
          </div>

          <DeleteButton text="Delete"
            onDelete={() => handleDelete(record.id)}/>
        </div> 
      ))}
    </div>
  );
}

export default ClerkDashboard;
