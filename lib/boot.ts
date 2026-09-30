/** Seconds the counter takes to reach 100. Keep it under 1.5s. */
export const BOOT_DURATION = 1.15;

/** Milliseconds the screen holds at 100 before the overlay exits. */
export const BOOT_HOLD_MS = 180;

/** Copy widths per second while Kinetic boots. Its hero picks this up and settles it. */
export const BOOT_SPIN_VELOCITY = -1.6;

/**
 * Session cookie (no expiry) set once the intro has played or been skipped.
 * The root layout reads it so a returning visitor's HTML never includes the
 * intro at all. Lives here, not in the "use client" provider: a server file
 * importing a constant from a client module gets a reference, not the string.
 */
export const BOOT_COOKIE = "frc6874-booted";
