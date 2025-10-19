import { useCallback, useEffect, useRef, useState } from "react";
import NotebookSheet from "@/components/NotebookSheet";
import styles from "@/styles/Home.module.css";

export default function Notebook({ pages }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [turnDir, setTurnDir] = useState(0); 
  const containerRef = useRef(null);

  useEffect(() => {
    const lineHeightPx = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--line-height"
      )
    );
    const topPadStr = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--page-top-padding");
    const topPad = parseFloat(topPadStr || "56");
    const offset =
      topPad % lineHeightPx ? lineHeightPx - (topPad % lineHeightPx) : 0;
    document.documentElement.style.setProperty(
      "--baseline-offset",
      `${offset}px`
    );
  }, []);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < pages.length - 1;

  const go = useCallback(
    (dir) => {
      if (animating) return;
      if (dir === -1 && !canGoPrev) return;
      if (dir === 1 && !canGoNext) return;
      setTurnDir(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((i) => i + dir);
        setAnimating(false);
        setTurnDir(0);
      }, 500);
    },
    [animating, canGoPrev, canGoNext]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    let isTouching = false;
    const onStart = (e) => {
      isTouching = true;
      const t = e.touches ? e.touches[0] : e;
      startX = t.clientX;
      startY = t.clientY;
    };
    const onMove = (e) => {
      if (!isTouching) return;
      const t = e.touches ? e.touches[0] : e;
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dy) < 30) {
        go(dx < 0 ? 1 : -1);
        isTouching = false;
      }
    };
    const onEnd = () => {
      isTouching = false;
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [go]);

  const pageClass = (index) => {
    const base = "notebook-page";
    if (!animating) {
      return index === currentIndex
        ? `${base} page-active`
        : `${base} page-hidden`;
    }
    if (turnDir === 1) {
      if (index === currentIndex)
        return `${base} page-active ${styles.originLeft} ${styles.turnNextExit}`;
      if (index === currentIndex + 1)
        return `${base} page-active ${styles.originRight} ${styles.turnNextEnter}`;
      return `${base} page-hidden`;
    }
    if (turnDir === -1) {
      if (index === currentIndex)
        return `${base} page-active ${styles.originRight} ${styles.turnPrevExit}`;
      if (index === currentIndex - 1)
        return `${base} page-active ${styles.originLeft} ${styles.turnPrevEnter}`;
      return `${base} page-hidden`;
    }
    return `${base} page-hidden`;
  };

  return (
    <div
      className={`notebook-viewport mobile-only ${
        pages[currentIndex]?.variant === "cover" ? "on-cover" : ""
      }`}
      ref={containerRef}
    >
      <div className="notebook-pages">
        {pages.map((p, idx) => (
          <section
            key={p.id}
            aria-hidden={idx !== currentIndex}
            className={`${pageClass(idx)} ${
              p.variant === "cover" ? "notebook-cover" : ""
            }`}
            style={{ zIndex: pages.length - idx }}
          >
            {p.variant === "cover" ? (
              p.content
            ) : (
              <NotebookSheet>{p.content}</NotebookSheet>
            )}
          </section>
        ))}
      </div>

      {canGoPrev && (
        <button
          aria-label="Previous page"
          className="pager-arrow pager-arrow-left"
          onClick={() => go(-1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      {canGoNext && (
        <button
          aria-label="Next page"
          className="pager-arrow pager-arrow-right"
          onClick={() => go(1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
