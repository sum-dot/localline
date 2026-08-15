import './BusSearch.css';

function BusSearch() {
    return (
      <div className="bus-search-box">
        <div className="search-box">
          <h2>Search a Bus</h2>
          <p>Find a bus by name and see its full route</p>
            <input
                type="text"
                placeholder="Type bus name - e.g. Hazi Transport"
            />
        </div>
      </div>
    );

}        