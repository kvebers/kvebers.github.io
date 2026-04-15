export function startAnimation(canvas) {
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const ball = { x: 50, y: 50, r: 20, dx: 4, dy: 0 };

  let animId;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.r >= canvas.width || ball.x - ball.r <= 0) ball.dx *= -1;
    if (ball.y + ball.r >= canvas.height || ball.y - ball.r <= 0) ball.dy *= -1;

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "#d90452";
    ctx.fill();

    animId = requestAnimationFrame(draw);
  };
  draw();

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", resize);
  };
}
