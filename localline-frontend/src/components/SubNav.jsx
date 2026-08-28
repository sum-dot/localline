import { Link } from "react-router";

function SubNav() {
    return (
        <div className="navigation">
            <Link to="/">🔍FindRoute</Link>
            <Link to="/bus-search">🚌BusSearch</Link>
        </div>
    );
}

export default SubNav;