import axios from "axios";

const sleep = (delay) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
	try {
		await sleep(500);
		return response;
	} catch (error) {
		console.log(error);
		return await Promise.reject(error);
	}
});

const responseBody = (response) => {
	return response.data;
};

const requests = {
	get: (url) => axios.get(url).then(responseBody),
	post: (url, body) => axios.post(url, body).then(responseBody),
	put: (url, body) => axios.put(url, body).then(responseBody),
	delete: (url) => axios.delete(url).then(responseBody),
};

const Playlists = {
	list: () => requests.get("/playlists"),
	details: (id) => requests.get(`playlists/${id}`),
	create: (playlist) => requests.post(`playlists`, playlist),
	update: (playlist) => requests.put(`playlists/${playlist.id}`, playlist),
	delete: (id) => requests.delete(`playlists/${id}`),
};

const agent = {
	Playlists,
};

export default agent;
