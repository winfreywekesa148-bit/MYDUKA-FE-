import React from "react";

function ActiveButton({ active }) {
  return (
    <button type="button">
      {active ? "Active" : "Inactive"}
    </button>
  );
}

export default ActiveButton;
