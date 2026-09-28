import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Server-only. The service role bypasses RLS, which is the point: the table has
 * RLS on and no public policies, so this action is the only way in. Never
 * import this from a client component.
 *
 * Returns null when the keys aren't set so the form can say so instead of
 * crashing the page.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  client =
    url && key
      ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
      : null;

  return client;
}
