import "../../style4.css";


function FindRoot() {
    return (
        <>
            <header>
                <div className="logo">
                    🚌DhaksBusFinder
                </div>

                <div className="headercontent">
                    <a href="#">Login</a>
                    <a href="#">Register</a>
                </div>
            </header>

            <div className="navigation">
                <a href="#">🔍FindRoute</a>
                <a href="#">🚌BusSearch</a>
            </div>

            <div className="findbox">

                <h3>Where are you going?</h3>

                <h5>Enter your stops to find the best bus route</h5>

                <div className="inputsource">

                    <input
                        type="text"
                        className="inputspace"
                        placeholder="🟢From: Enter your source"
                    />

                    <input
                        type="text"
                        className="inputspace"
                        placeholder="🔴To: Enter your Destination"
                    />

                </div>

                <div className="inputbox">

                    <button className="submitbtn">
                        Find Bus
                    </button>

                </div>

                <div className="popularroute">

                    <div className="title">
                        Popular Routes
                    </div>

                    <span>Mirpur 10 → Farmgate</span>
                    <span>Mirpur 10 → Motijheel</span>
                    <span>Gulistan → Abdullah</span>
                    <span>Sadarghat → Mirpur 10</span>

                </div>
    </div>
                <footer>
                    No ads · Community verified · 179 stops · 182 routes
                </footer>

        
        </>
    );
}

export default FindRoot;