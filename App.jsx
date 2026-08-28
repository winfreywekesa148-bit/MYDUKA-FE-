import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./src/pages/auth/login";
import RegisterMerchant from "./src/pages/auth/regMerchant";
import RegisterAdmin from "./src/pages/auth/regAdmin";
import RegisterClerk from "./src/pages/auth/regClerk";

import MerchantDashboard from "./src/pages/merchants/merchantdashboard";
import Stores from "./src/pages/merchants/stores";
import Admin from "./src/pages/merchants/admin";
import Payment from "./src/pages/merchants/payment";

import AdminDashboard from "./src/pages/storeadmin/clerk";
import SupplyReq from "./src/pages/storeadmin/supply_req";

import ClerkDashboard from "./src/pages/clerks/clerkdashboard";
import Records from "./src/pages/clerks/records";
import SupplyRequest from "./src/pages/clerks/supplyreq";
import Inventory from "./src/pages/clerks/inventory";
import EditRecord from "./src/pages/clerks/editrecord";

import GraphReport from "./src/pages/clerks/graphreport";
import BarChart from "./src/pages/charts/barchart";
import PieChart from "./src/pages/charts/piechart";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/login" element={<Login />} />

      <Route
        path="/register-merchant"
        element={<RegisterMerchant />}
      />

      <Route
        path="/register-admin"
        element={<RegisterAdmin />}
      />

      <Route
        path="/register-clerk"
        element={<RegisterClerk />}
      />

      {/* MERCHANT */}
      <Route
        path="/merchant"
        element={<MerchantDashboard />}
      />

      <Route
        path="/merchant/stores"
        element={<Stores />}
      />

      <Route
        path="/merchant/admins"
        element={<Admin />}
      />

      <Route
        path="/merchant/payments"
        element={<Payment />}
      />

      {/* STORE ADMIN */}
      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/clerks"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/supply-requests"
        element={<SupplyReq />}
      />

      {/* CLERK */}
      <Route
        path="/clerk"
        element={<ClerkDashboard />}
      />

      <Route
        path="/clerk/records"
        element={<Records />}
      />

      <Route
        path="/clerk/inventory"
        element={<Inventory />}
      />

      <Route
        path="/clerk/edit/:recordId"
        element={<EditRecord />}
      />

      <Route
        path="/clerk/supplyreq"
        element={<SupplyRequest />}
      />

      {/* REPORTS */}
      <Route
        path="/graph-report"
        element={<GraphReport />}
      />

      <Route
        path="/bar-chart"
        element={<BarChart />}
      />

      <Route
        path="/pie-chart"
        element={<PieChart />}
      />

      {/* FALLBACK */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;