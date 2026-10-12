import { wedding } from "../data/wedding.js";
import { weddingDate, formatNumericDate } from "../utils/date.js";
import Reveal from "./Reveal.jsx";
import { Divider, Sprig } from "./Ornaments.jsx";

// Closing message + small thank-you footer.
export default function Footer() {
  const { couple, content } = wedding;

  return (
    <footer className="closing">
      <Sprig className="closing__sprig closing__sprig--left" />
      <Sprig className="closing__sprig closing__sprig--right" />

      <Reveal className="closing__inner container">
        {content.closingMessage && <p className="eyebrow closing__message">{content.closingMessage}</p>}
        <p className="closing__names">
          {couple.partnerOne} <em>&amp;</em> {couple.partnerTwo}
        </p>
        <Divider />
        {weddingDate && <p className="closing__date">{formatNumericDate(weddingDate)}</p>}
      </Reveal>

      {content.footerNote && (
        <div className="footer-note">
          <p>{content.footerNote}</p>
        </div>
      )}
    </footer>
  );
}
