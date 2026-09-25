import { useState, useEffect } from "react";
import "./style2.css";
import busIcon from "../assets/bus-icon.png";

// each stop costs 5tk and a stop takes about 3 minutes to reach
const FARE_PER_STOP = 5;
const MINUTES_PER_STOP = 3;

function normalizeName(text) {
    return text.trim().toLowerCase();
}

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
                            <p className="step-title">Go to <strong>{props.goTo}</strong></p>
                            <p className="step-desc">Stand on the correct side of the road.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number active">2</div>
                        <div className="step-content">
                            <p className="step-title">Board <strong>{props.name}</strong></p>
                            <p className="step-desc">Ask: "{props.getOffAt} যাবে?"</p>
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
                            <p className="step-title">Get off at <strong>{props.getOffAt}</strong></p>
                            <p className="step-desc">Tell conductor "নামবো" as you approach.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function RouteFinder(props) {
    const state = useState(null);
    const openCard = state[0];
    const setOpenCard = state[1];

    const [allBuses, setAllBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // GET /buses is admin-only now, so this page uses the public
        // /buses/search endpoint instead, querying by the "from" stop.
        // It still returns full bus documents, so the existing from/to
        // stop-order check below still runs on the results.
        async function fetchBuses() {
            setLoading(true);
            setError("");
            if (!props.from) {
                setAllBuses([]);
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(
                    `http://localhost:4000/buses/search?query=${encodeURIComponent(props.from)}`
                );
                if (!res.ok) {
                    throw new Error("Bad response");
                }
                const data = await res.json();
                setAllBuses(data);
            } catch {
                setError("Failed to load buses");
            } finally {
                setLoading(false);
            }
        }
        fetchBuses();
    }, [props.from]);

    function handleToggle(clickedId) {
        if (openCard === clickedId) {
            setOpenCard(null);
        } else {
            setOpenCard(clickedId);
        }
    }

    // find every bus whose stop list has "from" before "to"
    const matchedBuses = [];
    for (const bus of allBuses) {
        const stops = bus.stops || [];
        let fromIndex = -1;
        let toIndex = -1;
        for (let i = 0; i < stops.length; i++) {
            if (normalizeName(stops[i]) === normalizeName(props.from)) {
                fromIndex = i;
            }
            if (normalizeName(stops[i]) === normalizeName(props.to)) {
                toIndex = i;
            }
        }
        if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
            const stopsCount = toIndex - fromIndex;
            matchedBuses.push({
                id: bus._id,
                displayName: bus.nameLocal && bus.nameLocal.trim() !== "" ? bus.nameLocal : bus.name,
                stopsCount: stopsCount,
                fare: stopsCount * FARE_PER_STOP,
                minutes: stopsCount * MINUTES_PER_STOP,
            });
        }
    }

    // use the quickest match for the top summary stats
    let summaryFare = "--";
    let summaryStops = "--";
    let summaryMinutes = "--";
    if (matchedBuses.length > 0) {
        let quickest = matchedBuses[0];
        for (const bus of matchedBuses) {
            if (bus.stopsCount < quickest.stopsCount) {
                quickest = bus;
            }
        }
        summaryFare = `৳${quickest.fare}`;
        summaryStops = quickest.stopsCount;
        summaryMinutes = quickest.minutes;
    }

    return (
        <div className="page">
            <div className="route-header">
                <h1>{props.from} <span className="arrow">→</span> {props.to}</h1>
                <span className="badge-light">{matchedBuses.length} direct</span>
            </div>
            <div className="stats-bar">
                <div className="stat">
                    <div className="stat-value">{summaryFare}</div>
                    <div className="stat-label">EST. FARE</div>
                </div>
                <div className="stat">
                    <div className="stat-value">{summaryStops}</div>
                    <div className="stat-label">STOPS</div>
                </div>
                <div className="stat">
                    <div className="stat-value">{summaryMinutes}</div>
                    <div className="stat-label">EST. MIN</div>
                </div>
            </div>
            <button className="filter-pill active">🚌 All Direct ({matchedBuses.length})</button>

            {loading && <p className="status-message">Loading buses...</p>}
            {error && <p className="status-message">{error}</p>}
            {!loading && !error && matchedBuses.length === 0 && (
                <div className="no-results">
                    <p>No direct bus found for this route.</p>
                 </div>
            )}

            {matchedBuses.map((bus) => (
                <BusCard
                    key={bus.id}
                    id={bus.id}
                    name={bus.displayName}
                    time={`${bus.minutes} min`}
                    fare={`৳${bus.fare}`}
                    stops={bus.stopsCount}
                    goTo={props.from}
                    getOffAt={props.to}
                    expanded={openCard === bus.id}
                    onToggle={handleToggle}
                />
            ))}

            <footer>© 2026 Route Finder · 179 stops · 182 routes</footer>
        </div>
    );
}