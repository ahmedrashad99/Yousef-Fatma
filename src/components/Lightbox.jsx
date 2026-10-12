import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Photo from "./Photo.jsx";

// Full-screen photo viewer: close with Esc / ✕ / backdrop, browse with
// arrow keys, the on-screen arrows, or a swipe on touch screens.
export default function Lightbox({ photos, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const touchStartX = useRef(null);
  const count = photos.length;
  const photo = photos[index];

  // Functional update so rapid key presses never use a stale index.
  const go = (step) => onChange((i) => (i + step + count) % count);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && count > 1) onChange((i) => (i + 1) % count);
      else if (e.key === "ArrowLeft" && count > 1) onChange((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, onChange, onClose]);

  // Keep keyboard focus inside the dialog.
  const trapFocus = (e) => {
    if (e.key !== "Tab") return;
    const focusable = e.currentTarget.querySelectorAll("button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null || count < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}`}
      onKeyDown={trapFocus}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close">
        <X />
      </button>

      {count > 1 && (
        <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Previous photo">
          <ChevronLeft />
        </button>
      )}

      <figure className="lightbox__figure" key={photo.src + index}>
        <Photo src={photo.src} alt={photo.alt || ""} className="lightbox__img" eager />
        <figcaption>
          {photo.alt && <span>{photo.alt}</span>}
          <span className="lightbox__count">
            {index + 1} / {count}
          </span>
        </figcaption>
      </figure>

      {count > 1 && (
        <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Next photo">
          <ChevronRight />
        </button>
      )}
    </div>,
    document.body
  );
}
