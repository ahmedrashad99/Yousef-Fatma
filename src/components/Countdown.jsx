import { wedding } from "../data/wedding.js";
import { weddingDate, formatLongDate } from "../utils/date.js";
import { useCountdown } from "../hooks/useCountdown.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function Countdown() {
  const timeLeft = useCountdown(weddingDate);
  if (!timeLeft) return null; // invalid date in wedding.js — hide quietly

  const { label, title } = wedding.headings.countdown;

  return (
    <section className="section countdown" aria-labelledby="countdown-title">
      <div className="container">
        <SectionHeading label={label} title={title} id="countdown-title" />

        {timeLeft.isPast ? (
          <Reveal as="p" className="countdown__done">
            {wedding.content.countdownFinished}
          </Reveal>
        ) : (
          <Reveal className="countdown__grid" role="timer" aria-label={`Time until ${formatLongDate(weddingDate)}`}>
            {units.map(({ key, label: unitLabel }) => (
              <div className="countdown__unit" key={key}>
                <span className="countdown__value">{String(timeLeft[key]).padStart(2, "0")}</span>
                <span className="countdown__label">{unitLabel}</span>
              </div>
            ))}
          </Reveal>
        )}

        <Reveal as="p" className="countdown__date" delay={150}>
          {formatLongDate(weddingDate)}
        </Reveal>
      </div>
    </section>
  );
}
