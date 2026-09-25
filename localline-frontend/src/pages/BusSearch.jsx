import { useState, useEffect } from "react";
import "./BusSearch.css";
import BusSearchResult from "./BusSearchResult";

function BusSearch() {
  const [search, setSearch] = useState("");
  const [buses, setBuses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (search.trim() === "") {
      setBuses([]);
      setTotal(0);
      return;
    }

    const controller = new AbortController();

    fetch(
      `http://localhost:4000/buses/search?query=${encodeURIComponent(search)}`,
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) => {
        setBuses(data.results || []);
        setTotal(data.total || 0);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [search]);

  return (
    <>
      <div className="bus-search-box">
        <div className="search-box">
          <h2
            style={{ color: "black", marginBottom: "1rem", fontWeight: "bold" }}
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

      {search !== "" && total > buses.length && (
        <p style={{ textAlign: "center", color: "#666" }}>
          Showing {buses.length} of {total} matches — try a more specific search
        </p>
      )}

      {search !== "" &&
        buses.map((bus) => <BusSearchResult key={bus._id} bus={bus} />)}

      {search !== "" && buses.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No bus found</p>
      )}
    </>
  );
}

export default BusSearch;
