import React, { useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
export default function NavBar() {
	const [loggedin, setLoggedin] = useState(false);
	return (
		<nav className={firstNavBar}>
			<strong className="appTitle">lChat</strong>
			{loggedin ? (
				<></>
			) : (
				<ul className={authenticationLinks}>
					<li>
						<NavLink to="/login">log in</NavLink>
					</li>
					<li>
						<NavLink to="/signup">sign up</NavLink>
					</li>
				</ul>
			)}
		</nav>
	);
}
