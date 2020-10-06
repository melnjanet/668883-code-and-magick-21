"use strict";

(() => {
  const WIZARDS_AMOUNT = 4;

  const WIZARD_NAMES = [
    `Иван`,
    `Хуан Себастьян`,
    `Мария`,
    `Кристоф`,
    `Виктор`,
    `Юлия`,
    `Люпита`,
    `Вашингтон`,
  ];

  const WIZARD_SURNAMES = [
    `да Марья`,
    `Верон`,
    `Мирабелла`,
    `Вальц`,
    `Онопко`,
    `Топольницкая`,
    `Нионго`,
    `Ирвинг`,
  ];

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
  const fragment = document.createDocumentFragment();

  const setWizardsAppearance = () => {
    const wizards = [];

    for (let i = 0; i < WIZARDS_AMOUNT; i++) {
      const name = [window.util.getRandomData(WIZARD_NAMES), window.util.getRandomData(WIZARD_SURNAMES)].sort(function () {
        return 0.5 - Math.random();
      });

      wizards.push({
        name: `${name[0]}  ${name[1]}`,
        coatColor: window.util.getRandomData(WIZARD_COAT_COLORS),
        eyesColor: window.util.getRandomData(WIZARD_EYES_COLORS),
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

  window.setup = {
    wizardCoatColor: WIZARD_COAT_COLORS,
    wizardEyesColor: WIZARD_EYES_COLORS,
  };
})();
