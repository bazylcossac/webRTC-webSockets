// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";

import RoomPage from "./pages/RoomPage";
import MainPage from "./pages/mainPage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/room/:roomId" element={<RoomPage />}></Route>
    </Routes>
  );
}
