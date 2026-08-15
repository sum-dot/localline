import { BrowserRouter, Routes, Route } from "react-router-dom";
//import FindRoot from "./pages/FindRoot";
//import Registration from "./pages/Register";
import BusSearch from "./pages/BusSearch";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bus-search" element={<BusSearch />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
