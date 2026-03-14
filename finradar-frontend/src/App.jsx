import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Today from "./Today";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/today" element={<Today />} />
    </Routes>
  );
}

export default App;