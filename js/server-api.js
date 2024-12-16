const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

export const fetchPhotos = () => {
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(`Не удалось загрузить данные: ${error.message}`);
    });
};

export const sendPhotoData = (formData) => {
  fetch(BASE_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(`Не удалось отправить данные: ${error.message}`);
    });
};
