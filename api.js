// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "nikita-zavadskiy";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts() {
	console.log(postsHost);
	return fetch("https://webdev-hw-api.vercel.app/api/v1/nikita-zavadskiy/instapro", {
		method: "GET",

	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data.posts;
		});
}

export function registerUser({ login, password, name, imageUrl }) {
	return fetch(baseHost + "/api/user", {
		method: "POST",
		body: JSON.stringify({
			login,
			password,
			name,
			imageUrl,
		}),
	}).then((response) => {
		if (response.status === 400) {
			throw new Error("Такой пользователь уже существует");
		}
		return response.json();
	});
}

export function loginUser({ login, password }) {
	return fetch(baseHost + "/api/user/login", {
		method: "POST",
		body: JSON.stringify({
			login,
			password,
		}),
	}).then((response) => {
		if (response.status === 400) {
			throw new Error("Неверный логин или пароль");
		}
		return response.json();
	});
}

export function uploadImage({ file }) {
	const data = new FormData();
	data.append("file", file);

	return fetch(baseHost + "/api/upload/image", {
		method: "POST",
		body: data,
	}).then((response) => {
		return response.json();
	});
}

export function addNewPosts({ token, description, imageUrl }) {
	return fetch(postsHost, {
		method: "POST",
		body: JSON.stringify({
			description,
			imageUrl,
		}),
		headers: {
			Authorization: token,
		},
	})
		.then((response) => {
			if (response.status === 400) {
				throw new Error("Возникла ошибка");
			}
			return response.json();
		})
}

export function getUserPosts(id) {
	return fetch(`${postsHost}/user-posts/${id}`, {
		method: "GET",

	})
		.then((response) => {
			if (response.status === 401) {
				throw new Error("Нет авторизации");
			}
			return response.json();
		})
		.then((data) => {
			return data.posts;
		});
}

export function addLike({ token, id }) {
	return fetch(postsHost + "/" + id + "/like", {
		method: "POST",
		headers: {
			Authorization: token,
		},
	})
		.then((response) => {
			return response.json();
		});
}

export function deleteLike({ token, id }) {
	return fetch(postsHost + "/" + id + "/dislike", {
		method: "POST",
		headers: {
			Authorization: token,
		},
	})
		.then((response) => {
			return response.json();
		});
}