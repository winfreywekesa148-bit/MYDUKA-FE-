import { Routes, Route } from "react-router-dom";
import Clerk from "./pages/Clerk";

function App() {
  return (
    <Routes>
      <Route path="/clerk" element={<Clerk />} />
    </Routes>
  );
}

export default App;