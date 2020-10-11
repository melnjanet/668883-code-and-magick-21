'use strict';

(() => {
  const INITIAL_DIALOG_X = `50%`;
  const INITIAL_DIALOG_Y = `80px`;

  const setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = setup.querySelector(`.setup-close`);
  const setupSubmit = setup.querySelector(`.setup-submit`);
  const form = setup.querySelector(`.setup-wizard-form`);

  const setupInitialPosition = () => {
    if (setup.style.left !== INITIAL_DIALOG_X || setup.style.top !== INITIAL_DIALOG_Y) {
      setup.style.left = INITIAL_DIALOG_X;
      setup.style.top = INITIAL_DIALOG_Y;
    }
  };

  const setCloseHandler = () => {
    setup.classList.add(`hidden`);
  };

  const setOpenHandler = () => {
    setup.classList.remove(`hidden`);
  };

  const onPopupEscPress = (evt) => {
    if (evt.key === window.util.ESC_KEY && evt.target.name !== `username`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const setCloseEnterHandler = (evt) => {
    if (evt.key === window.util.ENTER_KEY) {
      closePopup();
    }
  };

  const setOpenEnterHandler = (evt) => {
    if (evt.key === window.util.ENTER_KEY) {
      evt.preventDefault();
      openPopup();
    }
  };

  const openPopup = () => {
    setupInitialPosition();
    setOpenHandler();
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = () => {
    setCloseHandler();
    setupInitialPosition();
    document.removeEventListener(`keydown`, onPopupEscPress);
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

  form.addEventListener(`submit`, (evt) => {
    window.backend.save(setCloseHandler, window.setup.errorHandler, new FormData(form));
    evt.preventDefault();
  });
})();
