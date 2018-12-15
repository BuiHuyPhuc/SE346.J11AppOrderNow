export const getFormattedDate = date => {
	return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
};

export const getFormattedTime = date => {
	return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};
