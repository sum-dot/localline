import './App.css'
import { Routes, Route, useLocation } from "react-router";
import Header from "./components/Header";
import SubNav from "./components/SubNav";

import FindRoot from "./pages/FindRoot";
import BusSearch from "./pages/BusSearch";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Registration from "./pages/Register";
import PublicRoute from "./routes/PublicRoute";

function App() {
    const location = useLocation();
    const noNavPaths = ["/login", "/register", "/profile"];
    const hideNav = noNavPaths.includes(location.pathname);

    return (
        <div>
            {!hideNav && <Header />}
            {!hideNav && <SubNav />}

            <Routes>
                <Route path="/" element={<FindRoot />} />
                <Route path="/bus-search" element={<BusSearch />} />
                <Route path="/profile" element={<Profile />} />
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;