import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/login";
import HomePage from "./pages/homepage";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { newUser, signInWithPassword } from "./backend/auth";
import { addNewUserData, getUserData } from "./backend/database";
import { SignUp } from "./pages/auth/signup";

import React, { Suspense } from "react";
import { getFromLocalStorage } from "./hooks/useLocalstorage";
const LandingPage = React.lazy(() => import("./pages/landingpage/index"));

function App() {
	const loggedIn = getFromLocalStorage("loggedIn");

	return (
		<Routes>
			<Route path="/homepage" element={<HomePage />} />
			<Route path="/login" index element={<Login />} />
			<Route
				path="/"
				index
				element={
					<Suspense
						fallback={
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									height: "100vh",
								}}
							>
								<CircularProgress />
							</Box>
						}
					>
						{loggedIn != undefined || loggedIn ? (
							<LandingPage />
						) : (
							<Navigate to="/homepage" replace />
						)}
					</Suspense>
				}
			/>
			<Route
				path="/signup"
				index
				element={<SignUp signupFunc={newUser} addToDataBase={addNewUserData} />}
			/>
			<Route
				path="*"
				element={
					<strong>
						404
						<br />
						Page Not Found
					</strong>
				}
			/>
		</Routes>
	);
}

export default App;
