const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

export const fetchPhotos = () => {
  const promis = fetch(`${BASE_URL}/data`, {
    method: 'GET'
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(`Не удалось загрузить данные: ${error.message}`);
    });

  return promis;
};

export const sendPhotoData = (formData) => {
  const promis = fetch(BASE_URL, {
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

  return promis;
};
