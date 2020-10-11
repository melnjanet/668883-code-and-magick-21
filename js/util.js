'use strict';

(() => {
  const ESC_KEY = `Escape`;
  const ENTER_KEY = `Enter`;

  const getRandomData = (item) => {
    return item[Math.floor(Math.random() * item.length)];
  };

  const setRandomArrayData = (array) => {
    let newArray = [];

    array.forEach((item, i, arr) => {
      newArray[i] = arr[Math.floor(Math.random() * arr.length)];
    });

    return newArray;
  };

  window.util = {
    ESC_KEY,
    ENTER_KEY,
    getRandomData,
    setRandomArrayData,
  };
})();
