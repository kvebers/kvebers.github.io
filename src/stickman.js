const MESSAGES = ["CLICK!", "OPEN IT!", "LOOK HERE!", "CHECK THIS!"];
const PEEK_FRAMES = 340;
const JUMP_FRAMES = 80;
const S = 1.1;

const HEAD_R = 8 * S;
const SHOULDER_Y = -4 * S;
const HEAD_CY = SHOULDER_Y - HEAD_R - 2 * S; // local y of head center
const HIP_Y = 20 * S;
const ARM_Y = SHOULDER_Y + 2 * S;
const ARM_LEN = 13 * S;
const LEG_LEN = 14 * S;

// ── helpers ─────────────────────────────────────────────────────────────────

function bounds(card, canvas) {
  const cr = card.getBoundingClientRect();
  const cv = canvas.getBoundingClientRect();
  return {
    left: cr.left - cv.left,
    top: cr.top - cv.top,
    right: cr.right - cv.left,
    bottom: cr.bottom - cv.top,
    width: cr.width,
    height: cr.height,
  };
}

// Convert local (0, ly) → screen, given anchor (ax,ay) and rotation angle
function toScreen(ax, ay, angle, ly) {
  return {
    x: ax - ly * Math.sin(angle),
    y: ay + ly * Math.cos(angle),
  };
}

function randomPeek(card, canvas) {
  const b = bounds(card, canvas);
  const side = ["top", "left", "right"][Math.floor(Math.random() * 3)];
  const tilt = (Math.random() - 0.5) * 0.3;

  if (side === "top") {
    return {
      x: b.left + b.width * (0.25 + Math.random() * 0.5),
      y: b.top,
      angle: tilt,
    };
  } else if (side === "left") {
    return {
      x: b.left,
      y: b.top + b.height * (0.12 + Math.random() * 0.25),
      angle: -Math.PI / 2 + tilt,
    };
  } else {
    return {
      x: b.right,
      y: b.top + b.height * (0.12 + Math.random() * 0.25),
      angle: Math.PI / 2 + tilt,
    };
  }
}

// ── drawing ──────────────────────────────────────────────────────────────────

function drawBubble(ctx, headX, headY, text) {
  ctx.save();
  ctx.font = "bold 11px Arial, sans-serif";
  const pad = 7;
  const bw = ctx.measureText(text).width + pad * 2;
  const bh = 20;
  const bx = headX - bw / 2;
  const by = headY - bh - HEAD_R - 10;

  ctx.fillStyle = "#d90452";
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 4);
  ctx.fill();

  // tail toward head
  ctx.beginPath();
  ctx.moveTo(headX - 4, by + bh);
  ctx.lineTo(headX + 4, by + bh);
  ctx.lineTo(headX, by + bh + 6);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, headX, by + bh / 2);
  ctx.restore();
}

// Draw stickman in LOCAL coords (anchor = 0,0): body goes +y (into card), head goes -y (outside)
function drawPeeker(ctx, frame) {
  ctx.save();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.5 * S;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Head
  ctx.beginPath();
  ctx.arc(0, HEAD_CY, HEAD_R, 0, Math.PI * 2);
  ctx.stroke();

  // Body (spans outside → inside card)
  ctx.beginPath();
  ctx.moveTo(0, SHOULDER_Y);
  ctx.lineTo(0, HIP_Y);
  ctx.stroke();

  // Waving arms (both outside card in local -y region)
  const w1 = 0.3 + 0.55 * Math.abs(Math.sin(frame * 0.18));
  const w2 = 0.3 + 0.55 * Math.abs(Math.cos(frame * 0.22 + 1));
  ctx.beginPath();
  ctx.moveTo(0, ARM_Y);
  ctx.lineTo(-ARM_LEN, ARM_Y - ARM_LEN * w1);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, ARM_Y);
  ctx.lineTo(ARM_LEN, ARM_Y - ARM_LEN * w2);
  ctx.stroke();

  // Legs (inside card — will be clipped away)
  ctx.beginPath();
  ctx.moveTo(0, HIP_Y);
  ctx.lineTo(-8 * S, HIP_Y + LEG_LEN);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, HIP_Y);
  ctx.lineTo(8 * S, HIP_Y + LEG_LEN);
  ctx.stroke();

  ctx.restore();
}

