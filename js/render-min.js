import { generateObjects } from './util.js';
import { showBigPicture } from './big-picture.js';

export function renderMin() {
  const photos = generateObjects();
  const picturesContainer = document.querySelector('.pictures');
  const template = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = template.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent =
      photo.comments.length;

    photoElement.querySelector('.picture__img').addEventListener('click', () => {
      showBigPicture(photo);
    });

    fragment.appendChild(photoElement);
  });

  picturesContainer.appendChild(fragment);
}
