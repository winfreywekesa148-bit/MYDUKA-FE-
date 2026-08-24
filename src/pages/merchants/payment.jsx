import React from "react";
import UnpaidButton from "../../components/un_paid_button";

function Payment() {
  const payments = [
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
  ];

  return (
    <div>
      <h1>Payments</h1>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.description}</td>
              <td>KSh {payment.amount.toLocaleString()}</td>
              <td>
                {payment.paid ? (
                  <span>Paid</span>
                ) : (
                  <UnpaidButton />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payment;