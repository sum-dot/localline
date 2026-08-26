import "../../style4.css";
import { useState } from "react";
import RouteFinder from "./RouteFinder";

function FindRoot() {
    const [showRouteFinder, setShowRouteFinder] = useState(false);

    const handleFindBus = () => {
        setShowRouteFinder(true);
    };

    return (
        <>
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

                    <button className="submitbtn" onClick={handleFindBus}>
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

            {showRouteFinder && <RouteFinder />}
        </>
    );
}

export default FindRoot;