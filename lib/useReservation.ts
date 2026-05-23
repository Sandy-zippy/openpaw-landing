"use client";

import { siteConfig, STRIPE_PAYMENT_LINK } from "@/lib/siteConfig";
import { generateEventId, readFbp, readFbc, readUtm } from "@/lib/eventId";
import { trackLead } from "@/components/Tracking";

export type ReservationStage = "lp_hero" | "lp_vip_gate";

export type ReservationInput = {
  email: string;
  country: string;
  stage: ReservationStage;
};

export type ReservationResult =
  | { status: "redirecting" }
  | { status: "saved"; message: string }
  | { status: "error"; message: string };

// Lightweight cross-section draft so the Hero form can prefill VIPGate when
// Stripe isn't wired up yet (or any time the user submits Hero then scrolls
// down). Stored in sessionStorage so it clears on tab close.
const DRAFT_KEY = "openpaw_draft";

export type ReservationDraft = { email: string; country: string };

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
  async function submit({ email, country, stage }: ReservationInput): Promise<ReservationResult> {
    if (!email || !country) {
      return { status: "error", message: "Add your email and country to continue." };
    }

    const eventId = generateEventId("Lead");
    const fbp = readFbp();
    const fbc = readFbc();
    const utm = readUtm();

    const payload = {
      event_name: "Lead",
      event_id: eventId,
      email,
      country,
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
        email, country, lead_event_id: eventId, ts: Date.now(),
      }));
    } catch {}

    trackLead({ email, eventID: eventId });

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
      message: "VIP signup opening soon. We saved your email — we'll be in touch with checkout the moment it's live.",
    };
  }

  return { submit };
}
