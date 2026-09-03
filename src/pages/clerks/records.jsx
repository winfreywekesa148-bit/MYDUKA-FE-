import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import ActiveButton from "../../components/active_button";

const initialForm = {
  clerk_id: "",
  store_id: "",
  product_name: "",
  supplier_name: "",
  items_received: "",
  items_in_stock: "",
  items_spoilt: "0",
  buying_price: "",
  selling_price: "",
  payment_status: "unpaid",
};

function Records() {

  // =====================================================
  // RECORDS
  // =====================================================

  const [records, setRecords] = useState([]);

  // =====================================================
  // FORM
  // =====================================================

  const [form, setForm] = useState(initialForm);

  // =====================================================
  // ERROR
  // =====================================================

  const [error, setError] = useState("");

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const change = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD RECORD
  // =====================================================

  const addRecord = (event) => {
    event.preventDefault();

    setError("");

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!form.clerk_id || Number(form.clerk_id) <= 0) {
      setError("Please enter a valid Clerk ID.");
      return;
    }

    if (!form.store_id || Number(form.store_id) <= 0) {
      setError("Please enter a valid Store ID.");
      return;
    }

    if (!form.product_name.trim()) {
      setError("Please enter the product name.");
      return;
    }

    if (!form.supplier_name.trim()) {
      setError("Please enter the supplier name.");
      return;
    }

    if (
      !form.items_received ||
      Number(form.items_received) <= 0
    ) {
      setError("Please enter the number of items received.");
      return;
    }

    if (
      form.items_in_stock === "" ||
      Number(form.items_in_stock) < 0
    ) {
      setError("Please enter the number of items in stock.");
      return;
    }

    if (
      form.buying_price === "" ||
      Number(form.buying_price) < 0
    ) {
      setError("Please enter the buying price.");
      return;
    }

    if (
      form.selling_price === "" ||
      Number(form.selling_price) < 0
    ) {
      setError("Please enter the selling price.");
      return;
    }

    // =====================================================
    // CREATE NEW RECORD
    // =====================================================

    const newRecord = {
      id: Date.now(),

      clerk_id: Number(form.clerk_id),
      store_id: Number(form.store_id),

      product_name: form.product_name.trim(),
      supplier_name: form.supplier_name.trim(),

      items_received: Number(form.items_received),
      items_in_stock: Number(form.items_in_stock),
      items_spoilt: Number(form.items_spoilt || 0),

      buying_price: Number(form.buying_price),
      selling_price: Number(form.selling_price),

      payment_status: form.payment_status,
    };

    // =====================================================
    // ADD TO INVENTORY TABLE
    // =====================================================

    setRecords((currentRecords) => [
      ...currentRecords,
      newRecord,
    ]);

    // =====================================================
    // CLEAR FORM
    // =====================================================

    setForm(initialForm);
  };

  // =====================================================
  // DELETE RECORD
  // =====================================================

  const deleteRecord = (id) => {
    setRecords((currentRecords) =>
      currentRecords.filter(
        (record) => record.id !== id
      )
    );
  };

  // =====================================================
  // CHANGE PAYMENT STATUS
  // =====================================================

  const togglePaymentStatus = (id) => {
    setRecords((currentRecords) =>
      currentRecords.map((record) => {

        if (record.id !== id) {
          return record;
        }

        let newStatus;

        if (record.payment_status === "unpaid") {
          newStatus = "partial";
        } else if (
          record.payment_status === "partial"
        ) {
          newStatus = "paid";
        } else {
          newStatus = "unpaid";
        }

        return {
          ...record,
          payment_status: newStatus,
        };
      })
    );
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}

      <Sidebar role="clerk" />

      <main
        style={{
          width: "100%",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >

        {/* HEADER */}

        <h1 className="stadmin">
          Inventory Records
        </h1>

        <p className="stadmin">
          Add and manage your store inventory.
        </p>

        {/* ERROR MESSAGE */}

        {error && (
          <div
            style={{
              backgroundColor: "#FEF2F2",
              color: "#B91C1C",
              border: "1px solid #FECACA",
              padding: "12px 15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* =================================================
            ADD RECORD FORM
        ================================================= */}

        <form
          onSubmit={addRecord}
          className="addadmin"
        >

          <h2>Add Inventory Record</h2>

          {/* CLERK ID */}

          <input
            type="number"
            name="clerk_id"
            placeholder="Clerk ID"
            min="1"
            value={form.clerk_id}
            onChange={change}
          />

          {/* STORE ID */}

          <input
            type="number"
            name="store_id"
            placeholder="Store ID"
            min="1"
            value={form.store_id}
            onChange={change}
          />

          {/* PRODUCT */}

          <input
            type="text"
            name="product_name"
            placeholder="Product name"
            value={form.product_name}
            onChange={change}
          />

          {/* SUPPLIER */}

          <input
            type="text"
            name="supplier_name"
            placeholder="Supplier name"
            value={form.supplier_name}
            onChange={change}
          />

          {/* ITEMS RECEIVED */}

          <input
            type="number"
            name="items_received"
            placeholder="Items received"
            min="1"
            value={form.items_received}
            onChange={change}
          />

          {/* ITEMS IN STOCK */}

          <input
            type="number"
            name="items_in_stock"
            placeholder="Items now in stock"
            min="0"
            value={form.items_in_stock}
            onChange={change}
          />

          {/* SPOILT */}

          <input
            type="number"
            name="items_spoilt"
            placeholder="Spoilt items"
            min="0"
            value={form.items_spoilt}
            onChange={change}
          />

          {/* BUYING PRICE */}

          <input
            type="number"
            name="buying_price"
            placeholder="Buying price (KSh)"
            min="0"
            step="0.01"
            value={form.buying_price}
            onChange={change}
          />

          {/* SELLING PRICE */}

          <input
            type="number"
            name="selling_price"
            placeholder="Selling price (KSh)"
            min="0"
            step="0.01"
            value={form.selling_price}
            onChange={change}
          />

          {/* PAYMENT STATUS */}

          <select
            name="payment_status"
            value={form.payment_status}
            onChange={change}
          >

            <option value="unpaid">
              Unpaid
            </option>

            <option value="partial">
              Partial
            </option>

            <option value="paid">
              Paid
            </option>

          </select>

          {/* ADD BUTTON */}

          <button
            className="buttons"
            type="submit"
          >
            Add Inventory Record
          </button>

        </form>

        {/* =================================================
            INVENTORY TABLE
        ================================================= */}

        <h2 style={{ marginTop: "40px" }}>
          Inventory
        </h2>

        {records.length === 0 ? (

          <p>
            No inventory records added yet.
          </p>

        ) : (

          <div
            style={{
              overflowX: "auto",
            }}
          >

            <table className="table-container">

              <thead>

                <tr>

                  <th>Product</th>

                  <th>Supplier</th>

                  <th>Received</th>

                  <th>In Stock</th>

                  <th>Spoilt</th>

                  <th>Buying Price</th>

                  <th>Selling Price</th>

                  <th>Payment</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {records.map((record) => (

                  <tr key={record.id}>

                    <td>
                      {record.product_name}
                    </td>

                    <td>
                      {record.supplier_name}
                    </td>

                    <td>
                      {record.items_received}
                    </td>

                    <td>
                      {record.items_in_stock}
                    </td>

                    <td>
                      {record.items_spoilt}
                    </td>

                    <td>
                      KSh {record.buying_price}
                    </td>

                    <td>
                      KSh {record.selling_price}
                    </td>

                    <td>

                      <ActiveButton
                        active={
                          record.payment_status ===
                          "paid"
                        }
                        onClick={() =>
                          togglePaymentStatus(
                            record.id
                          )
                        }
                      />

                      <span
                        style={{
                          marginLeft: "8px",
                          textTransform: "capitalize",
                        }}
                      >
                        {record.payment_status}
                      </span>

                    </td>

                    <td>

                      <button
                        type="button"
                        onClick={() =>
                          deleteRecord(record.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </main>

    </div>
  );
}


// =====================================================
// STYLES
// =====================================================

const pageStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "40px 20px",
  color: "#1F2937",
};

const headerStyle = {
  marginBottom: "25px",
};

const titleStyle = {
  margin: "0 0 8px",
  fontSize: "32px",
  fontWeight: "700",
};

const subtitleStyle = {
  margin: 0,
  color: "#64748B",
  fontSize: "16px",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",

  gap: "20px",

  padding: "30px",

  background: "#FFFFFF",

  border: "1px solid #e3f0e2",

  borderRadius: "16px",

  boxShadow:
    "0 8px 25px rgba(15, 23, 42, 0.08)",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",

  padding: "12px 14px",

  border: "1px solid #cbe1cc",

  borderRadius: "8px",

  fontSize: "15px",

  outline: "none",

  background: "#FFFFFF",
};

const primaryButton = {
  gridColumn: "1 / -1",

  background: "#14a02c",

  color: "#FFFFFF",

  border: "none",

  borderRadius: "8px",

  padding: "14px",

  fontSize: "16px",

  fontWeight: "600",

  marginTop: "5px",
};

const backButton = {
  background: "#4B5563",

  color: "#FFFFFF",

  border: "none",

  borderRadius: "8px",

  padding: "10px 16px",

  cursor: "pointer",

  fontWeight: "600",

  marginBottom: "25px",
};

const errorStyle = {
  color: "#B91C1C",

  background: "#FEF2F2",

  border: "1px solid #FECACA",

  padding: "12px 15px",

  borderRadius: "8px",

  marginBottom: "20px",
};

export default Records;
