import { generateBreadcrumbs } from "./js/breadcrumbs.js";
import { setupEmptyHrefRedirect } from "./js/404.js";
import { toggleMobile } from "./js/mobile.menu.js";

document.addEventListener("DOMContentLoaded", function () {
  generateBreadcrumbs();
  setupEmptyHrefRedirect();
});
