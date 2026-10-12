import { useEffect, useState } from "react";
import { wedding } from "../data/wedding.js";
import { Sprig } from "./Ornaments.jsx";

const { partnerOne, partnerTwo } = wedding.couple;
const initials = [partnerOne, partnerTwo].map((name) => name.trim().charAt(0).toUpperCase());

// Shows a photo, or an elegant monogram placeholder when the file is missing.
export default function Photo({ src, alt, className = "", eager = false }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => setFailed(!src), [src]);

  if (failed) {
    return (
      <div className={`photo photo--placeholder ${className}`} role="img" aria-label={alt}>
        <Sprig className="photo__sprig photo__sprig--top" />
        <span className="photo__monogram" aria-hidden="true">
          {initials[0]}
          <em>&amp;</em>
          {initials[1]}
        </span>
        {wedding.settings.showPhotoHints && (
          <span className="photo__hint" aria-hidden="true">
            Add photo
            <code>{src ? `public${src}` : "set path in wedding.js"}</code>
          </span>
        )}
        <Sprig className="photo__sprig photo__sprig--bottom" />
      </div>
    );
  }

  return (
    <img
      className={`photo ${className}`}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
