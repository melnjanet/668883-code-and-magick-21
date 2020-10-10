"use strict";

(() => {
  const url = {
    POST: `https://21.javascript.pages.academy/code-and-magick`,
    GET: `https://21.javascript.pages.academy/code-and-magick/data`,
  };

  const TIMEOUT_IN_MS = 10000;

  const sendXhrRequest = (method, onLoad, onError, data = null) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;

      switch (xhr.status) {
        case 200:
          if (method === `GET`) {
            onLoad(xhr.response);
          } else {
            onLoad();
          }
          break;
        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 403:
          error = `Доступ запрещен`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;
        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (method === `GET`) {
      xhr.open(method, url.GET);
    } else if (method === `POST`) {
      xhr.open(method, url.POST);
    }

    xhr.send(data);
  };

  const load = (onLoad, onError) => {
    sendXhrRequest(`GET`, onLoad, onError);
  };

  const save = (onLoad, onError, data) => {
    sendXhrRequest(`POST`, onLoad, onError, data);
  };

  window.backend = {
    load,
    save,
  };
})();
