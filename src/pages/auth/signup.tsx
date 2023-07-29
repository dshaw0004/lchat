import { FormEvent, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { resType } from "./typex";
import "./style.css";
import { Button, TextField, Typography } from "@mui/material";
import { getUserData, isAccountAlreadyExist } from "../../backend/database";
import { addToLocalStorage } from "../../hooks/useLocalstorage";

export const SignUp = ({ signupFunc, addToDataBase }) => {
	const emailEle = useRef<HTMLInputElement>();
	const passwordEle = useRef<HTMLInputElement>();
	const firstnameEle = useRef<HTMLInputElement>();
	const middlenameEle = useRef<HTMLInputElement>();
	const lastnameEle = useRef<HTMLInputElement>();
	const [btnDisabled, setBtnDisabled] = useState(false);
	const navigateTo = useNavigate();

	async function handleSignUp(event: FormEvent) {
		event.preventDefault();
		setBtnDisabled(true);
		const accountAlreadyExist = await isAccountAlreadyExist(
			emailEle.current?.value
		);
		if (accountAlreadyExist) {
			//do something
			return;
		}
		const firstname = firstnameEle.current?.value;
		const middlename = middlenameEle.current?.value;
		const lastname = lastnameEle.current?.value;
		const res: resType = await signupFunc(
			emailEle.current?.value,
			passwordEle.current?.value
		);
		console.log(res);
		const [responseFromDatabase, chatId, profilePicBinary] =
			await addToDataBase(
				res.user.id,
				firstname,
				lastname,
				res.user.email,
				new Date(res.user.created_at),
				res.user.aud === "authenticated" ? true : false,
				res.user.app_metadata.provider,
				middlename
			);
		console.log(profilePicBinary);
		addToLocalStorage(res.user.id, "user_id");
		addToLocalStorage(true, "loggedIn");
		setBtnDisabled(false);
		return navigateTo("/", {
			state: {
				userData: {
					authenticated: false,
					firstname: firstname,
					lastname: lastname,
					middlename: middlename,
					chatId: chatId,
					profilepicturebits: profilePicBinary,
				},
			},
		});
	}

	return (
		<>
			<div className={"signupPage"}>
				<Typography align="center" gutterBottom={true} variant="h2">
					Sign Up
				</Typography>
				<form onSubmit={handleSignUp} className={"signupForm"}>
					<TextField
						key="signup-email"
						label="Email address"
						variant="outlined"
						required
						type="email"
						inputRef={emailEle}
					/>
					<TextField
						key="signup-firstname"
						label="First Name"
						variant="outlined"
						required
						inputRef={firstnameEle}
					/>
					<TextField
						key="signup-middlename"
						label="Midlle Name"
						variant="outlined"
						inputRef={middlenameEle}
					/>
					<TextField
						key="signup-lastname"
						label="Last Name"
						variant="outlined"
						required
						inputRef={lastnameEle}
					/>
					<TextField
						key="signup-password"
						required
						type="password"
						inputRef={passwordEle}
						variant="outlined"
						label="Password"
					/>
					<Button type="submit" variant="outlined" disabled={btnDisabled}>
						sign up
					</Button>
				</form>
				<Typography>
					already have an account <NavLink to="/login">login</NavLink>
				</Typography>
			</div>
		</>
	);
};
