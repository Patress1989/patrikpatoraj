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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Download, LogOut, Trash2, Eye, RefreshCw, FileText } from "lucide-react";
import { downloadBriefPdf } from "@/lib/brief-pdf";

type Submission = Tables<"form_submissions">;
type Brief = Tables<"web_briefs">;

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
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null);

  const checkAuth = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setAuthorized(false);
      setLoading(false);
      return false;
    }
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
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

  const loadAll = async () => {
    const [{ data: subs, error: subErr }, { data: brfs, error: brfErr }] = await Promise.all([
      supabase.from("form_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("web_briefs").select("*").order("created_at", { ascending: false }),
    ]);
    if (subErr) toast.error("Chyba pri načítaní formulárov: " + subErr.message);
    else setSubmissions(subs || []);
    if (brfErr) toast.error("Chyba pri načítaní briefov: " + brfErr.message);
    else setBriefs(brfs || []);
  };

  useEffect(() => {
    (async () => {
      const ok = await checkAuth();
      if (ok) await loadAll();
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/crm-login" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Naozaj vymazať tento záznam?")) return;
    const { error } = await supabase.from("form_submissions").delete().eq("id", id);
    if (error) {
      toast.error("Chyba pri mazaní");
      return;
    }
    toast.success("Záznam vymazaný");
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    setSelected(null);
  };

  const handleDeleteBrief = async (id: string) => {
    if (!confirm("Naozaj vymazať tento brief?")) return;
    const { error } = await supabase.from("web_briefs").delete().eq("id", id);
    if (error) {
      toast.error("Chyba pri mazaní");
      return;
    }
    toast.success("Brief vymazaný");
    setBriefs((prev) => prev.filter((b) => b.id !== id));
    setSelectedBrief(null);
  };

  const exportEcomailCSV = () => {
    if (submissions.length === 0) {
      toast.error("Žiadne dáta na export");
      return;
    }
    const headers = [
      "email","name","surname","phone","company","business_area",
      "preferred_colors","existing_website","business_description",
      "services_list","contact_info","created_at",
    ];
    const rows = submissions.map((s) => {
      const parts = (s.name || "").trim().split(/\s+/);
      const firstName = parts[0] || "";
      const surname = parts.slice(1).join(" ");
      return [
        s.email, firstName, surname, s.phone, s.company_name || "",
        s.business_area, s.preferred_colors || "", s.existing_website || "",
        s.business_description || "", s.services_list || "", s.contact_info || "",
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
    const csv = "\uFEFF" + [headers, ...rows]
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
          <h1 className="text-xl font-bold">CRM</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadAll}>
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
        <Tabs defaultValue="forms">
          <TabsList>
            <TabsTrigger value="forms">Formuláre ({submissions.length})</TabsTrigger>
            <TabsTrigger value="briefs">Pomôcka k webu ({briefs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="mt-4">
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
                          <Button variant="ghost" size="sm" onClick={() => setSelected(s)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="briefs" className="mt-4">
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dátum</TableHead>
                    <TableHead>Meno</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Firma</TableHead>
                    <TableHead>Rozpočet</TableHead>
                    <TableHead className="text-right">Akcie</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {briefs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        Žiadne briefy
                      </TableCell>
                    </TableRow>
                  ) : (
                    briefs.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="text-sm">
                          {new Date(b.created_at).toLocaleString("sk-SK")}
                        </TableCell>
                        <TableCell className="font-medium">{b.name}</TableCell>
                        <TableCell>{b.email}</TableCell>
                        <TableCell>{b.company_name || "—"}</TableCell>
                        <TableCell>{b.budget_range || "—"}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedBrief(b)} title="Zobraziť detail">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => downloadBriefPdf(b)} title="Stiahnuť PDF">
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteBrief(b.id)} title="Vymazať">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Detail formulára */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail formulára</DialogTitle>
            <DialogDescription>Kompletné informácie z odoslaného formulára.</DialogDescription>
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
                        <img src={url} alt={`Foto ${i + 1}`} className="w-full h-24 object-cover rounded border hover:opacity-80" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <DetailRow label="Vytvorené" value={new Date(selected.created_at).toLocaleString("sk-SK")} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Detail briefu */}
      <Dialog open={!!selectedBrief} onOpenChange={(o) => !o && setSelectedBrief(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail briefu — Pomôcka k webu</DialogTitle>
            <DialogDescription>Kompletné odpovede klienta.</DialogDescription>
            {selectedBrief && (
              <div className="pt-2">
                <Button size="sm" variant="outline" onClick={() => downloadBriefPdf(selectedBrief)}>
                  <FileText className="w-4 h-4 mr-2" />
                  Stiahnuť PDF
                </Button>
              </div>
            )}
          </DialogHeader>
          {selectedBrief && (
            <div className="space-y-3 text-sm">
              <SectionHead>Kontakt</SectionHead>
              <DetailRow label="Meno" value={selectedBrief.name} />
              <DetailRow label="E-mail" value={selectedBrief.email} />
              <DetailRow label="Telefón" value={selectedBrief.phone} />
              <DetailRow label="Firma" value={selectedBrief.company_name} />

              <SectionHead>O firme</SectionHead>
              <DetailRow label="Začínajúca firma" value={fmtBool(selectedBrief.is_starting)} />
              <DetailRow label="Logo / brand" value={fmtBool(selectedBrief.has_brand)} />
              <DetailRow label="Firma 1 vetou" value={selectedBrief.business_one_liner} />
              <DetailRow label="Existujúci web" value={fmtBool(selectedBrief.has_existing_site)} />
              <DetailRow label="URL webu" value={selectedBrief.existing_site_url} />
              <DetailRow label="Nedostatky" value={selectedBrief.existing_site_issues} />

              <SectionHead>Ciele</SectionHead>
              <DetailRow label="Ciele" value={selectedBrief.goals?.join(", ") ?? null} />
              <DetailRow label="Zmeny svojpomocne" value={fmtBool(selectedBrief.self_edit)} />

              <SectionHead>Dizajn</SectionHead>
              <DetailRow label="Farby" value={selectedBrief.preferred_colors} />
              <DetailRow label="Typografia" value={selectedBrief.preferred_typography} />
              <DetailRow label="Vlastné fotky" value={fmtBool(selectedBrief.has_own_photos)} />
              <DetailRow label="Vlastné texty" value={fmtBool(selectedBrief.has_own_texts)} />
              <DetailRow label="Referenčné weby" value={selectedBrief.reference_sites} />

              <SectionHead>Funkcie</SectionHead>
              <DetailRow label="Hlavné funkcie" value={selectedBrief.main_features} />
              <DetailRow label="Predaj produktov" value={fmtBool(selectedBrief.sells_products)} />
              <DetailRow label="CRM / e-mailing" value={fmtBool(selectedBrief.needs_crm_integration)} />
              <DetailRow label="CRM detail" value={selectedBrief.crm_details} />
              <DetailRow label="Fakturácia" value={fmtBool(selectedBrief.needs_invoicing)} />
              <DetailRow label="Analytics" value={fmtBool(selectedBrief.needs_analytics)} />
              <DetailRow label="Viac jazykov" value={fmtBool(selectedBrief.multilingual)} />
              <DetailRow label="Jazyky" value={selectedBrief.languages} />
              <DetailRow label="Kontaktný formulár" value={fmtBool(selectedBrief.contact_form)} />
              <DetailRow label="Newsletter formulár" value={fmtBool(selectedBrief.newsletter_form)} />
              <DetailRow label="Špeciálne funkcie" value={selectedBrief.special_features} />

              <SectionHead>Záver</SectionHead>
              <DetailRow label="Cieľová skupina" value={selectedBrief.target_audience} />
              <DetailRow label="Odlíšenie" value={selectedBrief.unique_selling_point} />
              <DetailRow label="Balíček správy" value={fmtBool(selectedBrief.maintenance_package)} />
              <DetailRow label="Rozpočet" value={selectedBrief.budget_range} />
              <DetailRow label="Termín" value={selectedBrief.deadline} />
              <DetailRow label="Poznámky" value={selectedBrief.notes} />
              <DetailRow label="GDPR" value={selectedBrief.gdpr_consent ? "Áno" : "Nie"} />
              <DetailRow label="Vytvorené" value={new Date(selectedBrief.created_at).toLocaleString("sk-SK")} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function fmtBool(v: boolean | null): string | null {
  if (v === null) return null;
  return v ? "Áno" : "Nie";
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-primary">
      {children}
    </p>
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
