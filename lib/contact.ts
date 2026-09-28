/** Shared by the server action and every design's form. */

export const INTERESTS = [
  { value: "crew", label: "Join the team" },
  { value: "sponsor", label: "Sponsor the team" },
  { value: "mentor", label: "Mentor" },
  { value: "other", label: "Something else" },
] as const;

export type Interest = (typeof INTERESTS)[number]["value"];

export type ContactField = "name" | "email" | "interest" | "message";

export type ContactValues = Partial<Record<ContactField, string>>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error so React's post-submit form reset doesn't wipe what they typed. */
  values?: ContactValues;
};

export const initialContactState: ContactState = { status: "idle" };

export function isChecked(state: ContactState, value: Interest): boolean {
  return (state.values?.interest ?? "crew") === value;
}
