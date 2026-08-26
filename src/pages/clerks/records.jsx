import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const initialForm = { clerk_name: "", product_name: "", supplier_name: "", store_name: "", items_received: "", items_in_stock: "", items_spoilt: "0", buying_price: "", selling_price: "", payment_status: "unpaid" };

function Records() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [options, setOptions] = useState({ clerks: [], stores: [] });
  const [error, setError] = useState("");
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await fetch(`${API_URL}/inventory-options`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `The API returned ${response.status}.`);
        setOptions(data);
      } catch (loadError) {
        setError(`Could not load clerks and stores. ${loadError.message} Start the backend, then refresh this page.`);
      } finally {
        setLoadingOptions(false);
      }
    };
    loadOptions();
  }, []);

  const change = ({ target }) => setForm({ ...form, [target.name]: target.value });
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true); setError("");
    try {
      const response = await fetch(`${API_URL}/records`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, items_received: Number(form.items_received), items_in_stock: Number(form.items_in_stock), items_spoilt: Number(form.items_spoilt), buying_price: Number(form.buying_price), selling_price: Number(form.selling_price) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to create the record.");
      navigate("/clerk/inventory");
    } catch (submitError) { setError(submitError.message); } finally { setSaving(false); }
  };

  return <main style={pageStyle}>
    <button style={backButton} onClick={() => navigate("/clerk")}>← Dashboard</button>
    <h1>Record Inventory</h1><p>Choose your name and branch, then type the product and supplier names.</p>
    {error && <p role="alert" style={errorStyle}>{error}</p>}
    {loadingOptions && <p>Loading available clerks and stores…</p>}
    <form onSubmit={submit} style={formStyle}>
      <Select label="Clerk" name="clerk_name" value={form.clerk_name} options={options.clerks} onChange={change} />
      <Select label="Store or branch" name="store_name" value={form.store_name} options={options.stores} onChange={change} />
      <TextField label="Product name" name="product_name" value={form.product_name} onChange={change} placeholder="e.g. Pishori rice" />
      <TextField label="Supplier name" name="supplier_name" value={form.supplier_name} onChange={change} placeholder="e.g. Upendo Suppliers" />
      <Field label="Items received" name="items_received" value={form.items_received} onChange={change} min="1" />
      <Field label="Items now in stock" name="items_in_stock" value={form.items_in_stock} onChange={change} min="0" />
      <Field label="Spoilt items" name="items_spoilt" value={form.items_spoilt} onChange={change} min="0" required={false} />
      <Field label="Buying price (KSh)" name="buying_price" value={form.buying_price} onChange={change} min="0" step="0.01" />
      <Field label="Selling price (KSh)" name="selling_price" value={form.selling_price} onChange={change} min="0" step="0.01" />
      <div><label>Payment status</label><select name="payment_status" value={form.payment_status} onChange={change}><option value="unpaid">Unpaid</option><option value="partial">Partial</option><option value="paid">Paid</option></select></div>
      <button disabled={saving || loadingOptions} style={primaryButton}>{saving ? "Saving…" : "Save inventory record"}</button>
    </form>
  </main>;
}
function Select({ label, name, value, options, onChange }) { return <div><label>{label}</label><select name={name} value={value} onChange={onChange} required><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>; }
function Field({ label, name, value, onChange, required = true, ...props }) { return <div><label>{label}</label><input type="number" name={name} value={value} onChange={onChange} required={required} {...props} /></div>; }
function TextField({ label, name, value, onChange, placeholder }) { return <div><label>{label}</label><input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} required /></div>; }
const pageStyle = { maxWidth: "760px", margin: "0 auto", padding: "32px 20px", color: "#1F2937" }; const formStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px", padding: "24px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "16px", boxShadow: "0 8px 22px rgba(15, 23, 42, 0.06)" }; const primaryButton = { background: "#2563EB", color: "white", border: 0, borderRadius: "8px", padding: "12px", cursor: "pointer", fontWeight: 600 }; const backButton = { ...primaryButton, background: "#4B5563", marginBottom: "12px" }; const errorStyle = { color: "#B91C1C", background: "#FEF2F2", padding: "10px", borderRadius: "8px" };
export default Records;
