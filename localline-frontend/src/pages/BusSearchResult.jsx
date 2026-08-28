import "./BusSearchResult.css";

function BusSearchResult() {
  return (
      <div className="bus-search-page">
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
  );
}

export default BusSearchResult;
