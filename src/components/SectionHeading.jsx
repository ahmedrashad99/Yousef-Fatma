import Reveal from "./Reveal.jsx";
import { Divider } from "./Ornaments.jsx";

// Small gold label + large serif title + ornamental divider.
export default function SectionHeading({ label, title, id }) {
  return (
    <Reveal as="header" className="section-heading">
      {label && <p className="eyebrow">{label}</p>}
      {title && (
        <h2 className="section-title" id={id}>
          {title}
        </h2>
      )}
      <Divider />
    </Reveal>
  );
}
