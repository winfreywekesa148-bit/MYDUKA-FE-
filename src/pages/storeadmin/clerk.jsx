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

     