import React from "react";
import { Routes, Route } from "react-router-dom";

import ClerkDashboard from "./pages/clerks/clerkdashboard";
import Records from "./pages/clerks/records";
import SupplyReq from "./pages/clerks/supplyreq";
import Inventory from "./pages/clerks/inventory";
import EditRecord from "./pages/clerks/editrecord";

function App() {
  return (
    <Routes>
      {/* Clerk Dashboard */}
      <Route path="/" element={<ClerkDashboard />} />
      <Route path="/clerk" element={<ClerkDashboard />} />
      <Route path="/clerk/dashboard" element={<ClerkDashboard />} />

      {/* Clerk Pages */}
      <Route path="/clerk/records" element={<Records />} />
      <Route path="/clerk/supplyreq" element={<SupplyReq />} />
      <Route path="/clerk/inventory" element={<Inventory />} />

      {/* Edit Record */}
      <Route path="/clerk/edit/:recordId" element={<EditRecord />} />
    </Routes>
  );
}

export default App;