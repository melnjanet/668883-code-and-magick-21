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
  SIZE: 15
};

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

const renderText = (ctx, text, x, y, color = `#000`) => {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

const renderBar = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = (ctx, players, times) => {
  const maxTime = Math.round(Math.max(...times));
  const gapBetweenBars = BarSize.WIDTH + Gap.HORIZONTAL;
  let currentBarX = BarCoordinate.INITIAL_X;
  ctx.font = `${Font.SIZE_PX} ${Font.FAMILY}`;
  ctx.textBaseline = `hanging`;

  renderCloud(ctx, CloudCoordinate.INITIAL_X + Cloud.GAP, CloudCoordinate.INITIAL_Y + Cloud.GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CloudCoordinate.INITIAL_X, CloudCoordinate.INITIAL_Y, `#fff`);
  renderText(ctx, `Ура вы победили!`, CloudCoordinate.INITIAL_X + Gap.LEFT, CloudCoordinate.INITIAL_Y + Gap.TOP);
  renderText(ctx, `Список результатов:`, CloudCoordinate.INITIAL_X + Gap.LEFT, CloudCoordinate.INITIAL_Y + Font.SIZE + Gap.TOP);

  for (let i = 0; i < players.length; i++) {
    const barHeight = Math.round((BarSize.MAX_HEIGHT * times[i]) / maxTime);
    const currentUserTimeY = Cloud.HEIGHT - barHeight - Gap.VERTICAL * 2 - Gap.TOP;
    const saturation = Math.floor(Math.random(MIN_SATURATION) * MAX_SATURATION);
    const barColor = players[i] === CurrentPlayer.NAME ? CurrentPlayer.BAR_COLOR : `hsl(237, 74%, ${saturation}%)`;

    renderText(ctx, players[i], currentBarX, BarCoordinate.INITIAL_Y + Gap.VERTICAL);
    renderText(ctx, Math.round(times[i]), currentBarX, currentUserTimeY);
    renderBar(ctx, currentBarX, BarCoordinate.INITIAL_Y, BarSize.WIDTH, -barHeight, barColor);

    currentBarX += gapBetweenBars;
  }
};
