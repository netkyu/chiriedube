import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AccountManager from "@/components/admin/AccountManager";
import { createClient } from "@/lib/supabase/server";
import type { AdminProfile } from "@/lib/reviews";

export default async function AdminAccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profiles } = await supabase
    .from("admin_profiles")
    .select("user_id, email, display_name, created_at")
    .order("created_at", { ascending: true });

  return (
    <AdminShell email={user.email ?? ""}>
      <AccountManager
        currentUserId={user.id}
        profiles={(profiles as AdminProfile[]) ?? []}
      />
    </AdminShell>
  );
}
