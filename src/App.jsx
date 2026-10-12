import { useEffect, useRef, useState } from "react";
import { wedding } from "./data/wedding.js";
import { playWithFade } from "./utils/music.js";
import Envelope from "./components/Envelope.jsx";
import MusicToggle from "./components/MusicToggle.jsx";
import FallingLeaves from "./components/FallingLeaves.jsx";
import Hero from "./components/Hero.jsx";
import Countdown from "./components/Countdown.jsx";
import OurStory from "./components/OurStory.jsx";
import WeddingDetails from "./components/WeddingDetails.jsx";
import Gallery from "./components/Gallery.jsx";
import RSVP from "./components/RSVP.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const { couple, features, music } = wedding;

  // "sealed" -> envelope waiting for a tap
  // "opening" -> envelope animating open
  // "revealing" -> website appearing behind the fading envelope
  // "open" -> envelope gone
  const [stage, setStage] = useState(features.envelope ? "sealed" : "open");
  const audioRef = useRef(null);
  const isLocked = stage === "sealed" || stage === "opening";

  useEffect(() => {
    document.title = `${couple.partnerOne} & ${couple.partnerTwo} — Wedding Invitation`;
  }, [couple.partnerOne, couple.partnerTwo]);

  // No scrolling behind the envelope
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";
  }, [isLocked]);

  const handleOpen = () => {
    if (music.enabled) playWithFade(audioRef.current, music.volume);
    setStage("opening");
  };

  const handleReveal = () => {
    window.scrollTo(0, 0);
    setStage("revealing");
  };

  // Section order on the page. Optional sections follow the switches in
  // `features` (src/data/wedding.js). Backgrounds alternate automatically.
  return (
    <>
      {stage !== "open" && <Envelope onOpen={handleOpen} onReveal={handleReveal} onDone={() => setStage("open")} />}

      <div className={`site ${isLocked ? "" : "is-open"}`} inert={isLocked}>
        <main>
          <Hero />
          {features.countdown && <Countdown />}
          {features.story && <OurStory />}
          <WeddingDetails />
          {features.gallery && <Gallery />}
          {features.rsvp && <RSVP />}
        </main>
        <Footer />
      </div>

      <FallingLeaves />
      <MusicToggle audioRef={audioRef} showButton={!isLocked} />
    </>
  );
}
