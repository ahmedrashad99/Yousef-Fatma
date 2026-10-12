import { wedding } from "../data/wedding.js";

/* ==========================================================================
   RSVP SERVICE
   The form calls `submitRsvp(response)` and only cares about the result:

     { status: "saved" }          -> the reply was really stored
     { status: "not-connected" }  -> no backend yet, the reply was NOT stored
     throws an Error              -> something went wrong, guest can retry

   `response` looks like:
     { name, attending: true|false, guests, message, submittedAt }

   TO CONNECT A BACKEND LATER, change only this function. Examples:
   • Any HTTP endpoint (Google Apps Script, Formspree, your own API):
       set `rsvp.endpoint` in src/data/wedding.js — the code below already POSTs JSON.
   • Firebase Firestore:
       import { addDoc, collection } from "firebase/firestore";
       await addDoc(collection(db, "rsvps"), response);
       return { status: "saved" };
   ========================================================================== */

export async function submitRsvp(response) {
  const { endpoint } = wedding.rsvp;

  if (!endpoint) {
    // Honest preview mode: nothing is stored anywhere.
    return { status: "not-connected" };
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  });

  if (!res.ok) {
    throw new Error(`RSVP request failed with status ${res.status}`);
  }

  return { status: "saved" };
}
