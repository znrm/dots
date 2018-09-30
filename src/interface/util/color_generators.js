export const sizeToRGBA = (size, alpha = 1) => {
  const rC = -(18 ** 4);
  const gC = -(15 ** 4);
  const bC = -(11 ** 4);

  const rExp = (size - 0.045) ** 4;
  const gExp = (size - 0.07) ** 4;
  const bExp = (size - 0.11) ** 4;

  const red = 255 * (rC * rExp + 1);
  const green = 255 * (gC * gExp + 1);
  const blue = 255 * (bC * bExp + 1);

  return `rgba(${red},${green},${blue},${alpha})`;
};

export const speedToHSL = vel => {
  const speed = vel.dot(vel);
  const hue = Math.min(120 * (speed * 1.5e4) + 240, 360);
  return `hsl(${hue},100%,50%)`;
};

export const directionToColor = ({ x }) => {
  if (x > 0) return 'blue';
  if (x < 0) return 'green';
  return 'grey';
};
