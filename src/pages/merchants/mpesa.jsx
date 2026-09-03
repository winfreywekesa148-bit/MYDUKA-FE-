import Sidebar from "../../components/sidebar";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";

function MpesaPayment() {
const [phone, setPhone] = useState("");
const [amount, setAmount] = useState("");
const [paymentId, setPaymentId] = useState(null);
const [status, setStatus] = useState("");
const [receipt, setReceipt] = useState("");

async function pay() {
try {
setStatus("");
setReceipt("");


  if (!phone || !amount) {
    setStatus("Please enter phone number and amount");
    return;
  }

  const res = await fetch(`${API_URL}/merchant/pay`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      record_id: 1,
      store_id: 1,
      phone_number: phone,
      amount: amount,
    }),
  });

  // Read response as text first
  const text = await res.text();

  console.log("BACKEND RESPONSE:", text);

  let data;

  try {
    data = JSON.parse(text);
  } catch (error) {
    console.error("Invalid JSON returned by server:", text);

    throw new Error(
      "Backend returned an invalid response. Check Render logs."
    );
  }

  // Handle backend errors
  if (!res.ok) {
    throw new Error(
      data.error ||
      data.details ||
      "M-Pesa payment failed"
    );
  }

  console.log("MPESA RESULT:", data);

  // Payment ID returned by your backend
  setPaymentId(data.payment_id || null);

  // Payment status
  setStatus(
    data.status ||
    data.CustomerMessage ||
    "Payment request sent successfully"
  );

} catch (error) {

  console.error("PAYMENT ERROR:", error);

  setStatus(`Error: ${error.message}`);
}

}

useEffect(() => {
if (!paymentId) return;


const interval = setInterval(async () => {

  try {

    const res = await fetch(
      `${API_URL}/payments/${paymentId}`
    );

    const text = await res.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "Invalid payment status response:",
        text
      );

      return;
    }

    if (!res.ok) {
      console.error("Payment status error:", data);
      return;
    }

    setStatus(data.status);

    setReceipt(
      data.mpesa_receipt_number || ""
    );

    // Stop checking when payment is complete
    if (
      data.status !== "Pending" &&
      data.status !== "pending"
    ) {
      clearInterval(interval);
    }

  } catch (error) {
    console.error(
      "STATUS CHECK ERROR:",
      error
    );
  }

}, 3000);

return () => clearInterval(interval);


}, [paymentId]);

return ( <div className="admin-dashboard">

  <Sidebar role="merchant" />

  <div className="merchant-header">
    <div>
      <h1>MPESA PAYMENT</h1>
      <p>Make and monitor your M-Pesa payments</p>
    </div>
  </div>


  <div className="merchant-content">

    <div className="payment-card">

      <h2>Make Payment</h2>

      <p className="card-description">
        Enter the customer's phone number and payment amount.
      </p>


      <div className="form-group">

        <label>Phone Number</label>

        <input
          type="text"
          placeholder="0712345678"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

      </div>


      <div className="form-group">

        <label>Amount</label>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

      </div>


      <button
        className="edibtn"
        onClick={pay}
      >
        Pay with M-Pesa
      </button>

    </div>


    {status && (

      <div className="status-card">

        <h2>Payment Status</h2>


        <div className="status-box">

          <span>Status</span>

          <strong>{status}</strong>

        </div>


        {paymentId && (

          <div className="payment-info">

            <p>
              <strong>Payment ID:</strong>{" "}
              {paymentId}
            </p>

          </div>

        )}


        {receipt && (

          <div className="receipt-box">

            <p>
              <strong>M-Pesa Receipt:</strong>
            </p>

            <span>{receipt}</span>

          </div>

        )}

      </div>

    )}

  </div>

</div>

);
}

export default MpesaPayment;
