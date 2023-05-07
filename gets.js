import { user } from "./index.js";
import { formatDistanceToNowPost } from "./helpers.js"

export const getListPostsInstapro = (post) => {
	const likedUserNames = post.likes.map(post => post.name);
	const likedUserId = post.likes.map(post => post.id)

	if (user && likedUserId.includes(user._id)) {
		post.isLiked = true;
	}

	return `
		<div class="page-container">
		<div class="header-container"></div>
			<ul class="posts">
				<li class="post">
					<div class="post-header" data-user-id="${post.user.id}">
						<img src="${post.user.imageUrl}" class="post-header__user-image">
						<p class="post-header__user-name">${post.user.name}</p>
					</div>
					<div class="post-image-container">
						<img class="post-image" src="${post.imageUrl}">
					</div>
					<div class="post-likes">
						<button data-post-id="${post.id}" class="like-button">
						<img src="./assets/images/${post.isLiked ? `like-active` : `like-not-active`}.svg">
						</button>
						<p class="post-likes-text">
							Нравится: <strong>${likedUserNames.length ? likedUserNames[0] : 0}</strong>
							${likedUserNames.length > 1 ? `и <strong>еще ${likedUserNames.length - 1}</strong>` : ''}
						</p>
					</div>
					<p class="post-text">
						<span class="user-name">${post.user.name}</span>
						${post.description}
					</p>
					<p class="post-date">
					${formatDistanceToNowPost(new Date(post.createdAt))}
					</p>
				</li>
			</ul>
		</div>`
}

export const getUserListInstapro = (post, index) => {
	
	const likedUserNames = post.likes.map(post => post.name);
	const likedUserId = post.likes.map(post => post.id)

	if (user && likedUserId.includes(user._id)) {
		post.isLiked = true;
	}

	return `
		<div class="page-container">
		<div class="header-container"></div>
			<ul class="posts">
				<li class="post">
					<div class="post-user-header" data-user-id="${post.user.id}">
						<img src="${post.user.imageUrl}" class="posts-user-header__user-image">
						<p class="posts-user-header__user-name">${post.user.name}</p>
					</div>
					<div class="post-image-container">
						<img class="post-image" src="${post.imageUrl}">
					</div>
					<div class="post-likes">
						<button data-post-id="${post.id}" class="like-button">
						<img src="./assets/images/${post.isLiked ? `like-active` : `like-not-active`}.svg">
						</button>
						<p class="post-likes-text">
							Нравится: <strong>${likedUserNames.length ? likedUserNames[0] : 0}</strong>
							${likedUserNames.length > 1 ? `и <strong>еще ${likedUserNames.length - 1}</strong>` : ''}
						</p>
					</div>
					<p class="post-text">
						<span class="user-name">${post.user.name}</span>
						${post.description}
					</p>
					<p class="post-date">
						${post.createdAt}
					</p>
				</li>
			</ul>
		</div>`
}