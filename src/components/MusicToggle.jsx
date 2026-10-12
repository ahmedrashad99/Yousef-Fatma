import { useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { wedding } from "../data/wedding.js";
import { playWithFade } from "../utils/music.js";

// The <audio> element plus a small floating play/mute button.
// The button stays hidden if the music file can't be loaded.
export default function MusicToggle({ audioRef, showButton }) {
  const { music } = wedding;
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  if (!music.enabled || !music.src) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) playWithFade(audio, music.volume, 800);
    else audio.pause();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop={music.loop}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setUnavailable(true);
          console.warn(`[wedding.js] Music file not found: public${music.src}`);
        }}
      />

      {showButton && !unavailable && (
        <button
          type="button"
          className={`music-toggle ${playing ? "is-playing" : ""}`}
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          aria-pressed={playing}
        >
          {playing ? <Music aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
