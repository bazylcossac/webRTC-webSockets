import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { wssConnection } from "./utils/wssConnection";

function App() {
  useEffect(() => {
    wssConnection();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
