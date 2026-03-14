import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Today from "./Today";
import Week from "./Week";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/today" element={<Today />} />
      <Route path="/week" element={<Week />} />
    </Routes>
  );
}

export default App;