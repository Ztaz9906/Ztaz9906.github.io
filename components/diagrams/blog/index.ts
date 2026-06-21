import type { ComponentType } from "react";

import { AblyChannelDiagram } from "./AblyChannelDiagram";
import { DDDBoundedContextsDiagram } from "./DDDBoundedContextsDiagram";
import { NextjsCQRSDiagram } from "./NextjsCQRSDiagram";
import { NextSEOFlowDiagram } from "./NextSEOFlowDiagram";
import { StripeWebhookFlowDiagram } from "./StripeWebhookFlowDiagram";
import { SupabaseRLSDiagram } from "./SupabaseRLSDiagram";

export const blogDiagrams: Record<string, ComponentType> = {
  "ably-realtime": AblyChannelDiagram,
  "building-scalable-systems-with-ddd": DDDBoundedContextsDiagram,
  "cqrs-in-nextjs": NextjsCQRSDiagram,
  "seo-con-nextjs": NextSEOFlowDiagram,
  "stripe-webhooks": StripeWebhookFlowDiagram,
  "supabase-rls": SupabaseRLSDiagram,
};
