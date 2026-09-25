import "../../style4.css";
import { useState, useEffect } from "react";
import RouteFinder from "./RouteFinder";
import { useAuthContext } from "../context/AuthContext"; // Adjust path if needed

function FindRoot() {
    const [showRouteFinder, setShowRouteFinder] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);

    const { authUser } = useAuthContext(); // Get login context/user info

    // Load saved recent searches from localStorage when component mounts or user state changes
    useEffect(() => {
        if (authUser) {
            const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
            setRecentSearches(savedSearches);
        }
    }, [authUser]);

    const handleFindBus = () => {
        if (!from || !to) {
            return;
        }

        // Save recent search if user is logged in
        if (authUser) {
            const newSearch = { from, to };
            
            // Avoid duplicate consecutive searches and limit list length (e.g., max 5)
            const filteredSearches = recentSearches.filter(
                (item) => !(item.from.toLowerCase() === from.toLowerCase() && item.to.toLowerCase() === to.toLowerCase())
            );

            const updatedSearches = [newSearch, ...filteredSearches].slice(0, 5);
            setRecentSearches(updatedSearches);
            localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        }

        setShowRouteFinder(true);
    };

    return (
        <>
            <div className="findbox">

                <h3>Where are you going?</h3> 

                <h5>Enter your stops to find the best bus route</h5>

                <div className="inputsource">

                    <input
                        type="text"
                        className="inputspace"
                        placeholder="🟢From: Enter your source"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />

                    <input
                        type="text"
                        className="inputspace"
                        placeholder="🔴To: Enter your Destination"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />

                </div>

                <div className="inputbox">

                    <button className="submitbtn" onClick={handleFindBus}>
                        Find Bus
                    </button>

                </div>

                <div className="popularroute">

                    <div className="title">
                        Popular Routes
                    </div>

                    <span onClick={() => {
                            setFrom("Mirpur 10");
                            setTo("Farmgate");
                        }}>
                        Mirpur 10 → Farmgate</span>
                    <span onClick={() => {  
                            setFrom("Mirpur 10");
                            setTo("Motijheel");
                        }}>
                        Mirpur 10 → Motijheel</span>
                    <span onClick={() => {
                            setFrom("Sayedabad"); 
                            setTo("Mohakhali");
                        }}>
                        Sayedabad → Mohakhali</span>
                    <span onClick={() => {
                            setFrom("Sadarghat");
                            setTo("Mirpur 10");
                        }}> 
                        Sadarghat → Mirpur 10</span>

                </div>

                {/* Show Recent Searches only when user is logged in and has past searches */}
                {authUser && recentSearches.length > 0 && (
                    <div className="popularroute" style={{ marginTop: "15px" }}>
                        <div className="title">
                            Recent Searches
                        </div>
                        {recentSearches.map((route, index) => (
                            <span 
                                key={index} 
                                onClick={() => {
                                    setFrom(route.from);
                                    setTo(route.to);
                                }}
                            >
                                {route.from} → {route.to}
                            </span>
                        ))}
                    </div>
                )}
            </div>

           {showRouteFinder && <RouteFinder from={from} to={to} />}
        </>
    );
}

export default FindRoot;