import { Button, Typography } from "@mui/material";
import "./style.css";
import { NavLink } from "react-router-dom";
import NavBar from "./navbar";
export default function HomePage() {
	return (
		<div className={homepage}>
			<NavBar />
			<main className={maincontent}>
				<Typography variant="h1">lchat</Typography>
				<Button variant="outlined">
					<NavLink to="/login">Log in</NavLink>
				</Button>
			</main>
		</div>
	);
}
