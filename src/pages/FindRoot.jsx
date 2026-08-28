import "../../style4.css";
import { useState } from "react";
import RouteFinder from "./RouteFinder";

function FindRoot() {
    const [showRouteFinder, setShowRouteFinder] = useState(false);
        const [from, setFrom] = useState("");
        const[to,setTo]=useState("");

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
                        value={from}
                         onChange={(e) => setFrom(e.target.value)}
                    />

                    <input
                        type="text"
                        className="inputspace"
                        placeholder="🔴To: Enter your Destination"
                         value={to}
                         onChange={(e) => setTo(e.target.value)}
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

                    <span onClick={() => {
                            setFrom("Mirpur 10");
                            setTo("Farmgate");
                        }}>
                        Mirpur 10 → Farmgate</span>
                    <span onClick={()=>{  setFrom("Mirpur 10");
                            setTo("Motijheel")}}>
                                Mirpur 10 → Motijheel</span>
                    <span onClick={()=>{setFrom(Gulistan)
                        setTo(Abdullah)}}>
                            Gulistan → Abdullah</span>
                    <span   onClick={() => {
                            setFrom("Sadarghat");
                            setTo("Mirpur 10");
                        }}> Sadarghat → Mirpur 10</span>

                </div>
            </div>

            {showRouteFinder && <RouteFinder />}
        </>
    );
}

export default FindRoot;