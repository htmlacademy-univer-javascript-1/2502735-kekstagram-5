import { sendPhotoData } from './server-api.js';
import { resetEffects, applyPreviewImage } from './img-edit.js';

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const pattern = /^#[a-zа-яё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
});

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
  resetEffects();
};

cancelButton.addEventListener('click', closeForm);
document.addEventListener('keydown', ({ key, target }) => {
  if (key === 'Escape' && ![hashtagsInput, descriptionInput].includes(target)) {
    closeForm();
  }
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      applyPreviewImage(reader.result);
      openForm();
    };
    reader.readAsDataURL(file);
  }
});

const validateHashtags = (value) => {
  if (!value) {
    return false;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const isValid = hashtags.every((tag) => pattern.test(tag));
  const hasNoDuplicates = new Set(hashtags).size === hashtags.length;
  return hashtags.length <= 5 && isValid && hasNoDuplicates;
};

const getHashtagErrorMessage = (value) => {
  if (!value) {
    return 'Поле хэш-тегов не должно быть пустым';
  }
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > 5) {
    return 'Не более 5 хэш-тегов';
  }
  if (!hashtags.every((tag) => pattern.test(tag))) {
    return 'Хэш-тег начинается с символа # (решётка), после которой содержать только буквы и цифры длиной до 20 символов';
  }
  if (new Set(hashtags).size !== hashtags.length) {
    return 'Хэш-тег не может быть использован дважды';
  }
  return '';
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(hashtagsInput, validateHashtags, getHashtagErrorMessage,true);
pristine.addValidator(descriptionInput, validateDescription, 'Длина комментария не может составлять больше 140 символов');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  submitButton.disabled = true;
  const formData = new FormData(form);

  try {
    await sendPhotoData(formData);

    const successMessage = successTemplate.cloneNode(true);
    document.body.appendChild(successMessage);

    const closeSuccessMessage = () => {
      successMessage.remove();
      closeForm();
    };

    successMessage.querySelector('.success__button').addEventListener('click', closeSuccessMessage);
  } catch {
    const errorMessage = errorTemplate.cloneNode(true);
    document.body.appendChild(errorMessage);

    const closeErrorMessage = () => {
      errorMessage.remove();
      closeForm();
    };

    errorMessage.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  } finally {
    submitButton.disabled = false;
  }
});
