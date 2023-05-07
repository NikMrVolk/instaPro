import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getListPostsInstapro } from "../gets.js";
import { addLike, deleteLike } from "../api.js";

import { user, getToken } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
	let postsHTML = posts
		.map((post, index) => getListPostsInstapro(post, index)).join("");

	appEl.innerHTML = postsHTML;

	renderHeaderComponent({
		element: document.querySelector(".header-container"),
	});

	for (let userEl of document.querySelectorAll(".post-header")) {
		userEl.addEventListener("click", () => {

			goToPage(USER_POSTS_PAGE, {
				userId: userEl.dataset.userId,
			});
		});
	}
	workWithButtonLike();
}

export const workWithButtonLike = () => {

	const likeButtons = document.querySelectorAll(".like-button");
	for (const likeButton of likeButtons) {
		likeButton.addEventListener("click", () => {
			if (user) {

				const isPostImage = likeButton.classList.contains("post-image");
				let postId;

				const postEl = likeButton.closest(".post");
				postId = postEl.querySelector(".like-button").dataset.postId;

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
				console.log("нужно авторизоваться");
			}
		})
	}

}


/**
 * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
 * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
 */