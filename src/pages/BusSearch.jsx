import './BusSearch.css';

function BusSearch() {
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

        <div className="bus-search-box">
          <div className="search-box">
            <h2 style={{ color: 'black', marginBottom: '1rem', fontWeight: 'bold' }}>Search a Bus</h2>
            <p>Find a bus by name and see its full route</p>
            <input
              type="text"
              placeholder="Type bus name - e.g. Hazi Transport"
            />
          </div>
        </div>
      </>
    );

}        

export default BusSearch;