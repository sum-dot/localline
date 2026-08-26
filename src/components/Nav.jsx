import React from "react";

import {NavLink, Link} from "react-router";

function Nav() {
    return (
      <nav>
        <NavLink to="/">main</NavLink>
        <NavLink to="/bussearch">BusSearch</NavLink>
      </nav>
    );
}

export default Nav;