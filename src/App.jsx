import './App.css'
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindRoot from "./pages/FindRoot";
import RouteFinder from "./pages/RouteFinder";

//import Registration from "./pages/Register";

//import Login from "./pages/Login";


import BusSearch from "./pages/BusSearch";
import BusSearchResult from "./pages/BusSearchResult";
//import Profile from "./pages/Profile";

function App() {
    return (
      <div>
        {/* <Login /> */}
         <FindRoot />
         <RouteFinder /> 
        {/* <BusSearch />   */}
         {/* <BusSearchResult />  */}
        {/*<Registration />*/}

        {/* <Profile />*/}
      </div>
    );

}

export default App;