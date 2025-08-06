document.addEventListener("DOMContentLoaded", function () {
  // --- Конфігурація: Мапа "дружніх" назв для хлібних крихт ---
  const FRIENDLY_NAMES = {
    "index.html": "Головна",
    "catalog.html": "Каталог",
    "about.html": "Про нас",
    "contacts.html": "Контакти",
    pages: null, // Ігноруємо папку 'pages'
  };

  // --- Функції для хлібних крихт ---
  function getFriendlySegmentName(segment) {
    const decodedSegment = decodeURIComponent(segment);
    let displaySegment = FRIENDLY_NAMES[decodedSegment];
    if (displaySegment === undefined) {
      if (decodedSegment.endsWith(".html")) {
        displaySegment = decodedSegment.replace(".html", "");
      } else {
        displaySegment = decodedSegment;
      }
      displaySegment = displaySegment.charAt(0).toUpperCase() + displaySegment.slice(1).replace(/-/g, " ");
    }
    return displaySegment;
  }

  function generateBreadcrumbs() {
    const breadcrumbsContainer = document.getElementById("breadcrumbs");
    if (!breadcrumbsContainer) {
      return;
    }
    const path = window.location.pathname;
    let segments = path.split("/").filter((s) => s !== "");
    let breadcrumbHTML = "";
    let currentPath = "/";
    // Додаємо посилання на "Головна" першим
    breadcrumbHTML += `<a href="${currentPath}">${FRIENDLY_NAMES["index.html"] || "Головна"}</a>`;
    segments.forEach((segment, index) => {
      const decodedSegment = decodeURIComponent(segment);
      // Пропускаємо сегменти, які позначені як null
      if (FRIENDLY_NAMES[decodedSegment] === null) {
        currentPath += segment + "/";
        return;
      }

      const displaySegment = getFriendlySegmentName(segment);
      currentPath += segment + "/";
      // Додаємо роздільник перед кожним наступним елементом
      breadcrumbHTML += ` <span class="breadcrumbs__spacer">-</span> `;
      // Останній сегмент - текст, інші - посилання
      if (index === segments.length - 1) {
        if (segment === "index.html" && path === "/") {
          return;
        }
        breadcrumbHTML += `<span>${displaySegment}</span>`;
      } else {
        breadcrumbHTML += `<a href="${currentPath}">${displaySegment}</a>`;
      }
    });
    breadcrumbsContainer.innerHTML = breadcrumbHTML;
  }

  // --- Функція для перенаправлення порожніх посилань ---
  function setupEmptyHrefRedirect() {
    const allLinks = document.querySelectorAll("a[href]");
    allLinks.forEach((link) => {
      const href = link.getAttribute("href").trim();

      if (href === "" || href === "#") {
        link.addEventListener("click", function (event) {
          event.preventDefault(); // Запобігаємо стандартній дії
          window.location.href = "/pages/404.html"; // Перенаправляємо
        });
      }
    });
  }

  // --- Виконання функцій при завантаженні DOM ---
  generateBreadcrumbs(); // Генеруємо хлібні крихти
  setupEmptyHrefRedirect(); // Налаштовуємо перенаправлення
});
