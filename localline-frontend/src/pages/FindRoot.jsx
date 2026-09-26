import "../../style4.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import RouteFinder from "./RouteFinder";
import { useAuthContext } from "../context/AuthContext";

const MAX_RECENT = 4;

function FindRoot() {
  const { isLoggedIn, user } = useAuthContext();
  const location = useLocation();
  const [showRouteFinder, setShowRouteFinder] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      setRecentSearches([]);
      return;
    }
    const stored = localStorage.getItem(`recentSearches_${user.id}`);
    setRecentSearches(stored ? JSON.parse(stored) : []);
  }, [isLoggedIn, user]);

  const saveRecentSearch = (searchFrom, searchTo) => {
    if (!isLoggedIn) {
      return;
    }
    const withoutDupe = recentSearches.filter(
      (r) => !(r.from === searchFrom && r.to === searchTo),
    );
    const updated = [{ from: searchFrom, to: searchTo }, ...withoutDupe].slice(
      0,
      MAX_RECENT,
    );
    setRecentSearches(updated);
    localStorage.setItem(`recentSearches_${user.id}`, JSON.stringify(updated));
  };

  // If we arrived here from a favorite click (or anything that passes
  // from/to in navigation state), prefill and auto-run the search.
  useEffect(() => {
    if (location.state?.from && location.state?.to) {
      setFrom(location.state.from);
      setTo(location.state.to);
      setShowRouteFinder(true);
    }
  }, [location.state]);

  const handleFindBus = () => {
    if (!from || !to) {
      return;
    }
    saveRecentSearch(from, to);
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
          <div className="title">Popular Routes</div>

          <span
            onClick={() => {
              setFrom("Mirpur 10");
              setTo("Farmgate");
            }}
          >
            Mirpur 10 → Farmgate
          </span>
          <span
            onClick={() => {
              setFrom("Mirpur 10");
              setTo("Motijheel");
            }}
          >
            Mirpur 10 → Motijheel
          </span>
          <span
            onClick={() => {
              setFrom("Sayedabad");
              setTo("Mohakhali");
            }}
          >
            Sayedabad → Mohakhali
          </span>
          <span
            onClick={() => {
              setFrom("Sadarghat");
              setTo("Mirpur 10");
            }}
          >
            {" "}
            Sadarghat → Mirpur 10
          </span>
        </div>

        {isLoggedIn && recentSearches.length > 0 && (
          <div className="popularroute">
            <div className="title">Recent Searches</div>

            {recentSearches.map((r, i) => (
              <span
                key={i}
                onClick={() => {
                  setFrom(r.from);
                  setTo(r.to);
                }}
              >
                {r.from} → {r.to}
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
