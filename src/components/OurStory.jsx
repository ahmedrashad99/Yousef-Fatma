import { wedding } from "../data/wedding.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import Photo from "./Photo.jsx";

export default function OurStory() {
  const { content, images, couple, headings } = wedding;
  const paragraphs = [].concat(content.story || []).filter((p) => p && p.trim());
  if (paragraphs.length === 0 && !images.story) return null;

  return (
    <section className="section story" aria-labelledby="story-title">
      <div className="container">
        <SectionHeading label={headings.story.label} title={headings.story.title} id="story-title" />

        <div
          className={`story__layout ${!images.story ? "story__layout--text-only" : ""} ${
            paragraphs.length === 0 ? "story__layout--photo-only" : ""
          }`}
        >
          {images.story && (
            <Reveal className="story__media">
              <div className="offset-frame">
                <Photo src={images.story} alt={`${couple.partnerOne} and ${couple.partnerTwo} together`} />
              </div>
            </Reveal>
          )}

          {paragraphs.length > 0 && (
            <Reveal className="story__text" delay={120}>
              {paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "story__lead" : ""}>
                  {p}
                </p>
              ))}
              <p className="story__signature">
                {couple.partnerOne} <em>&amp;</em> {couple.partnerTwo}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
