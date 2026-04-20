import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const locations = require('./database/locations.json');
// const locations = data.default || data;

// Ініціалізація карти
const map = L.map('map').setView([48.3794, 31.1656], 6);
L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  {
    attribution:
      '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>',
  }
).addTo(map);

// Визначення кольору за типом
const getColor = type => {
  switch (type) {
    case 'Офіс':
      return '#2c3e50'; // Темно-синій
    case 'Магазин':
      return '#e67e22'; // Помаранчевий
    case 'Виробництво':
      return '#27ae60'; // Зелений
     case 'Склад':
      return '#2980b9'; // Блакитний
    default:
      return '#95a5a6';
  }
};

const getSize = index => {
  const baseSize = 20;
  return baseSize + index / 5;
};

locations.forEach(loc => {
  const color = getColor(loc.type);
  const size = getSize(loc.operational_index);

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="
            background-color: ${color};
            width: ${size}px;
            height: ${size}px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid white;
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
        "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });

  const marker = L.marker(loc.position, { icon: customIcon }).addTo(map);

  const getCustomStars = rating => {
    const percentage = (rating / 5) * 100;
    return `
        <div class="star-rating__box" title="${rating}">
            <div class="stars__outer">
                <div class="stars__inner" style="width: ${percentage}% !important;"></div>
            </div>
            <span class="rating-value">${rating}</span>
        </div>
    `;
  };

  marker.bindPopup(`
        <div class="map__popup">
            <h3 class="map-popup__title" style="color: ${color};">${loc.name}</h3>
            <span class="map-popup__span" style="background: ${color};">
                ${loc.type.toUpperCase()}
            </span>
            <p class="map-popup__text">${loc.address}</p>
            <div style="color: #f39c12;">
                ${getCustomStars(loc.rating)}
            </div>
            <p class="map-popup__text">Операційний індекс: <b>${loc.operational_index}%</b></p>
        </div>
    `);
});

const legend = L.control({ position: 'bottomleft' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'map__legend');
  const types = ['Офіс', 'Магазин', 'Виробництво', 'Склад'];
  const colors = ['#2c3e50', '#e67e22', '#27ae60', '#2980b9'];

  let legendHtml = "<h4>Типи об'єктів</h4><ul class='legend__list'>";
  
  for (let i = 0; i < types.length; i++) {
    legendHtml += `
      <li class="legend__item">
        <div class="legend-color__types" style="background: ${colors[i]}"></div>
        <p class="legend-color__text">${types[i]}</p>
      </li>`;
  }
  
  legendHtml += "</ul>";
  div.innerHTML = legendHtml;
  
  return div;
};

legend.addTo(map);

// Шари
const light = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
);
const dark = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
);
const satellite = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
);

// Один за замовчуванням
light.addTo(map);

const baseMaps = {
  Світла: light,
  Темна: dark,
  Супутник: satellite,
};

L.control.layers(baseMaps).addTo(map);
