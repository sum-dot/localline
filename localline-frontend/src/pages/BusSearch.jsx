import { useState, useEffect } from "react";
import "./BusSearch.css";
import BusSearchResult from "./BusSearchResult";

function BusSearch() {
  const [search, setSearch] = useState("");
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/buses")
      .then((res) => res.json())
      .then((data) => setBuses(data));
  }, []);

  let found = false;

  return (
    <>
      <div className="bus-search-box">
        <div className="search-box">
          <h2
            style={{
              color: "black",
              marginBottom: "1rem",
              fontWeight: "bold"
            }}
          >
            Search a Bus
          </h2>

          <p>Find a bus by name and see its full route</p>

          <input
            type="text"
            placeholder="Type bus name - e.g. Hazi Transport"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {search !== "" &&
        buses.map((bus) => {
          if (bus.name.toLowerCase().startsWith(search.toLowerCase())) {
            found = true;

            return <BusSearchResult key={bus._id} bus={bus} />;
          }

          return null;
        })}

      {search !== "" && found === false && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No bus found
        </p>
      )}
    </>
  );
}

export default BusSearch;