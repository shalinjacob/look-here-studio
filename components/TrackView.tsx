"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** fires one analytics event when the page mounts (e.g. view_item) */
export default function TrackView({ event, params }: { event: string; params: Record<string, unknown> }) {
  useEffect(() => {
    track(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
