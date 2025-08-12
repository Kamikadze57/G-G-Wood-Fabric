import { generateBreadcrumbs } from "./js/breadcrumbs.js";
import { setupEmptyHrefRedirect } from "./js/404.js";

document.addEventListener("DOMContentLoaded", function () {
  generateBreadcrumbs();
  setupEmptyHrefRedirect();
});