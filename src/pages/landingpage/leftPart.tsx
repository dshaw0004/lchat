import { useEffect, useState } from "react";
import { getDataOfUser } from ".";
import Navbar from "./navbar";
import ProfilePic from "./components/profilePic";

export default function LeftPart(props: { roomid: string }) {
	type userDataType = {
		dataFetched: Boolean;
		data?: Array<object>;
	};
	const [user, setUser] = useState([{}]);
	const [userData, setUserData] = useState<userDataType>({
		dataFetched: false,
		data: [],
	});
	useEffect(() => {
		async function getUser() {
			const userdata = await getDataOfUser();
			console.log(userdata[0]);
			// setUser(userdata[0]);
			setUserData({
				dataFetched: true,
				data: userdata[0],
			});
		}
		getUser();
	}, []);
	return (
		<section aria-label="information about user" className="additional-info">
			<Navbar />
			<div className="userInfo">
				<div className="profilePic-container">
					{userData.dataFetched && (
						<ProfilePic binary={userData.data?.profilepicturebits} />
					)}
					{/* {typeof user.profilepicturebits} */}
				</div>
				<h1 aria-label="username" className="username">
					{userData.data?.firstname}
				</h1>
			</div>

			<span className="roomid">
				<strong>
					your room id :-
					{" " + props.roomid}
				</strong>
			</span>
		</section>
	);
}
