// ~~~~~~~~[ JavaScript Files Connecting ]~~~~~~~
// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
// ================[ JavaScript Section ]================
document.addEventListener("DOMContentLoaded", function () {
	var headingScroll = document.querySelector(".heading");
	window.addEventListener("scroll", function () {
		var scrollPosition = window.scrollY;
		if (scrollPosition > 1) {
			headingScroll.classList.add("_heading-scroll");
		} else {
			headingScroll.classList.remove("_heading-scroll");
		}
	});
});
//--------------------------------------------------------------