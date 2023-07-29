import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatArea from "./chatArea";
import "./css/main.css";
import Navbar from "./navbar";
import { getFromLocalStorage } from "../../hooks/useLocalstorage";
import { getUserData } from "../../backend/database";
import LeftPart from "./leftPart";

export const getDataOfUser = async () => {
	const loggedIn = getFromLocalStorage("loggedIn");

	try {
		const data = useLocation()?.state?.userData;
		return data;
	} catch (err) {
		console.info(err);
		if (loggedIn !== undefined || loggedIn) {
			const user_id = getFromLocalStorage("user_id") || " ";
			if (user_id === " ") {
				throw "no user id in local storage";
				return;
			}
			const data = await getUserData(user_id);
			console.log(data);
			return data;
		}
	}
};

////////////////////////////////////////////////////////////////////////////////

export default function index() {
	const [roomId, setRoom] = useState<string>("");
	useEffect(() => {
		window.navigator.geolocation.getCurrentPosition((position) => {
			// console.log(position);
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			const int = Math.trunc;
			const values = {
				degLat: int(latitude),
				degLong: int(longitude),
				minLat: int((latitude - int(latitude)) * 60),
				minLong: int((longitude - int(longitude)) * 60),
			};
			const roomID = `${values.degLat}d${values.minLat}m&&${values.degLong}d${values.minLong}m`;
			setRoom(roomID);
		});
	}, []);
	return (
		<main className={`chatPage`}>
			<LeftPart roomid={roomId} />
			<section className={`chatsSection`}>
				<ChatArea roomId={roomId} />
			</section>
		</main>
	);
}
