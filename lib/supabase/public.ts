import { createClient } from "@supabase/supabase-js";

/** Public anon client — no cookies, safe for static/ISR pages. */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
