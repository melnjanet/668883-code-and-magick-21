"use strict";

const MAX_SATURATION = 96;
const MIN_SATURATION = 1;

const Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  GAP: 10
};

const CloudCoordinate = {
  INITIAL_X: 100,
  INITIAL_Y: 10
};

const Gap = {
  HORIZONTAL: 50,
  VERTICAL: 10,
  TOP: 25,
  LEFT: 10,
};

const CurrentPlayer = {
  BAR_COLOR: `rgba(255, 0, 0, 1)`,
  NAME: `Вы`
};

const BarSize = {
  MAX_HEIGHT: 150,
  WIDTH: 50
};

const BarCoordinate = {
  INITIAL_X: 120,
  INITIAL_Y: 240
};

const Font = {
  SIZE_PX: `16px`,
  FAMILY: `PT Mono`,
  COLOR: `#000`,
  SIZE: 15
};

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

window.renderStatistics = (ctx, players, times) => {
  const maxTime = Math.round(Math.max(...times));
  const gapBetweenBars = BarSize.WIDTH + Gap.HORIZONTAL;
  let currentBarX = BarCoordinate.INITIAL_X;

  renderCloud(
      ctx,
      CloudCoordinate.INITIAL_X + Cloud.GAP,
      CloudCoordinate.INITIAL_Y + Cloud.GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CloudCoordinate.INITIAL_X,
      CloudCoordinate.INITIAL_Y,
      `#fff`
  );

  ctx.font = `${Font.SIZE_PX} ${Font.FAMILY}`;
  ctx.fillStyle = Font.COLOR;
  ctx.textBaseline = `hanging`;
  ctx.fillText(
      `Ура вы победили!`,
      CloudCoordinate.INITIAL_X + Gap.LEFT,
      CloudCoordinate.INITIAL_Y + Gap.TOP);
  ctx.fillText(`Список результатов:`,
      CloudCoordinate.INITIAL_X + Gap.LEFT,
      CloudCoordinate.INITIAL_Y + Font.SIZE + Gap.TOP);

  for (let i = 0; i < players.length; i++) {
    const barHeight = Math.round((BarSize.MAX_HEIGHT * times[i]) / maxTime);
    const currentUserTimeY = Cloud.HEIGHT - barHeight - Gap.VERTICAL * 2 - Gap.TOP;

    ctx.fillStyle = Font.COLOR;
    ctx.fillText(
        players[i],
        currentBarX,
        BarCoordinate.INITIAL_Y + Gap.VERTICAL
    );
    ctx.fillText(
        Math.round(times[i]),
        currentBarX,
        currentUserTimeY
    );

    if (players[i] === CurrentPlayer.NAME) {
      ctx.fillStyle = CurrentPlayer.BAR_COLOR;
    } else {
      const saturation = Math.floor(Math.random(MIN_SATURATION) * MAX_SATURATION);
      ctx.fillStyle = `hsl(237, 74%, ${saturation}%)`;
    }

    ctx.fillRect(
        currentBarX,
        BarCoordinate.INITIAL_Y,
        BarSize.WIDTH,
        -barHeight
    );

    currentBarX += gapBetweenBars;
  }
};
