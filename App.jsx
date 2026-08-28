import React from "react";
import { Routes, Route } from "react-router-dom";

import MerchantDashboard from "./src/pages/merchants/merchantdashboard";
import MerchantAdmin from "./src/pages/merchants/admin";
import MerchantStores from "./src/pages/merchants/stores";
import MerchantPayment from "./src/pages/merchants/payment";

import ClerkDashboard from "./src/pages/clerks/clerkdashboard";
import Records from "./src/pages/clerks/records";
import SupplyReq from "./src/pages/clerks/supplyreq";
import Inventory from "./src/pages/clerks/inventory";
import EditRecord from "./src/pages/clerks/editrecord";

function App() {
  return (
    <Routes>
      {/* Merchant */}
      <Route
        path="/merchant/dashboard"
        element={<MerchantDashboard />}
      />

      <Route
        path="/merchant/admin"
        element={<MerchantAdmin />}
      />

      <Route
        path="/merchant/stores"
        element={<MerchantStores />}
      />

      <Route
        path="/merchant/payments"
        element={<MerchantPayment />}
      />

      {/* Clerk Dashboard */}
      <Route
        path="/clerk"
        element={<ClerkDashboard />}
      />

      <Route
        path="/clerk/dashboard"
        element={<ClerkDashboard />}
      />

      {/* Clerk Pages */}
      <Route
        path="/clerk/records"
        element={<Records />}
      />

      <Route
        path="/clerk/supplyreq"
        element={<SupplyReq />}
      />

      <Route
        path="/clerk/inventory"
        element={<Inventory />}
      />

      {/* Edit Record */}
      <Route
        path="/clerk/edit/:recordId"
        element={<EditRecord />}
      />
    </Routes>
  );
}

export default App;
