import {
	Box,
	Button,
	Fade,
	Popper,
	TextField,
	Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";

import "./style.css";

import { signInWithPassword } from "../../backend/auth";
import { isAccountAlreadyExist, getUserData } from "../../backend/database";
import { addToLocalStorage } from "../../hooks/useLocalstorage";
import { resType } from "./typex";

export const Login = () => {
	const navigateTo = useNavigate();

	const [loginErrorText, setLoginErrorText] =
		useState<string>("email not found");
	const [loginErrorPopoverState, setLoginErrorPopoverState] =
		useState<boolean>(false);
	const emailEle = useRef<HTMLInputElement>();
	const [btnDisabled, setBtnDisabled] = useState(false);
	const passwordEle = useRef<HTMLInputElement>();
	async function handleLogin(event: { preventDefault: () => void }) {
		event.preventDefault();
		setBtnDisabled(true);

		const accountAlreadyExist = await isAccountAlreadyExist(
			emailEle.current?.value
		);
		if (!accountAlreadyExist) {
			setLoginErrorPopoverState(true);
			setTimeout(() => setLoginErrorPopoverState(false), 4000);
			setBtnDisabled(false);

			return;
		}
		const res: resType = await signInWithPassword(
			emailEle.current?.value,
			passwordEle.current?.value
		);
		console.log(res);
		// setLoginErrorText("password does not match");
		// setLoginErrorPopoverState(true);
		// setTimeout(() => setLoginErrorPopoverState(false), 4000);

		const fetchFromDB = await getUserData(res.user.id);

		addToLocalStorage(res.user.id, "user_id");
		addToLocalStorage(true, "loggedIn");
		setBtnDisabled(false);
		return navigateTo("/", {
			state: {
				userData: fetchFromDB,
			},
		});
	}
	return (
		<>
			<div className={"signupPage"}>
				<Popper
					open={loginErrorPopoverState}
					sx={{
						p: 1,
						right: 0,
					}}
					transition
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={500}>
							<Box
								sx={{
									border: 1,
									p: 1,
									bgcolor: "red",
									borderRadius: "1ch",
									fontSize: "1.25rem",
									display: "flex",
									maxWidth: "750px",
									marginInline: "auto",
								}}
							>
								<RiErrorWarningLine /> &ensp; {loginErrorText}
							</Box>
						</Fade>
					)}
				</Popper>
				<Typography align="center" gutterBottom={true} variant="h2">
					Log In
				</Typography>
				<form onSubmit={handleLogin} className={"signupForm loginForm"}>
					<TextField
						required
						label="email"
						type="email"
						variant="outlined"
						inputRef={emailEle}
						sx={{
							borderRadius: "10ch",
						}}
					/>
					<TextField
						required
						type="password"
						label="password"
						variant="outlined"
						inputRef={passwordEle}
					/>

					<Button variant="outlined" type="submit" disabled={btnDisabled}>
						log in
					</Button>
				</form>
				<p>
					Don't have an account <NavLink to="/signup">create new</NavLink>
				</p>
			</div>
		</>
	);
};
