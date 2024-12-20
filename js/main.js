import { fetchPhotos } from './server-api.js';
import { renderMin } from './render-min.js';
import { initFilters } from './filter.js';
import './form.js';
import './img-edit.js';

(async () => {
  try {
    const photos = await fetchPhotos();

    renderMin(photos);

    initFilters(photos, (filteredPhotos) => {
      document.querySelectorAll('.picture').forEach((element) => element.remove());
      renderMin(filteredPhotos);
    });
  } catch (error) {

    const errorContainer = document.createElement('div');
    errorContainer.textContent = 'Ошибка загрузки данных';
    errorContainer.style.cssText = 'color: red; text-align: center; margin: 20px;';
    document.body.prepend(errorContainer);
  }
})();

