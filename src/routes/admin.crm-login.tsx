import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin/crm-login")({
  head: () => ({
    meta: [
      { title: "Admin prihlásenie" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkExistingSession = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (cancelled || error || !userData.user) return;

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .in("role", ["admin", "viewer"])
        .maybeSingle();

      if (cancelled) return;
      if (roleData) {
        navigate({ to: "/admin/crm" });
      } else {
        await supabase.auth.signOut();
      }
    };

    checkExistingSession();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      toast.error("Nesprávne prihlasovacie údaje");
      return;
    }
    if (!data.user) {
      setLoading(false);
      toast.error("Prihlásenie sa nepodarilo");
      return;
    }
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .in("role", ["admin", "viewer"])
      .maybeSingle();

    setLoading(false);
    if (!roleData) {
      await supabase.auth.signOut();
      toast.error("Tento účet nemá prístup do CRM");
      return;
    }
    toast.success("Prihlásenie úspešné");
    navigate({ to: "/admin/crm" });
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error("Nepodarilo sa odoslať e-mail");
      return;
    }
    toast.success("Ak e-mail existuje, poslali sme inštrukcie na reset hesla.");
    setMode("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Admin prihlásenie" : "Reset hesla"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            {mode === "login"
              ? "Prístup len pre administrátorov"
              : "Zadajte e-mail a pošleme vám odkaz na obnovu hesla."}
          </p>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Heslo</Label>
                <button
                  type="button"
                  onClick={() => setMode("reset")}
                  className="text-xs text-primary hover:underline"
                >
                  Zabudnuté heslo?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Prihlasujem…" : "Prihlásiť sa"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetRequest} className="space-y-4">
            <div>
              <Label htmlFor="reset-email">E-mail</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Odosielam…" : "Poslať odkaz na reset"}
            </Button>
            <button
              type="button"
              onClick={() => setMode("login")}
              className="block w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              ← Späť na prihlásenie
            </button>
          </form>
        )}
      </Card>
    </div>
  );
}
