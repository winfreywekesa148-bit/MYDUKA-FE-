import { useState } from "react";
import DeleteButton from "../../components/delete_button";
import ErrorMessage from "../../components/errorMessage";

function Clerk() {
  const [error, setError] = useState("");

  const [clerks, setClerks] = useState([
    { id: 1, name: "Joel", status: "Active" },
    { id: 2, name: "Mary", status: "Active" },
    { id: 3, name: "James", status: "Inactive" },
  ]);
  const [search, setSearch] = useState("");

  function handleDelete(id) {
    setClerks(clerks.filter((clerk) => clerk.id !== id));}

  const filteredClerks = clerks.filter((clerk) =>
    clerk.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: "24px" }}>
      <h1>Clerk Management</h1>
      <ErrorMessage message={error} />

      <input type="text"
        placeholder="Search clerk..." value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: "350px",
          padding: "10px", marginBottom: "20px", }} />

      {filteredClerks.length === 0 ? (
        <p>No clerks found.</p>
      ) : (
        filteredClerks.map((clerk) => (
          <div key={clerk.id}
            style={{display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ddd",
              padding: "15px", borderRadius: "8px",
              marginBottom: "12px",
            }}>
            <div>
              <h3>{clerk.name}</h3>
              <p>Status: {clerk.status}</p>
            </div>

            <DeleteButton text="Delete"
              onDelete={() => handleDelete(clerk.id)} />
          </div>
        ))
      )}
    </div>
  );}

export default Clerk;
