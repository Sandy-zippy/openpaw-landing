"use client";

import { siteConfig, STRIPE_PAYMENT_LINK } from "@/lib/siteConfig";
import { generateEventId, readFbp, readFbc, readUtm } from "@/lib/eventId";
import { trackLead } from "@/components/Tracking";

export type ReservationStage = "lp_hero" | "lp_vip_gate";

export type ReservationInput = {
  name: string;
  email: string;
  stage: ReservationStage;
};

export type ReservationResult =
  | { status: "redirecting" }
  | { status: "saved"; message: string }
  | { status: "error"; message: string };

// Cross-section draft so VIPGate can show the user the name/email they
// already submitted on Hero and skip straight to the payment button.
// sessionStorage so it clears on tab close.
const DRAFT_KEY = "openpaw_draft";

export type ReservationDraft = { name: string; email: string };

export const reservationDraft = {
  save(d: ReservationDraft) {
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch {}
  },
  read(): ReservationDraft | null {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      return raw ? (JSON.parse(raw) as ReservationDraft) : null;
    } catch { return null; }
  },
  clear() {
    try { sessionStorage.removeItem(DRAFT_KEY); } catch {}
  },
};

export function useReservation() {
  async function submit({ name, email, stage }: ReservationInput): Promise<ReservationResult> {
    if (!name || !email) {
      return { status: "error", message: "Add your name and email to continue." };
    }

    const eventId = generateEventId("Lead");
    const fbp = readFbp();
    const fbc = readFbc();
    const utm = readUtm();

    const payload = {
      event_name: "Lead",
      event_id: eventId,
      name,
      email,
      stage,
      source: siteConfig.domain,
      page_url: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      fbp,
      fbc,
      ...utm,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem("openpaw_user", JSON.stringify({
        name, email, lead_event_id: eventId, ts: Date.now(),
      }));
    } catch {}

    trackLead({ email, firstName: name, eventID: eventId });

    if (siteConfig.tracking.eventsWebhookUrl) {
      try {
        await fetch(siteConfig.tracking.eventsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      } catch {
        // Non-blocking — checkout is the priority
      }
    }

    if (STRIPE_PAYMENT_LINK) {
      const url = new URL(STRIPE_PAYMENT_LINK);
      url.searchParams.set("prefilled_email", email);
      url.searchParams.set("client_reference_id", `openpaw_${Date.now()}`);
      window.location.href = url.toString();
      return { status: "redirecting" };
    }

    return {
      status: "saved",
      message: "We saved your spot. Stripe checkout opens the moment it's live.",
    };
  }

  return { submit };
}
