import { BrowserRouter, Routes, Route } from "react-router-dom";
import Receptionist from "./Receptionist";
import WaitingRoom from "./WaitingRoom";
import History from "./History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Receptionist />} />
        <Route path="/waiting" element={<WaitingRoom />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;