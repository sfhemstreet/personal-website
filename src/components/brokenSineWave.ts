type Wave = {
  y: number;
  length: number;
  amplitude: number;
  speed: number;
};

type WaveOption = {
  sx: number;
  sy: number;
  width: number;
  getY: (i: number) => number;
};

window.addEventListener("load", initSineWave, false);

function initSineWave() {
  const canvas = document.getElementById(
    "broken-sine-wave"
  ) as HTMLCanvasElement;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
  };

  window.addEventListener("resize", resizeCanvas, false);

  canvas.width = window.innerWidth;
  canvas.height = 20;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.log("No canvas :(");
    return;
  }

  const wave: Wave = {
    y: window.innerHeight,
    length: 10,
    amplitude: 10,
    speed: 0.009,
  };

  let theta = 0;

  window.requestAnimationFrame(() => animation(canvas, ctx, wave, theta));
}

function animation(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  wave: Wave,
  theta: number
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const waveOption: WaveOption = {
    sx: 0,
    sy: 10,
    width: window.innerWidth,
    getY(i: number): number {
      return (
        this.sy +
        Math.sin(i * wave.length + theta) * wave.amplitude * Math.sin(theta)
      );
    },
  };

  plotSine(ctx, 0, waveOption);

  theta += wave.speed;
  window.requestAnimationFrame(() => animation(canvas, ctx, wave, theta));
}

function plotSine(
  ctx: CanvasRenderingContext2D,
  yOffset: number,
  opt: WaveOption
) {
  ctx.beginPath();
  ctx.moveTo(opt.sx + yOffset, opt.sy);
  ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
  ctx.lineWidth = 1;

  for (let i = opt.sx; i < opt.width; i++) {
    ctx.lineTo(i + yOffset, opt.getY(i));
  }
  ctx.stroke();
}
