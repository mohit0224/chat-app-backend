const httpResponse = (message, success, data) => {
	return { message, success, data };
};

const httpError = (message, success, data) => {
	return { message, success, data: data && data };
};

export { httpResponse, httpError };
