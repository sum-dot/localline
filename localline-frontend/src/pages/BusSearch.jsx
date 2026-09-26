import { useState, useEffect } from "react";
import "./BusSearch.css";
import BusSearchResult from "./BusSearchResult";

function BusSearch() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [buses, setBuses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    let url;

    if (submittedSearch === "") {
      url = `http://localhost:4000/buses/list?page=${page}`;
    } else {
      url = `http://localhost:4000/buses/search?query=${encodeURIComponent(
        submittedSearch,
      )}&field=name`;
    }

    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (submittedSearch === "") {
          setBuses(data.results || []);

          const pages = Math.ceil((data.total || 0) / 10);
          setTotalPages(pages || 1);
        } else {
          setBuses(Array.isArray(data) ? data : []);
          setTotalPages(1);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      });

    return () => controller.abort();
  }, [submittedSearch, page]);

  function handleSearchChange(e) {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      setPage(1);
      setSubmittedSearch("");
    }
  }

  function handleSearch() {
    setPage(1);
    setSubmittedSearch(search.trim());
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
            onChange={handleSearchChange}
          />

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {buses.map((bus) => (
        <BusSearchResult key={bus._id} bus={bus} />
      ))}

      {submittedSearch !== "" && buses.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          No bus found
        </p>
      )}

      {submittedSearch === "" && totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={page === pageNumber ? "active" : ""}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ),
          )}
        </div>
      )}
    </>
  );
}

export default BusSearch;
