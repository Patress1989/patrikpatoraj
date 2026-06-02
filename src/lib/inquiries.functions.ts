import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Base offset so that displayed count = BASE + actual submissions in DB.
// Tune BASE so initial display matches the desired starting value.
const BASE = 22;

export const getInquiriesCount = createServerFn({ method: "GET" }).handler(async () => {
  const { count, error } = await supabaseAdmin
    .from("form_submissions")
    .select("*", { count: "exact", head: true });
  if (error) return { count: BASE };
  return { count: BASE + (count ?? 0) };
});
