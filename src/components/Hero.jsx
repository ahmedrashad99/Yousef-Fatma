import { wedding } from "../data/wedding.js";
import { weddingDate, formatWeekday, formatDate } from "../utils/date.js";
import Photo from "./Photo.jsx";
import { Divider, Sprig } from "./Ornaments.jsx";

// Smoothly scrolls to whichever section comes right after the hero.
function scrollToNext(e) {
  const next = e.currentTarget.closest("section")?.nextElementSibling;
  if (!next) return;
  e.preventDefault();
  next.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { couple, content, images, event } = wedding;
  const coupleNames = `${couple.partnerOne} & ${couple.partnerTwo}`;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Sprig className="hero__corner hero__corner--tl" />
      <Sprig className="hero__corner hero__corner--br" />

      <div className="hero__inner container">
        <div className="hero__text">
          {content.preHeading && <p className="eyebrow enter enter--1">{content.preHeading}</p>}

          <h1 className="hero__names enter enter--2" id="hero-title" aria-label={coupleNames}>
            <span>{couple.partnerOne}</span>
            <span className="hero__amp" aria-hidden="true">&amp;</span>
            <span>{couple.partnerTwo}</span>
          </h1>

          {content.invitation && <p className="hero__invite enter enter--3">{content.invitation}</p>}

          <Divider className="enter enter--3" />

          {weddingDate && (
            <p className="hero__date enter enter--4">
              <span>{formatWeekday(weddingDate)}</span>
              <span className="hero__date-main">{formatDate(weddingDate)}</span>
              {event.ceremony.time && <span>{event.ceremony.time}</span>}
            </p>
          )}
        </div>

        <div className="hero__media enter enter--photo">
          <div className="arch-frame">
            <Photo
              src={images.hero}
              alt={`${couple.partnerOne} and ${couple.partnerTwo}`}
              className="arch"
              eager
            />
          </div>
        </div>
      </div>

      <a className="scroll-cue enter enter--5" href="#details-title" onClick={scrollToNext}>
        <span>Scroll</span>
        <span className="scroll-cue__line" aria-hidden="true" />
      </a>
    </section>
  );
}
