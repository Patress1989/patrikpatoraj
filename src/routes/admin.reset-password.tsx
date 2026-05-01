import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

export const Route = createFileRoute("/admin/reset-password")({
  head: () => ({
    meta: [
      { title: "Obnova hesla" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Supabase parses the recovery token from the URL hash automatically
    // and emits a PASSWORD_RECOVERY event with an active session.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Heslo musí mať minimálne 8 znakov");
      return;
    }
    if (password !== confirm) {
      toast.error("Heslá sa nezhodujú");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error("Nepodarilo sa zmeniť heslo");
      return;
    }
    toast.success("Heslo bolo úspešne zmenené");
    await supabase.auth.signOut();
    navigate({ to: "/admin/crm-login" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Nastaviť nové heslo</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            {ready
              ? "Zadajte nové heslo k vášmu účtu."
              : "Overujem odkaz na obnovu hesla…"}
          </p>
        </div>

        {ready && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Nové heslo</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <div>
              <Label htmlFor="confirm">Potvrdiť heslo</Label>
              <Input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Ukladám…" : "Uložiť nové heslo"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
