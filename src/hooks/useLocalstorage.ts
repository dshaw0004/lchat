const APP_PREFIX = "lchat_";
export function addToLocalStorage(
	value: string | boolean | number,
	name: string
) {
	localStorage.setItem(APP_PREFIX + name, value.toString());
}

export function getFromLocalStorage(name: string) {
	const data = localStorage.getItem(APP_PREFIX + name);
	return data;
}

export function removeFromLocalStorage(itemName: string) {
	localStorage.removeItem(APP_PREFIX + itemName);
}
