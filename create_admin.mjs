import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_BOOTSTRAP_EMAIL;
const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

if (!url || !serviceKey || !email || !password) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

// Try to create user; if exists, fetch existing
let userId;
const { data: created, error: createErr } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (createErr) {
  if (createErr.message?.toLowerCase().includes("already")) {
    // find existing
    const { data: list } = await supabase.auth.admin.listUsers();
    const existing = list.users.find((u) => u.email === email);
    if (!existing) {
      console.error("Create failed and not found:", createErr.message);
      process.exit(1);
    }
    userId = existing.id;
    // update password to ensure it matches
    await supabase.auth.admin.updateUserById(userId, { password });
    console.log("Existing user updated:", userId);
  } else {
    console.error("Create error:", createErr.message);
    process.exit(1);
  }
} else {
  userId = created.user.id;
  console.log("User created:", userId);
}

// Assign admin role (idempotent via unique constraint)
const { error: roleErr } = await supabase
  .from("user_roles")
  .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

if (roleErr) {
  console.error("Role error:", roleErr.message);
  process.exit(1);
}

console.log("Admin role assigned to:", email);
