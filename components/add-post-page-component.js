import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { getToken } from "../index.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
	let imageUrl = "";

	const render = () => {
		const appHtml = `
			<div class="page-container">
				<div class="header-container"></div>
				<div class="form">
					<h3 class="form-title">Добавить пост</h3>
					<div class="form-inputs">
						<div class="upload-image-container"></div>
						<label>
							Опишите фотографию
							<textarea id="textareaInput" class="input textarea" rows="4"></textarea>
						</label>
						<button class="button add-post-button" id="add-button">Добавить</button>
					</div>
				</div>
			</div>`;
		appEl.innerHTML = appHtml;

		const textareaInput = document.getElementById("textareaInput");

		renderHeaderComponent({
			element: document.querySelector(".header-container"),
		});

		renderUploadImageComponent({
			element: appEl.querySelector(".upload-image-container"),
			onImageUrlChange(newImageUrl) {
				imageUrl = newImageUrl;
			},
		});


		document.getElementById("add-button").addEventListener("click", () => {

			if (!textareaInput.value) {
				alert("Не заполнено описание фото")
			}
			if (!imageUrl) {
				alert("Не указано фото")
			}

			onAddPostClick({
				description: textareaInput.value,
				imageUrl: imageUrl,
			});
		});
	};

	render();

}



		// TODO: Реализовать страницу добавления поста