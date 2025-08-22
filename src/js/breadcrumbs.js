const FRIENDLY_NAMES = {
  'index.html': 'Головна',
  'about-us.html': 'Про нас',
  'articles.html': 'Статті',
  'catalog-interior-doors.html': 'Міжкімнатні двері',
  'catalog.html': 'Каталог',
  'delivery-and-payment.html': 'Доставка та оплата',
  'about.html': 'Про нас',
  'contacts.html': 'Контакти',
  'product-card.html': 'Картка товару',
  pages: null,
  catalog: 'Каталог',
  'G-G-Wood-Fabric': null,
};

function getFriendlySegmentName(segment) {
  const decodedSegment = decodeURIComponent(segment);
  let displaySegment = FRIENDLY_NAMES[decodedSegment];
  if (displaySegment === undefined) {
    if (decodedSegment.endsWith('.html')) {
      displaySegment = decodedSegment.replace('.html', '');
    } else {
      displaySegment = decodedSegment;
    }
    displaySegment =
      displaySegment.charAt(0).toUpperCase() +
      displaySegment.slice(1).replace(/-/g, ' ');
  }
  return displaySegment;
}

export function generateBreadcrumbs() {
  const breadcrumbsContainer = document.querySelector('[breadcrumbs]');
  if (!breadcrumbsContainer) return;

  // формуємо сегменти та одразу порахуємо відносний лінк до pages/catalog.html
  const path = window.location.pathname;
  const segments = path.split('/').filter(s => s !== '');
  const catalogIdx = segments.indexOf('catalog');
  const relCatalogLink =
    catalogIdx !== -1
      ? '../'.repeat(segments.length - 1 - catalogIdx) + 'pages/catalog.html'
      : '/pages/catalog.html';

  let breadcrumbHTML = '';
  let currentPath = '../index.html';

  // Головна
  breadcrumbHTML += `<a class="breadcrumbs__link" href="${currentPath}">${
    FRIENDLY_NAMES['index.html'] || 'Головна'
  }</a>`;

  segments.forEach((segment, index) => {
    const decodedSegment = decodeURIComponent(segment);

    if (FRIENDLY_NAMES[decodedSegment] === null) {
      currentPath += segment + '/';
      return;
    }

    const displaySegment = getFriendlySegmentName(segment);
    currentPath += segment + '/'; // Додаємо роздільник перед кожним наступним елементом
    breadcrumbHTML += ` <span class="breadcrumbs__spacer">-</span> `; // Останній сегмент - текст, інші - посилання
    if (index === segments.length - 1) {
      if (segment === 'index.html' && path === '/') return;
      breadcrumbHTML += `<span class="bredcrumbs__page">${displaySegment}</span>`;
    } else {
      // тільки для крихти catalog підміняємо посилання
      const link =
        decodedSegment === 'catalog' || decodedSegment === 'catalog.html'
          ? relCatalogLink
          : currentPath;

      breadcrumbHTML += `<a class="breadcrumbs__link" href="${link}">${displaySegment}</a>`;
    }
  });

  breadcrumbsContainer.innerHTML = breadcrumbHTML;
}
