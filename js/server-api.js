const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

export const fetchPhotos = () => {
  return fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Не удалось загрузить данные:', error);
      throw error;
    });
};

export const sendPhotoData = (formData) => {
  return fetch(BASE_URL, {
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
      console.error('Не удалось отправить данные:', error);
      throw error;
    });
};
