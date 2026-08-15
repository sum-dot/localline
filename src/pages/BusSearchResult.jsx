import "./BusSearchResult.css";

function BusSearchResult() {
  return (
    <>
      <header>
        <div className="logo">🚌LocalLine</div>

        <div className="headercontent">
          <a href="#">Login</a>
          <a href="#">Register</a>
        </div>
      </header>

      <div className="navigation">
        <a href="#">🔍FindRoute</a>
        <a href="#">🚌BusSearch</a>
      </div>

      <div className="bus-search-page">
        <div className="search-card">
          <h2>Search a Bus</h2>
          <p>Find a bus by name and see its full route</p>
          <input type="text" placeholder="e.g. 13 No. Bus Route Dhaka" />
        </div>

        <div className="result-card">
          <div className="result-header">
            <span className="bus-icon">🚌</span>
            <div>
              <h3>13 No. Bus Route Dhaka</h3>
              <p>১৩নং বাস</p>
              <span className="tag">Regular</span>
            </div>
          </div>

          <div className="route-summary">
            <strong>Mohammadpur → Azimpur</strong>
            <span>10 stops</span>
          </div>

          <div className="stops-row">
            <div className="stop active">Mohammadpur</div>
            <div className="stop">Shankar</div>
            <div className="stop">Star Kabab</div>
            <div className="stop">Dhanmondi 15</div>
            <div className="stop">Jigatola</div>
            <div className="stop">City College</div>
            <div className="stop">Science Lab</div>
            <div className="stop">New Market</div>
            <div className="stop">Nilkhet</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusSearchResult;
