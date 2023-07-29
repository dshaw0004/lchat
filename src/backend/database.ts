import supabase from "./index";

function getRandomId() {
	var pass = "";
	var str =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 1; i <= 8; i++) {
		var char = Math.floor(Math.random() * str.length + 1);

		pass += str.charAt(char);
	}

	return pass;
}

function generateProfilePicture() {
	const noOfBits = 64;
	let profilePic: string = "";
	for (let i = 0; i < noOfBits; ++i) {
		let bit = Math.round(Math.random()).toString();
		profilePic += bit;
	}
	console.log(profilePic);
	return profilePic;
}

////////////////////////////////////////////////////////////////////////////////

export async function addNewUserData(
	id: string,
	firstname: string,
	lastname: string,
	email: string,
	accountCreated: Date,
	authenticated: boolean,
	provider: string,
	middlename?: string
) {
	let chatId: string = "";
	let profilePicBinary: string = "";
	let newItemGenerated = {
		profilepic: false,
		chatid: false,
	};
	while (true) {
		if (newItemGenerated.chatid && newItemGenerated.profilepic) break;
		if (!newItemGenerated.chatid) {
			chatId = `chat-${firstname}-${getRandomId()}`;
		}
		if (!newItemGenerated.profilepic) {
			profilePicBinary = generateProfilePicture();
			console.log("profile pic =>", profilePicBinary);
		}

		const check: {
			data: Array<{
				chatId: string;

				profilepicturebits: string;
			}>;

			status: number;

			statusText: string;
			[key: string]: any;
		} = await supabase
			.from("userData")
			.select("chatId, profilepicturebits")
			.or(`chatId.eq.${chatId},profilepicturebits.eq.${profilePicBinary}`);
		console.log(check);

		if (!check.data.length) {
			break;
		}
		for (let i of check.data) {
			console.log(i);

			if (i.chatId !== chatId) {
				newItemGenerated.chatid = true;
			} else {
				newItemGenerated.chatid = false;
			}
			if (i.profilepicturebits !== profilePicBinary) {
				newItemGenerated.profilepic = true;
			} else {
				newItemGenerated.profilepic = false;
			}
			if (i.chatId !== chatId && i.profilepicturebits !== profilePicBinary)
				break;
		}
	}
	const res = await supabase.from("userData").insert({
		id: id,
		firstname: firstname,
		lastname: lastname,
		email: email,
		created_at: accountCreated,
		authenticated: authenticated,
		provider: provider,
		chatId: chatId,
		profilepicturebits: profilePicBinary,
		middlename: middlename || " ",
	});

	return [res, chatId, profilePicBinary];
}

////////////////////////////////////////////////////////////////////////////////

export async function isAccountAlreadyExist(emailId: string | undefined) {
	const { data, err } = await supabase
		.from("userData")
		.select("email")
		.eq("email", emailId);
	console.log(data);
	if (err) {
		console.log(error);
		return false;
	}
	if (data === null) return false;
	const check = data.find((d) => d.email === emailId);
	if (check !== undefined) return true;
	return false;
}

////////////////////////////////////////////////////////////////////////////////

export async function getUserData(id: string) {
	type resData =
		| {
				authenticated: Boolean;
				firstname: string;
				lastname: string;
				middlename: string | undefined;
				chatId: string;
				profilepicturebits: string;
		  }[]
		| undefined;
	const { data, error } = await supabase
		.from("userData")
		.select(
			"firstname, lastname, middlename, authenticated, chatId, profilepicturebits"
		)
		.eq("id", id);
	//
	console.log(data);
	if (error) {
		return error;
	}
	return data;
}
