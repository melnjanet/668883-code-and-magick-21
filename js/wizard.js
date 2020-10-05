'use strict';

(() => {

  const FIREBALL_COLORS = [
    `#ee4830`,
    `#30a8ee`,
    `#5ce6c0`,
    `#e848d5`,
    `#e6e848`,
  ];

  const setup = document.querySelector(`.setup`);
  const wizardCoat = setup.querySelector(`.setup-wizard .wizard-coat`);
  const wizardEyes = setup.querySelector(`.setup-wizard .wizard-eyes`);
  const fireball = setup.querySelector(`.setup-fireball-wrap`);
  const setupUserName = setup.querySelector(`.setup-user-name`);
  const inputCoatColor = setup.querySelector(`input[name=coat-color]`);
  const inputEyesColor = setup.querySelector(`input[name=eyes-color]`);
  const inputFireballColor = setup.querySelector(`input[name=fireball-color]`);

  const setHiddenValues = (input, value) => {
    input.value = value;
  };

  const setCustomColor = (element, attribute, colors, hiddenInput) => {
    const currentColor = window.util.getRandomData(colors);

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

  wizardCoat.addEventListener(`click`, () => {
    setCustomColor(wizardCoat, `fill`, window.setup.wizardCoatColor, inputCoatColor);
  });

  wizardEyes.addEventListener(`click`, () => {
    setCustomColor(wizardEyes, `fill`, window.setup.wizardEyesColor, inputEyesColor);
  });

  fireball.addEventListener(`click`, () => {
    setCustomColor(fireball, `background`, FIREBALL_COLORS, inputFireballColor);
  });

  setupUserName.addEventListener(`invalid`, () => {
    setValidationUserNameHandler();
  });
})();
