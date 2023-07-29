import supabase from "./index";

export const newUser = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
	});
	if (error) {
		return error;
	}
	return data;
};
export const signInWithPassword = async (email: string, password: string) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			return error;
		}
		return data;
	} catch (error) {
		return error;
	}
};
export const signInWithGithub = async (email: string, password: string) => {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
		});
		if (error) {
			return error;
		}
		return data;
	} catch (error) {
		return error;
	}
};
