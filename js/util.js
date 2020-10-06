'use strict';

(() => {
  const ESC_KEY = `Escape`;
  const ENTER_KEY = `Enter`;


  const getRandomData = (item) => {
    return item[Math.floor(Math.random() * item.length)];
  };

  window.util = {
    ESC_KEY,
    ENTER_KEY,
    getRandomData,

  };
})();
