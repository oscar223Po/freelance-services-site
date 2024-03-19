// ~~~~~~~~[ JavaScript Files Connecting ]~~~~~~~
// Підключення функціоналу "Чертоги Фрілансера"
import { bodyLock, bodyUnlock, isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
//--------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
	// ================[ JavaScript Section Heading Scroll ]================
	var headingScroll = document.querySelector(".heading");
	if (headingScroll !== null) {
		window.addEventListener("scroll", function () {
			var scrollPosition = window.scrollY;
			if (scrollPosition > 1) {
				headingScroll.classList.add("_heading-scroll");
			} else {
				headingScroll.classList.remove("_heading-scroll");
			}
		});
	}
	// ================[ JavaScript Section ]================
	const courseItems = document.querySelector(".courses__items");
	let data;
	let startItem = 0;
	let endItem = 3;
	if (courseItems) {
		loadCourseItems();
	}
	async function loadCourseItems() {
		const response = await fetch("files/courses.json", {
			method: "GET"
		});
		if (response.ok) {
			const responseResult = await response.json();
			data = responseResult;
			initCourse(data, startItem, endItem);
		} else {
			alert("Error!");
		}
	}
	function initCourse(data, startItem, endItem) {
		const dataPart = data.items.slice(startItem, endItem);
		dataPart.forEach(item => {
			buildCourseItem(item);
		});
		viewMore();
	}
	function buildCourseItem(item) {
		let courseItemTemplate = ``;

		courseItemTemplate += `<article data-id="${item.id}" class="course">`;

		item.image ? courseItemTemplate += `<div class="course__image"><img src="${item.image}" alt="Image"></div>` : null;

		courseItemTemplate += `<div class="course__content">`;

		courseItemTemplate += `<a target="_blank" href="${item.url}" class="course__title">${item.title}</a>`;

		courseItemTemplate += `<div class="course__form form-course">`;

		courseItemTemplate += `<div class="form-course__name">${item.name}</div>`;
		courseItemTemplate += `<div class="form-course__rate _icon-rate">${item.rate}</div>`;
		courseItemTemplate += `<div class="form-course__cost">${item.price}</div>`;

		courseItemTemplate += `</div>`;

		courseItemTemplate += `<div class="course__labels labels-course">`;

		courseItemTemplate += `<div class="labels-course__item _icon-clock">${item.clock}</div>`
		courseItemTemplate += `<div class="labels-course__item _icon-stack">${item.stack}</div>`
		courseItemTemplate += `<div class="labels-course__item _icon-level">${item.level}</div>`

		courseItemTemplate += `</div>`;

		courseItemTemplate += `</div>`;

		courseItemTemplate += `</article>`;

		courseItems.insertAdjacentHTML("beforeend", courseItemTemplate);
	}
	document.addEventListener("click", documentActions)
	function viewMore() {
		const dataItemsLength = data.items.length;
		const currentItems = document.querySelectorAll(".course").length;
		const vewMore = document.querySelector(".courses__view-more");
		currentItems < dataItemsLength ? vewMore.style.display = 'inline-flex' : vewMore.style.display = 'none';
	}
	function documentActions(e) {
		const targetElement = e.target;
		if (targetElement.closest(".courses__view-more")) {
			startItem = document.querySelectorAll(".course").length;
			endItem = startItem + 3;
			initCourse(data, startItem, endItem);
			e.preventDefault();
		}
	}
	// ================[ JavaScript Section Category Reset ]================
	const buttonResetCategory = document.querySelector(".aside-category__reset");
	const checkboxCategory = document.querySelectorAll(".checkbox input");
	if (buttonResetCategory !== null) {
		buttonResetCategory.addEventListener("click", () => {
			for (let i = 0; i < checkboxCategory.length; i++) {
				checkboxCategory[i].checked = false;
			}
		})
	}
	// ================[ JavaScript Section Filter Open & Close ]================
	const filterCategory = document.querySelector(".aside-category");
	const filterCategoryButtonOpen = document.querySelector(".tabs-category__filter");
	const filterCategoryButtonClose = document.querySelector(".aside-category__close");
	if (filterCategory !== null) {
		filterCategoryButtonOpen.addEventListener("click", () => {
			bodyLock();
			filterCategory.classList.remove("aside-category--disabled");
		})
		filterCategoryButtonClose.addEventListener("click", () => {
			bodyUnlock();
			filterCategory.classList.add("aside-category--disabled");
		})
	}
});
//--------------------------------------------------------------
