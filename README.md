# Luxury Wedding Invitation

A romantic, mobile-first digital wedding invitation built with React + Vite.
**Everything you'll normally change lives in one file: `src/data/wedding.js`.**

## Run it

```bash
npm install      # first time only
npm run dev      # open the printed http://localhost:… link
npm run build    # production files in /dist (upload these to any static host)
```

## Customise

| I want to…                         | Edit                                                    |
| ---------------------------------- | ------------------------------------------------------- |
| Change the couple's names          | `couple` in `src/data/wedding.js`                       |
| Change the date / time             | `event.date` (`"YYYY-MM-DDTHH:MM:SS"`, 24-hour clock)  |
| Change venue, address, map link    | `event.ceremony` and `event.reception`                  |
| Change texts and section headings  | `content` and `headings`                                |
| Show / hide a section              | `features` (`true` / `false`)                           |
| Add / remove / replace photos      | Put files in `public/images/…`, list them in `images`  |
| RSVP deadline, guest count         | `rsvp`                                                  |
| Opening envelope text / on-off     | `envelope` and `features.envelope`                      |
| Background music                   | Put an .mp3 in `public/music/`, set `music.src`         |
| Colours and fonts                  | `:root` at the top of `src/styles/global.css`           |

Missing photos show an elegant monogram placeholder with the path where the file
should go. Set `settings.showPhotoHints: false` to hide those path hints.

## Project structure

```
src/
  data/wedding.js          ← all editable content
  components/              ← one file per section (Hero, Countdown, OurStory, …)
  services/rsvpService.js  ← the ONLY place to connect an RSVP backend
  utils/date.js            ← date formatting + countdown maths
  hooks/useCountdown.js
  styles/global.css        ← colours, fonts, buttons, animations
  styles/wedding.css       ← section styles (mobile-first)
public/images/             ← your photos (see README.txt inside)
```

## RSVP & backend

There is no backend yet. The form validates input and then tells the guest
honestly that their reply **was not sent**. To make it real, either set
`rsvp.endpoint` to a URL that accepts a JSON POST, or replace the body of
`submitRsvp()` in `src/services/rsvpService.js` (a Firebase example is in the
comments). The form itself does not need to change.
