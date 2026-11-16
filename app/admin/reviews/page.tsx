import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ReviewsManager from "@/components/admin/ReviewsManager";
import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/lib/reviews";

export default async function AdminReviewsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: reviews } = await supabase
    .from("reviews")
    .select(
      "id, author_name, role, rating, body, image_url, avatar_url, status, source, created_at, updated_at, reviewed_at",
    )
    .order("created_at", { ascending: false });

  return (
    <AdminShell email={user.email ?? ""}>
      <ReviewsManager reviews={(reviews as Review[]) ?? []} />
    </AdminShell>
  );
}
