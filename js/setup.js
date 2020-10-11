"use strict";

(() => {
  const WIZARDS_AMOUNT = 4;

  const WIZARD_COAT_COLORS = [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`,
  ];

  const WIZARD_EYES_COLORS = [
    `black`,
    `red`,
    `blue`,
    `yellow`,
    `green`,
  ];

  const setup = document.querySelector(`.setup`);
  const similarListElement = setup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const errorHandler = (errorMessage) => {
    const errorNode = document.createElement(`div`);
    errorNode.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    errorNode.style.position = `absolute`;
    errorNode.style.left = 0;
    errorNode.style.right = 0;
    errorNode.style.fontSize = `30px`;

    errorNode.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorNode);
  };

  const successHandler = (wizards) => {
    const fragment = document.createDocumentFragment();
    const randomWizards = window.util.setRandomArrayData(wizards);

    for (let i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderWizard(randomWizards[i]));
    }

    similarListElement.appendChild(fragment);
    setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  window.backend.load(successHandler, errorHandler);
  window.setup = {
    wizardCoatColor: WIZARD_COAT_COLORS,
    wizardEyesColor: WIZARD_EYES_COLORS,
    errorHandler,
  };
})();
