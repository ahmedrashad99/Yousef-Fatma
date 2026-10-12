import { useState } from "react";
import { Expand } from "lucide-react";
import { wedding } from "../data/wedding.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import Photo from "./Photo.jsx";
import Lightbox from "./Lightbox.jsx";

export default function Gallery() {
  const photos = (wedding.images.gallery || []).filter((p) => p && p.src);
  const [openIndex, setOpenIndex] = useState(null);

  if (photos.length === 0) return null;
  const { label, title } = wedding.headings.gallery;

  return (
    <section className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading label={label} title={title} id="gallery-title" />

        <ul className="gallery__grid">
          {photos.map((photo, i) => (
            <Reveal as="li" key={photo.src + i} delay={(i % 3) * 90}>
              <button
                type="button"
                className="gallery__item"
                onClick={() => setOpenIndex(i)}
                aria-label={`View larger: ${photo.alt || `photo ${i + 1}`}`}
              >
                <Photo src={photo.src} alt={photo.alt || ""} />
                <span className="gallery__zoom" aria-hidden="true">
                  <Expand />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {openIndex !== null && (
        <Lightbox photos={photos} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}
