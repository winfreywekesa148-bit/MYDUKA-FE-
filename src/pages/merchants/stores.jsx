import React from "react";

function Stores() {
  const stores = [
    {
      id: 1,
      name: "Store 1",
      location: "Nairobi",
    },
    {
      id: 2,
      name: "Store 2",
      location: "Kiambu",
    },
  ];

  return (
    <div>
      <h1>My Stores</h1>

      {stores.map((store) => (
        <div key={store.id}>
          <h2>{store.name}</h2>
          <p>Location: {store.location}</p>
        </div>
      ))}
    </div>
  );
}

export default Stores;