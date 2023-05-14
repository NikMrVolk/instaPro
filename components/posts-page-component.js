import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getListPostsInstapro } from "../gets.js";
import { workWithButtonLike } from "./likes-component.js";

export function renderPostsPageComponent({ appEl }) {
	let postsHTML = posts
		.map((post, index) => getListPostsInstapro(post, index)).join("");
	console.log(appEl);
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