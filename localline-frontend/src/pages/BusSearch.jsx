import { useState, useEffect } from "react";
import "./BusSearch.css";
import BusSearchResult from "./BusSearchResult";

function BusSearch() {
  // "search" is just what's in the input box; "submittedSearch" is what
  // was actually confirmed with Enter, and is what triggers the fetch
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [buses, setBuses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (submittedSearch.trim() === "") {
      setBuses([]);
      setTotal(0);
      return;
    }

    const controller = new AbortController();

    fetch(
      `http://localhost:4000/buses/search?query=${encodeURIComponent(submittedSearch)}&field=name`,
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
  }, [submittedSearch]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSubmittedSearch(search);
    }
  }

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
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

<<<<<<< HEAD
      {submittedSearch !== "" &&
=======
      {search !== "" && total > buses.length && (
        <p style={{ textAlign: "center", color: "#666" }}>
          Showing {buses.length} of {total} matches — try a more specific search
        </p>
      )}

      {search !== "" &&
>>>>>>> 24d79572a96924618ef14341132095ca42def67e
        buses.map((bus) => <BusSearchResult key={bus._id} bus={bus} />)}

      {submittedSearch !== "" && buses.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No bus found</p>
      )}
    </>
  );
}

export default BusSearch;