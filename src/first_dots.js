const firstDots = (ctx, width, height) => {
  ctx.fillStyle = 'rgb(255,255,255,.5)';

  for (let i = 0; i < 100000; i += 1) {
    const x = Math.round(Math.random() * width);
    const y = Math.round(Math.random() * height);

    ctx.fillRect(x, y, 1, 1);
  }
};

export default firstDots;
