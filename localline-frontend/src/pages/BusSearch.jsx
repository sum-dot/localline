
import { useState } from "react";
import "./BusSearch.css";
import BusSearchResult from "./BusSearchResult";

function BusSearch() {
  const [search, setSearch] = useState("");
  const [buses, setBuses] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (search.trim() === "") {
      setBuses([]);
      return;
    }

    const controller = new AbortController();

    fetch(
      `http://localhost:4000/buses/search?query=${encodeURIComponent(search)}`,
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) => setBuses(data))
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
            onKeyDown={searchBus}
          />
        </div>
      </div>

      {search !== "" &&
        buses.map((bus) => <BusSearchResult key={bus._id} bus={bus} />)}

      {search !== "" && buses.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No bus found</p>
      )}

      {buses.map((bus) => (
        <BusSearchResult key={bus._id} bus={bus} />
      ))}
    </>
  );
}

export default BusSearch;
