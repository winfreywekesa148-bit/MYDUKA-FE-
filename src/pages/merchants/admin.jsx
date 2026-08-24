import React from "react";
import ActiveButton from "../../components/active_button";

function Admin() {
  const admins = [
    {
      id: 1,
      name: "Admin One",
      email: "admin1@myduka.com",
      active: true,
    },
    {
      id: 2,
      name: "Admin Two",
      email: "admin2@myduka.com",
      active: false,
    },
  ];

  return (
    <div>
      <h1>Store Administrators</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>
                <ActiveButton active={admin.active} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;

