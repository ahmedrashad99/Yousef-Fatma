import { CalendarDays, Clock, MapPin, Shirt } from "lucide-react";
import { wedding } from "../data/wedding.js";
import { weddingDate, parseDate, formatLongDate } from "../utils/date.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { Sprig } from "./Ornaments.jsx";

// Uses the configured Google Maps link, or builds a search link from the address.
function directionsUrl({ mapsUrl, venue, address }) {
  if (mapsUrl) return mapsUrl;
  const query = [venue, address].filter(Boolean).join(", ");
  return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : "";
}

function EventCard({ title, date, time, venue, address, mapsUrl, delay }) {
  const link = directionsUrl({ mapsUrl, venue, address });

  return (
    <Reveal as="article" className="event-card" delay={delay}>
      <Sprig className="event-card__sprig" />
      <h3 className="event-card__title">{title}</h3>

      <ul className="event-card__list">
        {date && (
          <li>
            <CalendarDays aria-hidden="true" />
            <span>{formatLongDate(date)}</span>
          </li>
        )}
        {time && (
          <li>
            <Clock aria-hidden="true" />
            <span>{time}</span>
          </li>
        )}
        {(venue || address) && (
          <li>
            <MapPin aria-hidden="true" />
            <span>
              {venue && <strong>{venue}</strong>}
              {address && <span className="event-card__address">{address}</span>}
            </span>
          </li>
        )}
      </ul>

      {link && (venue || address) && (
        <a className="btn btn--outline" href={link} target="_blank" rel="noopener noreferrer">
          Get Directions
          <span className="visually-hidden"> to {venue || address} (opens in a new tab)</span>
        </a>
      )}
    </Reveal>
  );
}

export default function WeddingDetails() {
  const { event, features, headings } = wedding;
  const { ceremony, reception } = event;

  const showReception = Boolean(reception.time || reception.venue);
  const receptionDate = parseDate(reception.date) || weddingDate;
  const showDressCode = features.dressCode && event.dressCode;

  return (
    <section className="section details" aria-labelledby="details-title">
      <div className="container">
        <SectionHeading label={headings.details.label} title={headings.details.title} id="details-title" />

        <div className={`details__grid ${showReception ? "" : "details__grid--single"}`}>
          <EventCard {...ceremony} date={weddingDate} />
          {showReception && <EventCard {...reception} date={receptionDate} delay={120} />}
        </div>

        {showDressCode && (
          <Reveal as="p" className="details__dress" delay={200}>
            <Shirt aria-hidden="true" />
            <span>
              <span className="eyebrow">Dress code</span>
              {event.dressCode}
            </span>
          </Reveal>
        )}
      </div>
    </section>
  );
}
