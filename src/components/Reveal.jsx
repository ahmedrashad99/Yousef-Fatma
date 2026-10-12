import { useEffect, useRef, useState } from "react";

// Fades its content up gently the first time it scrolls into view.
// The motion itself lives in CSS (.reveal) and is skipped for reduced-motion users.
//
// Content must never stay hidden, so besides IntersectionObserver this also
// checks the element's position on load, scroll and resize (some in-app
// browsers and background tabs don't deliver observer updates reliably).
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let observer = null;
    let done = false;

    const cleanup = () => {
      observer?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    const show = () => {
      if (done) return;
      done = true;
      setVisible(true);
      cleanup();
    };

    // Visible when its top enters the lower part of the screen,
    // or when it's already been scrolled past.
    function check() {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewportHeight * 0.92) show();
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) show();
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      observer.observe(el);
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return cleanup;
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
