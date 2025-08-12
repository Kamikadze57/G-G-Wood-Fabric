const FRIENDLY_NAMES = {
  'index.html': 'Головна',
  'about-us.html': 'Про нас',
  'articles.html': 'Статті',
  'catalog-interior-doors.html': 'Міжкімнатні двері',
  'catalog.html': 'Каталог',
  'delivery-and-payment.html': 'Доставка та оплата',
  'about.html': 'Про нас',
  'contacts.html': 'Контакти',
  pages: null,
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
  if (!breadcrumbsContainer) {
    return;
  }
  const path = window.location.pathname;
  let segments = path.split('/').filter(s => s !== '');
  let breadcrumbHTML = '';
  let currentPath = '/'; // Додаємо посилання на "Головна" першим
  breadcrumbHTML += `<a class="breadcrumbs__link" href="${currentPath}">${
    FRIENDLY_NAMES['index.html'] || 'Головна'
  }</a>`;
  segments.forEach((segment, index) => {
    const decodedSegment = decodeURIComponent(segment); // Пропускаємо сегменти, які позначені як null
    if (FRIENDLY_NAMES[decodedSegment] === null) {
      currentPath += segment + '/';
      return;
    }
    const displaySegment = getFriendlySegmentName(segment);
    currentPath += segment + '/'; // Додаємо роздільник перед кожним наступним елементом
    breadcrumbHTML += ` <span class="breadcrumbs__spacer">-</span> `; // Останній сегмент - текст, інші - посилання
    if (index === segments.length - 1) {
      if (segment === 'index.html' && path === '/') {
        return;
      }
      breadcrumbHTML += `<span class="bredcrumbs__page">${displaySegment}</span>`;
    } else {
      breadcrumbHTML += `<a href="${currentPath}">${displaySegment}</a>`;
    }
  });
  breadcrumbsContainer.innerHTML = breadcrumbHTML;
}
