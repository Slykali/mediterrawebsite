"use client";

import { useEffect, useRef } from "react";

import { HAS_HERO_MEDIA } from "@/lib/site";

/**
 * Background video behind the hero, at low opacity. Renders only the grain
 * texture until HAS_HERO_MEDIA is true, so a missing file is never requested.
 */
export function MediaBackdrop({ opacity = "opacity-25" }: { opacity?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Started here rather than with the autoPlay attribute: reduced motion
    // keeps the poster and the loop is never fetched.
    void video.play().catch(() => {
      /* Autoplay blocked: the poster stays up. */
    });
  }, []);

  if (!HAS_HERO_MEDIA) {
    return <div aria-hidden className="grain pointer-events-none absolute inset-0" />;
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster="/media/hero-poster.jpg"
        className={`h-full w-full object-cover grayscale contrast-125 ${opacity}`}
      >
        <source src="/media/hero-loop.webm" type="video/webm" />
        <source src="/media/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="grain absolute inset-0" />
    </div>
  );
}
