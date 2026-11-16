"use server";

import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { uploadReviewPhoto } from "@/lib/review-photos";
import type { ReviewStatus } from "@/lib/reviews";

function hashIp(ip: string) {
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

function fileFromForm(formData: FormData, key: string): File | null {
  const value = formData.get(key);
  if (!(value instanceof File) || value.size === 0) return null;
  return value;
}

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function submitPublicReview(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const author_name = String(formData.get("author_name") ?? "");
  const role = String(formData.get("role") ?? "");
  const rating = Number(formData.get("rating") ?? 0);
  const body = String(formData.get("body") ?? "");
  const honeypot = String(formData.get("company_website") ?? "");
  const photo = fileFromForm(formData, "photo");
  const avatar = fileFromForm(formData, "avatar");

  const hdrs = await headers();
  const forwarded = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || hdrs.get("x-real-ip") || "unknown";
  const ip_hash = hashIp(ip);

  const supabase = await createClient();

  let image_url: string | null = null;
  let avatar_url: string | null = null;
  try {
    [image_url, avatar_url] = await Promise.all([
      uploadReviewPhoto(supabase, photo),
      uploadReviewPhoto(supabase, avatar),
    ]);
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Nu am putut încărca imaginea.",
    };
  }

  const { error } = await supabase.rpc("submit_public_review", {
    p_author_name: author_name,
    p_role: role || null,
    p_rating: rating,
    p_body: body,
    p_ip_hash: ip_hash,
    p_honeypot: honeypot,
    p_image_url: image_url,
    p_avatar_url: avatar_url,
  });

  if (error) {
    return { ok: false, error: error.message || "Nu am putut trimite recenzia." };
  }

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  return { ok: true };
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Neautentificat");

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile) throw new Error("Neautorizat");
  return { supabase, user };
}

export async function setReviewStatus(
  id: string,
  status: ReviewStatus,
): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireAdmin();
    const { error } = await supabase
      .from("reviews")
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq("id", id);

    if (error) return { ok: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Eroare" };
  }
}

export async function updateReview(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    const author_name = String(formData.get("author_name") ?? "").trim();
    const role = String(formData.get("role") ?? "").trim();
    const rating = Number(formData.get("rating") ?? 5);
    const body = String(formData.get("body") ?? "").trim();
    const clearImage = String(formData.get("clear_image") ?? "") === "1";
    const clearAvatar = String(formData.get("clear_avatar") ?? "") === "1";
    const photo = fileFromForm(formData, "photo");
    const avatar = fileFromForm(formData, "avatar");

    let image_url: string | null | undefined = undefined;
    let avatar_url: string | null | undefined = undefined;

    if (clearImage) image_url = null;
    else if (photo) image_url = await uploadReviewPhoto(supabase, photo);

    if (clearAvatar) avatar_url = null;
    else if (avatar) avatar_url = await uploadReviewPhoto(supabase, avatar);

    const payload: Record<string, unknown> = {
      author_name,
      role: role || null,
      rating,
      body,
    };
    if (image_url !== undefined) payload.image_url = image_url;
    if (avatar_url !== undefined) payload.avatar_url = avatar_url;

    const { error } = await supabase.from("reviews").update(payload).eq("id", id);

    if (error) return { ok: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Eroare" };
  }
}

export async function deleteReview(id: string): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Eroare" };
  }
}

export async function createAdminReview(formData: FormData): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireAdmin();
    const author_name = String(formData.get("author_name") ?? "").trim();
    const role = String(formData.get("role") ?? "").trim();
    const rating = Number(formData.get("rating") ?? 5);
    const body = String(formData.get("body") ?? "").trim();
    const status = (String(formData.get("status") ?? "approved") ||
      "approved") as ReviewStatus;
    const photo = fileFromForm(formData, "photo");
    const avatar = fileFromForm(formData, "avatar");

    const [image_url, avatar_url] = await Promise.all([
      uploadReviewPhoto(supabase, photo),
      uploadReviewPhoto(supabase, avatar),
    ]);

    const { error } = await supabase.from("reviews").insert({
      author_name,
      role: role || null,
      rating,
      body,
      status,
      source: "admin",
      image_url,
      avatar_url,
      reviewed_at: status === "approved" ? new Date().toISOString() : null,
      reviewed_by: status === "approved" ? user.id : null,
    });

    if (error) return { ok: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Eroare" };
  }
}
