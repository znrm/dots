import firstDots from './first_dots';

document.addEventListener('DOMContentLoaded', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const canvas = document.querySelector('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.fillRect(0, 0, width, height);

  firstDots(ctx, width, height);
});
