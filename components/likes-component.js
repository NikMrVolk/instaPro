import { addLike, deleteLike } from "../api.js";
import { user, getToken } from "../index.js";
import { posts } from "../index.js";

export const workWithButtonLike = () => {

	const likeButtons = document.querySelectorAll(".like-button");
	for (const likeButton of likeButtons) {
		likeButton.addEventListener("click", () => {
			if (user) {

				const postEl = likeButton.closest(".post");
				let postId = postEl.querySelector(".like-button").dataset.postId;

				const post = posts.find((post) => post.id === postId);
				post.isLiked = !post.isLiked;

				const userIndex = post.likes.findIndex((like) => like.name === user.name);

				if (post.isLiked) {
					if (userIndex === -1) {
						post.likes.push({ name: user.name });
					}
				} else {
					if (userIndex !== -1) {
						post.likes.splice(userIndex, 1);
					}
				}

				let likedUserNames = post.likes.map((like) => like.name);

				const likeCountElement = postEl.querySelector(".post-likes-text");
					likeCountElement.innerHTML = `Нравится: <strong>${likedUserNames.length ? likedUserNames[0] : 0}</strong>
					${likedUserNames.length > 1 ? `и <strong>еще ${likedUserNames.length - 1}</strong>` : ""}`;

				const likeImageElement = postEl.querySelector(".like-button img");
					likeImageElement.src = `./assets/images/${post.isLiked ? "like-active.svg" : "like-not-active.svg"}`;

				if (post.isLiked) {
					addLike({ 
						token: getToken(), 
						id: postId,
					});
				} else {
					deleteLike({ 
						token: getToken(), 
						id: postId,
					});
				}

			} else {
				alert("нужно авторизоваться");
			}
		})
	}

}