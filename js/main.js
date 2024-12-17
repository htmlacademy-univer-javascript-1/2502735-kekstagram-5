import { fetchPhotos } from './server-api.js';
import { renderMin } from './render-min.js';
import './validation.js';
import './img-edit.js';

(async () => {
  try {
    const photos = await fetchPhotos();
    renderMin(photos);
  } catch {
    const errorContainer = document.createElement('div');
    errorContainer.textContent = 'Ошибка загрузки данных';
    errorContainer.style.cssText = 'color: red; text-align: center;margin-top:10px;';
    document.body.prepend(errorContainer);
  }
})();

