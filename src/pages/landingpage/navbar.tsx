import "./css/main.css";
import FloationgMenu from "./components/floatingMenu";

////////////////////////////////////////////////////////////////////////////////

export default function Navbar() {
	return (
		<nav className={`navbar`}>
			<div className={`nav`}>lchat</div>
			<div>
				<FloationgMenu />
			</div>
		</nav>
	);
}
