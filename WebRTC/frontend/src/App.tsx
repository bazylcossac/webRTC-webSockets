import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [messages, setMessages] = useState([]);
  const socket = io();

  useEffect(() => {}, []);
  return (
    <>
      <p>home page</p>
    </>
  );
}

export default App;
