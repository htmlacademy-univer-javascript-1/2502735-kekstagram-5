const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

const scaleStep = 25;
const scaleMin = 25;
const scaleMax = 100;
let currentScale = 100;
let currentEffect = 'none';

const effectsImage = {
  none: { filter: '', range: [0, 0], step: 0, unit: '' },
  chrome: { filter: 'grayscale', range: [0, 1], step: 0.1, unit: '' },
  sepia: { filter: 'sepia', range: [0, 1], step: 0.1, unit: '' },
  marvin: { filter: 'invert', range: [0, 100], step: 1, unit: '%' },
  phobos: { filter: 'blur', range: [0, 3], step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', range: [1, 3], step: 0.1, unit: '' },
};

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > scaleMin) {
    currentScale -= scaleStep;
    updateScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < scaleMax) {
    currentScale += scaleStep;
    updateScale();
  }
});

const applyEffect = (effect) => {
  const { filter, range, unit } = effectsImage[effect];

  if (effect === 'none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = '';
    effectLevelValue.value = '';
    return;
  }

  effectLevelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: range[0], max: range[1] },
    start: range[1],
    step: effectsImage[effect].step,
  });

  effectLevelSlider.noUiSlider.on('update', ([value]) => {
    imagePreview.style.filter = `${filter}(${value}${unit})`;
    effectLevelValue.value = value;
  });
  imagePreview.style.filter = `${filter}(${range[1]}${unit})`;
  effectLevelValue.value = range[1];
};

effectsList.addEventListener('change', ({ target: { name, value } }) => {
  if (name === 'effect') {
    currentEffect = value;
    applyEffect(currentEffect);
  }
});

noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
});
effectLevelContainer.classList.add('hidden');

export const resetEffects = () => {
  currentScale = 100;
  currentEffect = 'none';
  updateScale();
  applyEffect(currentEffect);
};

export const applyPreviewImage = (src) => {
  imagePreview.src = src;
};
