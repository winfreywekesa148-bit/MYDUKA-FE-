import React from "react";

function Stores() {
  const stores = [
    { id: 1, name: "Main Store", location: "Nairobi" },
    { id: 2, name: "Branch Store", location: "Kiambu" },
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
