export function setupEmptyHrefRedirect() {
  const allLinks = document.querySelectorAll('a[href]');
  allLinks.forEach(link => {
    if (link.closest('.leaflet-control-container')) {
      return;
    }
    const href = link.getAttribute('href').trim();

    if (href === '' || href === '#') {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = '/pages/404.html';
      });
    }
  });
}
