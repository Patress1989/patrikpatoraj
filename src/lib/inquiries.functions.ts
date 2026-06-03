import { createServerFn } from "@tanstack/react-start";

// Base offset so that displayed count = BASE + actual submissions in DB.
const BASE = 22;

export const getInquiriesCount = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count, error } = await supabaseAdmin
    .from("form_submissions")
    .select("*", { count: "exact", head: true });
  if (error) return { count: BASE };
  return { count: BASE + (count ?? 0) };
});
