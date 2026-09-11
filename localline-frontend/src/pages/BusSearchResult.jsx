import "./BusSearchResult.css";

function BusSearchResult({ bus }) {
  return (
    <div className="bus-search-page">
      <div className="result-card">
        <div className="result-header">
          <span className="bus-icon">🚌</span>

          <div>
            <h3>{bus.name}</h3>
            <span className="tag">{bus.serviceType}</span>
          </div>
        </div>

        <div className="route-summary">
          <strong>
            {bus.from} → {bus.to}
          </strong>

          <span>{bus.stops.length} stops</span>
        </div>

        <div className="stops-row">
          {bus.stops.map((stop) => (
            <div className="stop">
              {stop}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusSearchResult;