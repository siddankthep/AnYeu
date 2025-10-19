import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Yes/No checklist where clicking No makes it jump to a random screen position.
 *
 * Props:
 * - onYes?: () => void  // called when Yes is checked
 * - onNo?: () => void   // called when No is checked (before it jumps)
 */
export default function YesNoChase({ onYes, onNo }) {
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);
  const [noPos, setNoPos] = useState({ top: 0, left: 0 });
  const [celebrate, setCelebrate] = useState(false);
  const noRef = useRef(null);

  // Place the No chip initially just below center, stacked under Yes
  useEffect(() => {
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    const el = noRef.current;
    const w = el ? el.offsetWidth : 120;
    const h = el ? el.offsetHeight : 44;
    const left = Math.floor((vw - w) / 2);
    const top = Math.floor(vh * 0.58 - h / 2);
    setNoPos({ top, left });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jumpNo = useCallback((reason) => {
    const margin = 12; // keep away from edges
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    const el = noRef.current;
    const w = el ? el.offsetWidth : 120;
    const h = el ? el.offsetHeight : 44;
    // Random position within the viewport, respecting margins and element size
    const maxLeft = Math.max(margin, vw - w - margin);
    const maxTop = Math.max(margin, vh - h - margin);
    const left = Math.floor(margin + Math.random() * (maxLeft - margin));
    const top = Math.floor(margin + Math.random() * (maxTop - margin));
    setNoPos({ top, left });
  }, []);

  const onClickYes = useCallback(() => {
    setYesChecked(true);
    setNoChecked(false);
    if (typeof onYes === "function") onYes();
    setCelebrate(true);
    launchConfetti(1800);
  }, [onYes]);

  const onClickNo = useCallback(() => {
    setNoChecked(true);
    if (typeof onNo === "function") onNo();
    requestAnimationFrame(() => {
      jumpNo("click");
      setNoChecked(false);
    });
  }, [onNo, jumpNo]);

  return (
    <div style={{ position: "relative", width: "100%", height: 0 }}>
      {/* Yes tile */}
      {!celebrate && (
        <label
          style={{
            position: "fixed",
            left: "50%",
            top: "60%",
            transform: "translate(-50%, -50%)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 12px",
            background: "#fff",
            color: "#000",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 10,
            boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
            zIndex: 20,
          }}
        >
          <input
            type="checkbox"
            checked={yesChecked}
            onChange={onClickYes}
            style={{ width: 18, height: 18 }}
          />
          <span style={{ fontSize: 16, fontWeight: 600 }}>Yes</span>
        </label>
      )}

      {/* No tile - jumps around */}
      {!celebrate && (
        <label
          ref={noRef}
          style={{
            position: "fixed",
            left: noPos.left,
            top: noPos.top,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 12px",
            background: "#fff",
            color: "#000",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 10,
            boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
            transition: "left 140ms ease, top 140ms ease",
            zIndex: 21,
            touchAction: "none",
          }}
          onClick={(e) => {
            e.preventDefault();
            onClickNo();
          }}
        >
          <input
            type="checkbox"
            checked={noChecked}
            onChange={() => {}}
            readOnly
            style={{ width: 18, height: 18 }}
          />
          <span style={{ fontSize: 16, fontWeight: 600 }}>No</span>
        </label>
      )}
    </div>
  );
}

// Lightweight confetti without external deps
function launchConfetti(durationMs = 1500) {
  if (typeof window === "undefined") return;
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.zIndex = "9999";
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const colors = [
    "#ff7961",
    "#6ec6ff",
    "#ffcc80",
    "#b39ddb",
    "#80cbc4",
    "#ffd54f",
  ];
  const count = Math.min(
    180,
    Math.floor((canvas.width * canvas.height) / 16000)
  );
  const particles = Array.from({ length: count }).map(() => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.2,
    r: 4 + Math.random() * 6,
    c: colors[Math.floor(Math.random() * colors.length)],
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 3,
    a: Math.random() * Math.PI * 2,
    spin: -0.2 + Math.random() * 0.4,
  }));

  let start = performance.now();
  const tick = (t) => {
    const elapsed = t - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.a += p.spin;
      p.vy += 0.02; // gravity
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
      ctx.restore();
    });
    if (elapsed < durationMs) {
      requestAnimationFrame(tick);
    } else {
      window.removeEventListener("resize", resize);
      document.body.removeChild(canvas);
    }
  };
  requestAnimationFrame(tick);
}
