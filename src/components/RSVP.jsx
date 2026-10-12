import { useRef, useState } from "react";
import { Check, AlertCircle, Info, Loader2 } from "lucide-react";
import { wedding } from "../data/wedding.js";
import { parseDate, formatDate } from "../utils/date.js";
import { submitRsvp } from "../services/rsvpService.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

const emptyForm = { name: "", attending: "", guests: "1", message: "" };
const MESSAGE_LIMIT = 500;

// Returns { fieldName: "error text" } — empty object means the form is valid.
function validate(form, settings) {
  const errors = {};
  const name = form.name.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Please enter your full name.";

  if (form.attending !== "yes" && form.attending !== "no") {
    errors.attending = "Please let us know if you can attend.";
  }

  if (form.attending === "yes" && settings.allowGuestCount) {
    const guests = Number(form.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > settings.maxGuests) {
      errors.guests = `Please choose between 1 and ${settings.maxGuests} guests.`;
    }
  }

  if (form.message.length > MESSAGE_LIMIT) {
    errors.message = `Please keep your message under ${MESSAGE_LIMIT} characters.`;
  }

  return errors;
}

export default function RSVP() {
  const settings = wedding.rsvp;
  const { label, title } = wedding.headings.rsvp;
  const deadline = parseDate(settings.deadline);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  // status: "idle" | "sending" | "saved" | "not-connected" | "error"
  const [status, setStatus] = useState("idle");
  const [submittedName, setSubmittedName] = useState("");
  const formRef = useRef(null);
  const resultRef = useRef(null);

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form, settings);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const attending = form.attending === "yes";
    const response = {
      name: form.name.trim(),
      attending,
      guests: attending ? (settings.allowGuestCount ? Number(form.guests) : 1) : 0,
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
    };

    setStatus("sending");
    try {
      const result = await submitRsvp(response);
      setSubmittedName(response.name);
      setStatus(result.status);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setForm(emptyForm);
  };

  const showResult = status === "saved" || status === "not-connected";
  const fieldProps = (name) => ({
    id: `rsvp-${name}`,
    name,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `rsvp-${name}-error` : undefined,
  });
  const errorText = (name) =>
    errors[name] ? (
      <p className="field__error" id={`rsvp-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <section className="section rsvp" aria-labelledby="rsvp-title">
      <div className="container container--narrow">
        <SectionHeading label={label} title={title} id="rsvp-title" />
        {deadline && <p className="rsvp__deadline">Kindly respond by {formatDate(deadline)}</p>}

        <Reveal className="rsvp__card">
          {showResult ? (
            <div className="rsvp__result" ref={resultRef} tabIndex={-1} role="status">
              {status === "saved" ? (
                <>
                  <span className="rsvp__icon">
                    <Check aria-hidden="true" />
                  </span>
                  <h3>Thank you, {submittedName}</h3>
                  <p>Your reply has been received. We look forward to celebrating with you.</p>
                </>
              ) : (
                <>
                  <span className="rsvp__icon rsvp__icon--info">
                    <Info aria-hidden="true" />
                  </span>
                  <h3>Thank you, {submittedName}</h3>
                  <p>
                    <strong>Your reply has not been sent yet.</strong> Online RSVP isn't connected for this
                    invitation at the moment.
                  </p>
                  {settings.fallbackContact && <p>{settings.fallbackContact}</p>}
                </>
              )}
              <button type="button" className="btn btn--text" onClick={reset}>
                Submit another reply
              </button>
            </div>
          ) : (
            <form ref={formRef} className="rsvp__form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="rsvp-name">Your name</label>
                <input
                  {...fieldProps("name")}
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Full name"
                />
                {errorText("name")}
              </div>

              <fieldset
                className="field"
                aria-invalid={errors.attending ? "true" : undefined}
                aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}
              >
                <legend>Will you attend?</legend>
                <div className="choice-group">
                  {[
                    { value: "yes", text: settings.acceptLabel },
                    { value: "no", text: settings.declineLabel },
                  ].map((opt) => (
                    <label key={opt.value} className={`choice ${form.attending === opt.value ? "is-selected" : ""}`}>
                      <input
                        type="radio"
                        name="attending"
                        value={opt.value}
                        checked={form.attending === opt.value}
                        onChange={update("attending")}
                      />
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>
                {errorText("attending")}
              </fieldset>

              {settings.allowGuestCount && form.attending === "yes" && (
                <div className="field field--appear">
                  <label htmlFor="rsvp-guests">Number of guests (including you)</label>
                  <select {...fieldProps("guests")} value={form.guests} onChange={update("guests")}>
                    {Array.from({ length: settings.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  {errorText("guests")}
                </div>
              )}

              <div className="field">
                <label htmlFor="rsvp-message">
                  Message for the couple <span className="field__optional">(optional)</span>
                </label>
                <textarea
                  {...fieldProps("message")}
                  rows={3}
                  maxLength={MESSAGE_LIMIT + 50}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Share your wishes…"
                />
                {errorText("message")}
              </div>

              {status === "error" && (
                <p className="rsvp__alert" role="alert">
                  <AlertCircle aria-hidden="true" />
                  Something went wrong and your reply wasn't sent. Please try again.
                </p>
              )}

              <button type="submit" className="btn btn--solid" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  "Send reply"
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
