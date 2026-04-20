import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Download, LogOut, Trash2, Eye, RefreshCw } from "lucide-react";

type Submission = Tables<"form_submissions">;

export const Route = createFileRoute("/admin/crm")({
  head: () => ({
    meta: [
      { title: "CRM" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CRMPage,
});

function CRMPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);

  const checkAuth = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setAuthorized(false);
      setLoading(false);
      return false;
    }
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", sessionData.session.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) {
      setAuthorized(false);
      setLoading(false);
      return false;
    }
    setAuthorized(true);
    return true;
  };

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Chyba pri načítaní: " + error.message);
      return;
    }
    setSubmissions(data || []);
  };

  useEffect(() => {
    (async () => {
      const ok = await checkAuth();
      if (ok) {
        await loadSubmissions();
      }
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/crm-login" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Naozaj vymazať tento záznam?")) return;
    const { error } = await supabase
      .from("form_submissions")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Chyba pri mazaní");
      return;
    }
    toast.success("Záznam vymazaný");
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    setSelected(null);
  };

  const exportEcomailCSV = () => {
    if (submissions.length === 0) {
      toast.error("Žiadne dáta na export");
      return;
    }
    // Ecomail-compatible CSV: email, name, surname, phone, company, custom fields
    const headers = [
      "email",
      "name",
      "surname",
      "phone",
      "company",
      "business_area",
      "preferred_colors",
      "existing_website",
      "business_description",
      "services_list",
      "contact_info",
      "created_at",
    ];
    const rows = submissions.map((s) => {
      const parts = (s.name || "").trim().split(/\s+/);
      const firstName = parts[0] || "";
      const surname = parts.slice(1).join(" ");
      return [
        s.email,
        firstName,
        surname,
        s.phone,
        s.company_name || "",
        s.business_area,
        s.preferred_colors || "",
        s.existing_website || "",
        s.business_description || "",
        s.services_list || "",
        s.contact_info || "",
        s.created_at,
      ];
    });

    const escape = (v: string) => {
      const str = String(v ?? "");
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csv =
      "\uFEFF" +
      [headers, ...rows]
        .map((row) => row.map((cell) => escape(String(cell))).join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ecomail-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV stiahnuté");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Načítavam…</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Prístup odmietnutý</h1>
          <p className="text-muted-foreground mb-6">
            Táto funkcia je iba pre prihlásených administrátorov.
          </p>
          <Button onClick={() => navigate({ to: "/admin/crm-login" })}>
            Prihlásiť sa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">CRM — Formuláre</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadSubmissions}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Obnoviť
            </Button>
            <Button size="sm" onClick={exportEcomailCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV (Ecomail)
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Odhlásiť
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dátum</TableHead>
                <TableHead>Meno</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefón</TableHead>
                <TableHead>Oblasť</TableHead>
                <TableHead className="text-right">Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Žiadne odoslané formuláre
                  </TableCell>
                </TableRow>
              ) : (
                submissions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="text-sm">
                      {new Date(s.created_at).toLocaleString("sk-SK")}
                    </TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.phone}</TableCell>
                    <TableCell>{s.business_area}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelected(s)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(s.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
        <p className="text-xs text-muted-foreground mt-4">
          Spolu: {submissions.length} záznamov
        </p>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail formulára</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <DetailRow label="Meno" value={selected.name} />
              <DetailRow label="E-mail" value={selected.email} />
              <DetailRow label="Telefón" value={selected.phone} />
              <DetailRow label="Firma" value={selected.company_name} />
              <DetailRow label="Oblasť podnikania" value={selected.business_area} />
              <DetailRow label="Popis činnosti" value={selected.business_description} />
              <DetailRow label="Zoznam služieb" value={selected.services_list} />
              <DetailRow label="Preferované farby" value={selected.preferred_colors} />
              <DetailRow label="Existujúca stránka" value={selected.existing_website} />
              <DetailRow label="Kontakt info" value={selected.contact_info} />
              <DetailRow label="GDPR súhlas" value={selected.gdpr_consent ? "Áno" : "Nie"} />
              <DetailRow label="E-mail status" value={selected.email_status} />
              {selected.photo_urls && selected.photo_urls.length > 0 && (
                <div>
                  <p className="font-medium text-muted-foreground mb-2">Fotky:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {selected.photo_urls.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={url}
                          alt={`Foto ${i + 1}`}
                          className="w-full h-24 object-cover rounded border hover:opacity-80"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <DetailRow
                label="Vytvorené"
                value={new Date(selected.created_at).toLocaleString("sk-SK")}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-3 gap-2 py-1.5 border-b last:border-0">
      <span className="font-medium text-muted-foreground">{label}:</span>
      <span className="col-span-2 whitespace-pre-wrap">{value}</span>
    </div>
  );
}
