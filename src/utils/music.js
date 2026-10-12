// Starts the background music with a gentle fade-in.
// Must be called from a click/tap handler — browsers block sound otherwise.
export function playWithFade(audio, targetVolume = 0.6, durationMs = 2500) {
  if (!audio) return;

  const target = Math.min(Math.max(targetVolume, 0), 1);
  audio.volume = 0;
  audio.play()?.catch(() => {
    // Missing file or blocked by the browser — the site keeps working silently.
  });

  const steps = 25;
  let step = 0;
  clearInterval(audio._fadeTimer);
  audio._fadeTimer = setInterval(() => {
    step += 1;
    audio.volume = Math.min(target, (target * step) / steps);
    if (step >= steps) clearInterval(audio._fadeTimer);
  }, durationMs / steps);
}
