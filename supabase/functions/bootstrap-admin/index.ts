// Jednorazová bootstrap funkcia na vytvorenie admin účtu z ADMIN_BOOTSTRAP_EMAIL/PASSWORD secrets.
// Po úspešnom použití môžeš ju vymazať alebo nechať — neumožňuje žiadne ďalšie akcie.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const email = Deno.env.get("ADMIN_BOOTSTRAP_EMAIL");
    const password = Deno.env.get("ADMIN_BOOTSTRAP_PASSWORD");

    if (!email || !password) {
      return Response.json(
        { error: "ADMIN_BOOTSTRAP_EMAIL/PASSWORD secrets not set" },
        { status: 400, headers: corsHeaders }
      );
    }

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    // Try create
    let userId: string | null = null;
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createErr) {
      const msg = createErr.message?.toLowerCase() || "";
      if (msg.includes("already") || msg.includes("registered") || msg.includes("exists")) {
        // Find existing
        const { data: list } = await admin.auth.admin.listUsers({ perPage: 200 });
        const existing = list?.users.find(
          (u) => u.email?.toLowerCase() === email.toLowerCase()
        );
        if (!existing) {
          return Response.json(
            { error: "User exists but not found in list" },
            { status: 500, headers: corsHeaders }
          );
        }
        userId = existing.id;
        await admin.auth.admin.updateUserById(userId, { password, email_confirm: true });
      } else {
        return Response.json(
          { error: createErr.message },
          { status: 500, headers: corsHeaders }
        );
      }
    } else {
      userId = created.user!.id;
    }

    // Assign admin role
    const { error: roleErr } = await admin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

    if (roleErr) {
      return Response.json(
        { error: "Role assign failed: " + roleErr.message },
        { status: 500, headers: corsHeaders }
      );
    }

    return Response.json(
      { success: true, email, userId, message: "Admin pripravený. Môžeš sa prihlásiť na /admin/crm-login" },
      { headers: corsHeaders }
    );
  } catch (e) {
    return Response.json(
      { error: String(e) },
      { status: 500, headers: corsHeaders }
    );
  }
});
