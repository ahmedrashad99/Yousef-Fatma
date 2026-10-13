/* ==========================================================================
   WEDDING DETAILS — THE ONLY FILE YOU NEED TO EDIT
   ==========================================================================

   Everything shown on the website comes from this file: names, dates,
   venues, texts, photos and which sections are visible.

   Quick rules:
   • Text goes inside quotes: "like this".
   • To hide an optional detail, leave it empty: ""
   • To hide a whole section, set its switch in `features` to false.
   • Save the file — the browser updates automatically while `npm run dev` runs.
   ========================================================================== */

export const wedding = {
  /* ------------------------------------------------------------------------
     THE COUPLE
     Changing these updates the opening, closing, photo placeholders,
     browser tab title — everywhere.
     ------------------------------------------------------------------------ */
  couple: {
    partnerOne: "Yousef",
    partnerTwo: "Fatma",
  },

  /* ------------------------------------------------------------------------
     THE DAY
     `date` drives the countdown and every date shown on the page.
     Format: "YYYY-MM-DDTHH:MM:SS" in the venue's local time (24-hour clock).
     Example: 20 June 2027 at 6 PM  ->  "2027-06-20T18:00:00"
     ------------------------------------------------------------------------ */
  event: {
    date: "2026-10-22T20:00:00",

    // Language/region used to write dates, e.g. "en-US" -> "Sunday, June 20, 2027",
    // "en-GB" -> "Sunday 20 June 2027".
    locale: "en-US",

    ceremony: {
      title: "The Ceremony",
      time: "8:00 PM",
      venue: "Kenoz Hall",
      address: "Corniche El Nile, Maadi, Dar El Mohimmat Club – El Lo’loa Hotel",
      // Paste a Google Maps share link here. If left empty, a map search
      // for the address above is used automatically.
      mapsUrl: "https://www.google.com/maps?q=29.9506167,31.2622367&z=17&hl=en",
    },

    // Leave `time` AND `venue` empty ("") to hide the reception card.
    // Leave `date` empty if the reception is on the same day as the ceremony.
    // Leave `venue`/`address` empty if it's at the same place as the ceremony.
    reception: {
      title: "The Reception",
      date: "",
      time: "8:00 PM",
      venue: "",
      address: "",
      mapsUrl: "https://www.google.com/maps?q=29.9506167,31.2622367&z=17&hl=en",
    },

    // Shown only when `features.dressCode` is true AND this is not empty.
    dressCode: "Formal attire",
  },

  /* ------------------------------------------------------------------------
     TEXTS
     ------------------------------------------------------------------------ */
  content: {
    preHeading: "Together with their families",
    invitation: "Joyfully invite you to celebrate their Engagement",

    // One string per paragraph. Add or remove lines freely.
    // ✏️ Placeholder text — replace with the couple's real story.
    story: [
      "Every love story is beautiful, but this one is ours. What began as a simple hello slowly became a friendship, then a promise, and now a lifetime we are about to begin together.",
      "We are so grateful for the family and friends who have walked beside us, and we would be honoured to have you with us as we say yes to forever.",
    ],

    countdownFinished: "Our forever has begun — thank you for celebrating with us.",
    closingMessage: "We can't wait to celebrate with you",
    footerNote: "Thank you for being part of our story.",
  },

  /* ------------------------------------------------------------------------
     SECTION HEADINGS
     The small gold label and the large title above each section.
     ------------------------------------------------------------------------ */
  headings: {
    countdown: { label: "Save the date", title: "Counting the moments" },
    story: { label: "Our story", title: "Two hearts, one journey" },
    details: { label: "The celebration", title: "Wedding details" },
    gallery: { label: "Moments", title: "Our gallery" },
    rsvp: { label: "Kindly reply", title: "Will you join us?" },
  },

  /* ------------------------------------------------------------------------
     PHOTOS
     Put image files in the `public/images` folder, then write their path
     here WITHOUT the word "public" — e.g. public/images/couple.jpg
     becomes "/images/couple.jpg".

     Missing photos show an elegant placeholder, so nothing breaks.

     GALLERY: to add a photo, copy one { ... } block and change it.
              to remove one, delete its { ... } block (including the comma).
              `alt` describes the photo for screen readers — keep it meaningful.
     ------------------------------------------------------------------------ */
  images: {
    hero: "/images/Ezz.jpg",
  },

  /* ------------------------------------------------------------------------
     RSVP
     ------------------------------------------------------------------------ */
  rsvp: {
    // Shown as "Kindly respond by …". Format "YYYY-MM-DD", or "" to hide.
    deadline: "2027-05-20",

    // Ask how many guests are coming (only when the guest accepts).
    allowGuestCount: true,
    maxGuests: 4,

    acceptLabel: "Joyfully accepts",
    declineLabel: "Regretfully declines",

    // Where responses are sent. Leave "" until a backend exists — the form
    // will then clearly tell guests their reply was NOT sent.
    // See src/services/rsvpService.js to connect Firebase or another service.
    endpoint: "",

    // Shown when online RSVP isn't connected, so guests know how to reply.
    // e.g. "Please reply to Ahmed on +20 100 000 0000". Leave "" to hide.
    fallbackContact: "",
  },

  /* ------------------------------------------------------------------------
     SECTION SWITCHES — true = show, false = hide
     ------------------------------------------------------------------------ */
  features: {
    envelope: true, // the sealed invitation card shown before the site opens
    countdown: true,
    story: true,
    gallery: false,
    rsvp: false,
    dressCode: false,
  },

  /* ------------------------------------------------------------------------
     OPENING ENVELOPE
     The first screen guests see. Tapping it opens the invitation
     (and starts the music, if enabled).
     ------------------------------------------------------------------------ */
  envelope: {
    label: "You are cordially invited",
    buttonText: "Open the invitation",
  },

  /* ------------------------------------------------------------------------
     BACKGROUND MUSIC
     Starts when the guest opens the envelope (browsers only allow sound
     after a tap/click). A small floating button lets guests mute it.

     Put your audio file in the `public/music` folder, e.g.
     public/music/wedding-song.mp3  ->  src: "/music/wedding-song.mp3"
     Use an .mp3 (works on every phone), ideally under ~5 MB.
     ------------------------------------------------------------------------ */
  music: {
    enabled: true,
    src: "/music/Ellila.mp3",
    volume: 0.6, // 0 = silent, 1 = full volume
    loop: true,
  },

  /* ------------------------------------------------------------------------
     ANIMATED EFFECTS
     Soft champagne-gold leaves and petals drifting down the page.
     Automatically switched off for guests who ask their phone for less motion.
     ------------------------------------------------------------------------ */
  effects: {
    fallingLeaves: true, // false = no leaves
    leafCount: 14, // how many on large screens (phones show at most 8)
  },

  /* ------------------------------------------------------------------------
     SITE SETTINGS
     ------------------------------------------------------------------------ */
  settings: {
    // Shows "add photo: public/images/…" on photo placeholders.
    // Set to false before sharing the site if some photos are intentionally missing.
    showPhotoHints: true,
  },
};
