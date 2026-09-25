import { useState, useEffect } from "react";
import "./BusSearch.css";
import BusSearchResult from "./BusSearchResult";

function BusSearch() {
  // "search" is just what's in the input box; "submittedSearch" is what
  // was actually confirmed with Enter, and is what triggers the fetch
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    if (submittedSearch.trim() === "") {
      setBuses([]);
      return;
    }

    const controller = new AbortController();

    fetch(
      `http://localhost:4000/buses/search?query=${encodeURIComponent(submittedSearch)}&field=name`,
      { signal: controller.signal },
    )
      .then((res) => res.json())
      // /buses/search now returns { results, total } instead of a plain
      // array, since results are paginated 10 at a time
      .then((data) => setBuses(data.results))
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
            style={{
              color: "black",
              marginBottom: "1rem",
              fontWeight: "bold",
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
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {submittedSearch !== "" &&
        buses.map((bus) => <BusSearchResult key={bus._id} bus={bus} />)}

      {submittedSearch !== "" && buses.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No bus found</p>
      )}
    </>
  );
}

export default BusSearch;