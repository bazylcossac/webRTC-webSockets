import { useEffect } from "react";
import { connectoToWs } from "./utils/connectToWs";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    connectoToWs();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
