import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getListPostsInstapro } from "../gets.js";

export function renderPostsPageComponent({ appEl, getListPosts }) {

	let postsHTML = posts
		.map((post, index) => getListPostsInstapro(post, index)).join("");

	// TODO: реализовать рендер постов из api
	// console.log("Актуальный список постов:", posts);

	/**
	 * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
	 * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
	 */

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
}

