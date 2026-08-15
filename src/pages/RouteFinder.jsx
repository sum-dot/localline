import { useState } from "react";
import "./style2.css";
import busIcon from "../assets/bus-icon.png";

function BusCard(props) {
    
    const isThisCardOpen = props.expanded;

    function handleHeaderClick() {
        props.onToggle(props.id);
    }

    let arrowSymbol = "▼";
    if (isThisCardOpen === true) {
        arrowSymbol = "▲";
    }

    return (
        <div className="bus-card">
            <div className="bus-card-header" onClick={handleHeaderClick}>
                <img src={busIcon} alt="" className="bus-icon" />
                <h2>{props.name}</h2>
                <span className="dropdown-arrow">{arrowSymbol}</span>
            </div>

            <div className="tags">
                <span className="tag tag-time">{props.time}</span>
                <span className="tag tag-fare">{props.fare}</span>
            </div>
            <div className="tags">
                <span className="tag tag-stops">{props.stops} stops</span>
            </div>

            {isThisCardOpen === true && (
                <div className="steps">
                    <div className="step">
                        <div className="step-number active">1</div>
                        <div className="step-content">
                            <p className="step-title">Go to <strong>Mohammadpur</strong></p>
                            <p className="step-desc">Stand on the correct side of the road.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number active">2</div>
                        <div className="step-content">
                            <p className="step-title">Board <strong>{props.name}</strong></p>
                            <p className="step-desc">Ask: "Shahbag যাবে?"</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number blue">3</div>
                        <div className="step-content">
                            <p className="step-title">Ride <strong>{props.stops} stops</strong> (~{props.time})</p>
                            <p className="step-desc">Pay {props.fare} to conductor.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number gray">4</div>
                        <div className="step-content">
                            <p className="step-title">Get off at <strong>Shahbag</strong></p>
                            <p className="step-desc">Tell conductor "নামবো" as you approach.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function RouteFinder() {
    const state = useState(null);
    const openCard = state[0];
    const setOpenCard = state[1];

    function handleToggle(clickedId) {
        if (openCard === clickedId) {
            setOpenCard(null);
        } else {
            setOpenCard(clickedId);
        }
    }

    const brtcIsOpen = openCard === "brtc";
    const meshkatIsOpen = openCard === "meshkat";

    return (
        <div className="page">
            <div className="route-header">
                <h1>Mohammadpur <span className="arrow">→</span> Shahbag</h1>
                <span className="badge-light">18 direct</span>
            </div>

            <div className="stats-bar">
                <div className="stat">
                    <div className="stat-value">৳30-50</div>
                    <div className="stat-label">EST. FARE</div>
                </div>
                <div className="stat">
                    <div className="stat-value">5</div>
                    <div className="stat-label">STOPS</div>
                </div>
                <div className="stat">
                    <div className="stat-value">25</div>
                    <div className="stat-label">EST. MIN</div>
                </div>
            </div>

            <button className="filter-pill active">🚌 All Direct (2)</button>

            <BusCard
                id="brtc"
                name="BRTC Bus"
                time="25–35 min"
                fare="৳30-50"
                stops={8}
                expanded={brtcIsOpen}
                onToggle={handleToggle}
            />

            <BusCard
                id="meshkat"
                name="Meshkat Bus"
                time="15–25 min"
                fare="৳20-30"
                stops={5}
                expanded={meshkatIsOpen}
                onToggle={handleToggle}
            />

            <footer>© 2026 Route Finder · 179 stops · 182 routes</footer>
        </div>
    );
}