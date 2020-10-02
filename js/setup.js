"use strict";
const WIZARDS_AMOUNT = 4;

const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const WIZARD_COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const WIZARD_EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`,
];

const setup = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setup.querySelector(`.setup-close`);
const setupSubmit = setup.querySelector(`.setup-submit`);
const similarListElement = setup.querySelector(`.setup-similar-list`);
const wizardCoat = setup.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = setup.querySelector(`.setup-wizard .wizard-eyes`);
const fireball = setup.querySelector(`.setup-fireball-wrap`);
const setupUserName = setup.querySelector(`.setup-user-name`);
const inputCoatColor = setup.querySelector(`input[name=coat-color]`);
const inputEyesColor = setup.querySelector(`input[name=eyes-color]`);
const inputFireballColor = setup.querySelector(`input[name=fireball-color]`);


const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content
  .querySelector(`.setup-similar-item`);

const fragment = document.createDocumentFragment();

const getRandomData = (item) => {
  return item[Math.floor(Math.random() * item.length)];
};


const setCloseHandler = () => {
  setup.classList.add(`hidden`);
};

const setOpenHandler = () => {
  setup.classList.remove(`hidden`);
};


const onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && evt.target.name !== `username`) {
    evt.preventDefault();
    closePopup();
  }
};

const setCloseEnterHandler = (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
};

const setOpenEnterHandler = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    openPopup();
  }
};

const openPopup = () => {
  setOpenHandler();
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  setCloseHandler();
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const setHiddenValues = (input, value) => {
  input.value = value;
};

const setCustomColor = (element, attribute, colors, hiddenInput) => {
  const currentColor = getRandomData(colors);

  if (attribute === `fill`) {
    element.style.fill = currentColor;
  } else if (attribute === `background`) {
    element.style.background = currentColor;
  }

  setHiddenValues(hiddenInput, currentColor);
};

const setValidationUserNameHandler = () => {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity(`Имя должно состоять минимум из 2-х символов`);
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity(`Имя не должно превышать 25-ти символов`);
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity(`Обязательное поле`);
  } else {
    setupUserName.setCustomValidity(``);
  }
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpen.addEventListener(`keydown`, (evt) => {
  setOpenEnterHandler(evt);
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, (evt) => {
  setCloseEnterHandler(evt);
});

setupSubmit.addEventListener(`keydown`, (evt) => {
  setCloseEnterHandler(evt);
});

wizardCoat.addEventListener(`click`, () => {
  setCustomColor(wizardCoat, `fill`, WIZARD_COAT_COLORS, inputCoatColor);
});

wizardEyes.addEventListener(`click`, () => {
  setCustomColor(wizardEyes, `fill`, WIZARD_EYES_COLORS, inputEyesColor);
});

fireball.addEventListener(`click`, () => {
  setCustomColor(fireball, `background`, FIREBALL_COLORS, inputFireballColor);
});

setupUserName.addEventListener(`invalid`, () => {
  setValidationUserNameHandler();
});


const setWizardsAppearance = () => {
  const wizards = [];

  for (let i = 0; i < WIZARDS_AMOUNT; i++) {
    const name = [getRandomData(WIZARD_NAMES), getRandomData(WIZARD_SURNAMES)].sort(function () {
      return 0.5 - Math.random();
    });

    wizards.push({
      name: `${name[0]}  ${name[1]}`,
      coatColor: getRandomData(WIZARD_COAT_COLORS),
      eyesColor: getRandomData(WIZARD_EYES_COLORS),
    });
  }

  return wizards;
};

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderWizardAppearance = (wizards) => {
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

const wizards = setWizardsAppearance();
renderWizardAppearance(wizards);
