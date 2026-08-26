import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MerchantDashboard from "./src/pages/merchants/merchantdashboard";
import MerchantAdmin from "./src/pages/merchants/admin";
import MerchantStores from "./src/pages/merchants/stores";
import MerchantPayment from "./src/pages/merchants/payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/merchant/dashboard" replace />} />

      <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
      <Route path="/merchant/admin" element={<MerchantAdmin />} />
      <Route path="/merchant/stores" element={<MerchantStores />} />
      <Route path="/merchant/payments" element={<MerchantPayment />} />
    </Routes>
  );
}

export default App;
EOF