import { useEffect } from "react";
import { connectoToWs } from "./utils/connectToWs";

function App() {
  useEffect(() => {
    connectoToWs();
  }, []);

  return (
    <>
      <p>main page</p>
    </>
  );
}

export default App;
