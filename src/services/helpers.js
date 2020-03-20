import moment from 'moment';

// generating idi for children in lists
export const createID = (payload = '') => {
	return payload + ' ' + Math.random().toString(36).substr(2, 9);
};

// check for token in local storage
export const getIslogin = () => {
	let isLogged = false;
	const token = localStorage.getItem('token');
	if (token) isLogged = true;
	return isLogged;
};

// image display function in the text
export const replaceImg = ({ type, text, images }) => {
	switch (type) {
		// replaces the id of the image with a link in the text
		case 'img':
			images.forEach((image) => {
				const imageBase64 = `![](${image.src})`;
				const imageId = `<id:${image.id}>`;
				const fromIdtoImage = new RegExp(imageId);
				text = text.replace(fromIdtoImage, imageBase64);
			});
			return text;
		// replaces the base 64 of the image with a id in the text
		case 'id':
			const fromImagetoId = /!\[\]\(.+?\)/;
			images.forEach((image) => {
				const imageId = `<id:${image.id}>`;
				text = text.replace(fromImagetoId, imageId);
			});
			return text;
		default:
			return text;
	}
};

// display of different time formats for different time periods
export const typeOfTime = (date) => {
	let currentTime = moment();
	let createdTime = moment(date);
	if (currentTime.diff(createdTime, 'days') <= 1) {
		return moment(date).startOf('hour').fromNow();
	} else {
		return moment(date).format('LLL');
	}
};

// display comments by id
export const togglePropertyInSet = (set, property) => {
	if (set.has(property)) {
		set.delete(property);
	} else {
		set.add(property);
	}
	return set;
};
