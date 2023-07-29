// import { type } from "os";
import "../css/main.css";
// import React, { FC } from "react";

export default function profilePic({ binary }) {
	console.log(binary);
	let s = []; //: Array<HTMLSpanElement>
	for (let bit of binary.split("")) {
		s.push(
			<span
				className={`logic-${bit} profile-pic-bits`}
				key={Math.random().toString()}
			></span>
		);
	}
	return (
		<div aria-label="user profile picture" className="profile-picture">
			<div className="profile-picture-top-left" aria-hidden>
				{s}
			</div>

			<div className="profile-picture-top-right" aria-hidden>
				{s}
			</div>
			<div className="profile-picture-bottom-left" aria-hidden>
				{s}
			</div>
			<div className="profile-picture-bottom-right" aria-hidden>
				{s}
			</div>
		</div>
	);
}
