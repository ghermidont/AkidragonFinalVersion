import date from "date-and-time";

export const dateConverter = (DATE, format) => {
	if(format==="extended") {
		let date = new Date(DATE);
		return date.toString();
	} else {
		let now = new Date(DATE);
		return date.format(now, "ddd, MMM DD YYYY");
	}
};