function drawJumper(ctx, x, y) {
  const bodyLen = 18 * S;
  const hipY = 0;
  const shoulderY = -bodyLen;
  const headCY = shoulderY - HEAD_R - 2;
  const armY = shoulderY + 5 * S;

  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2.5 * S;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.arc(0, headCY, HEAD_R, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, shoulderY);
  ctx.lineTo(0, hipY);
  ctx.stroke();
  // arms up
  ctx.beginPath();
  ctx.moveTo(0, armY);
  ctx.lineTo(-ARM_LEN, armY - ARM_LEN * 0.9);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, armY);
  ctx.lineTo(ARM_LEN, armY - ARM_LEN * 0.9);
  ctx.stroke();
  // legs kicked back
  ctx.beginPath();
  ctx.moveTo(0, hipY);
  ctx.lineTo(-LEG_LEN * 0.8, hipY - LEG_LEN * 0.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, hipY);
  ctx.lineTo(LEG_LEN * 0.8, hipY - LEG_LEN * 0.5);
  ctx.stroke();

  ctx.restore();
}

// ── main export ──────────────────────────────────────────────────────────────

export function startStickman(canvas, getCards) {
  const ctx = canvas.getContext("2d");

  let frame = 0;
  let state = "peeking";
  let peekFrames = 0;
  let jumpProgress = 0;
  let currentIndex = 0;
  let peekPos = null; // { x, y, angle }
  let jumpFrom = null;
  let jumpTo = null;
  let message = MESSAGES[0];
  let animId;

  function syncSize() {
    const w = canvas.offsetWidth,
      h = canvas.offsetHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  function clipExcludeCard(card) {
    const b = bounds(card, canvas);
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.rect(b.left, b.top, b.width, b.height);
    ctx.clip("evenodd");
  }

  function pickNext(len, current) {
    if (len <= 1) return 0;
    let n;
    do {
      n = Math.floor(Math.random() * len);
    } while (n === current);
    return n;
  }

  function tick() {
    const cards = getCards();
    if (!cards.length) {
      animId = requestAnimationFrame(tick);
      return;
    }

    syncSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    if (!peekPos) peekPos = randomPeek(cards[currentIndex], canvas);

    if (state === "peeking") {
      peekFrames++;
      const { x, y, angle } = peekPos;
      const bob = Math.sin(frame * 0.1) * 2;
      const py = y + bob;

      // Clipped peek — body hidden inside card
      ctx.save();
      clipExcludeCard(cards[currentIndex]);
      ctx.translate(x, py);
      ctx.rotate(angle);
      drawPeeker(ctx, frame);
      ctx.restore();

      // Bubble above head (always in screen space, text stays horizontal)
      const head = toScreen(x, py, angle, HEAD_CY);
      drawBubble(ctx, head.x, head.y, message);

      if (peekFrames > PEEK_FRAMES) {
        peekFrames = 0;
        jumpFrom = { x, y: py };
        currentIndex = pickNext(cards.length, currentIndex);
        peekPos = randomPeek(cards[currentIndex], canvas);
        jumpTo = peekPos;
        message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        jumpProgress = 0;
        state = "jumping";
      }
    } else {
      jumpProgress += 1 / JUMP_FRAMES;
      if (jumpProgress >= 1) {
        jumpProgress = 1;
        state = "peeking";
      }

      const t = jumpProgress;
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const x = jumpFrom.x + (jumpTo.x - jumpFrom.x) * ease;
      const dist = Math.hypot(jumpTo.x - jumpFrom.x, jumpTo.y - jumpFrom.y);
      const arc = Math.min(dist * 0.6, 120) + 40;
      const y =
        jumpFrom.y +
        (jumpTo.y - jumpFrom.y) * ease -
        arc * Math.sin(Math.PI * t);

      drawJumper(ctx, x, y);
    }

    animId = requestAnimationFrame(tick);
  }

  tick();
  return () => cancelAnimationFrame(animId);
}
