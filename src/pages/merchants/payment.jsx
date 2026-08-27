import React, { useState } from "react";
import UnpaidButton from "../../components/un_paid_button";

function Payment() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      description: "Supplier Payment",
      amount: 15000,
      paid: true,
    },
    {
      id: 2,
      description: "Stock Payment",
      amount: 8500,
      paid: false,
    },
  ]);

  const togglePaymentStatus = (id) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === id
          ? { ...payment, paid: !payment.paid }
          : payment
      )
    );
  };

  return (
    <div>
      <h1>Payments</h1>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.description}</td>

              <td>
                KSh {payment.amount.toLocaleString()}
              </td>

              <td>
                {payment.paid ? (
                  <span>Paid</span>
                ) : (
                  <UnpaidButton />
                )}
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => togglePaymentStatus(payment.id)}
                >
                  {payment.paid ? "Mark Unpaid" : "Mark Paid"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payment;