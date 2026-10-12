import { useEffect, useRef, useState } from "react";
import { wedding } from "../data/wedding.js";
import { weddingDate, formatNumericDate } from "../utils/date.js";
import { Divider, Sprig } from "./Ornaments.jsx";

// Timings (ms) — keep in sync with the transitions in wedding.css (.envelope-screen)
const REVEAL_AT = 2000; // site starts appearing behind the fading envelope
const DONE_AT = 2900; // envelope screen is removed
const REDUCED = { reveal: 50, done: 450 };

const { partnerOne, partnerTwo } = wedding.couple;
const initials = [partnerOne, partnerTwo].map((n) => n.trim().charAt(0).toUpperCase());

// The sealed invitation shown before the website.
// onOpen  -> called immediately on tap (start music here)
// onReveal -> the website should begin its entrance animation
// onDone  -> the envelope can be removed
export default function Envelope({ onOpen, onReveal, onDone }) {
  const [opening, setOpening] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    timers.current.push(setTimeout(onReveal, reduced ? REDUCED.reveal : REVEAL_AT));
    timers.current.push(setTimeout(onDone, reduced ? REDUCED.done : DONE_AT));
  };

  const { label, buttonText } = wedding.envelope;

  return (
    <div className={`envelope-screen ${opening ? "is-opening" : ""}`}>
      <Sprig className="envelope-screen__corner envelope-screen__corner--tl" />
      <Sprig className="envelope-screen__corner envelope-screen__corner--br" />

      <div className="envelope-screen__inner">
        {label && <p className="eyebrow envelope-screen__label">{label}</p>}

        {/* One large tap target: envelope, names and "open" text */}
        <button
          type="button"
          className="envelope-button"
          onClick={open}
          aria-label={`${buttonText} — ${partnerOne} & ${partnerTwo}`}
        >
          <span className="envelope" aria-hidden="true">
            <span className="envelope__back" />

            <span className="envelope__card">
              <span className="envelope__card-names">
                {partnerOne} <em>&amp;</em> {partnerTwo}
              </span>
              <Divider />
              {weddingDate && <span className="envelope__card-date">{formatNumericDate(weddingDate)}</span>}
            </span>

            <span className="envelope__pocket" />
            <span className="envelope__flap" />

            <span className="envelope__seal">
              {initials[0]}
              <em>&amp;</em>
              {initials[1]}
            </span>
          </span>

          <span className="envelope-screen__names" aria-hidden="true">
            {partnerOne} <em>&amp;</em> {partnerTwo}
          </span>

          <span className="envelope-screen__cta" aria-hidden="true">
            {buttonText}
          </span>
        </button>
      </div>
    </div>
  );
}
