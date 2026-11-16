import type { SupabaseClient } from "@supabase/supabase-js";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function uploadReviewPhoto(
  supabase: SupabaseClient,
  file: File | null | undefined,
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (file.size > MAX_BYTES) {
    throw new Error("Imaginea trebuie să fie sub 5 MB.");
  }
  if (!ALLOWED.has(file.type)) {
    throw new Error("Folosește JPG, PNG, WebP sau GIF.");
  }

  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : file.type === "image/gif"
          ? "gif"
          : "jpg";

  const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("review-photos").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    throw new Error(error.message || "Nu am putut încărca imaginea.");
  }

  const { data } = supabase.storage.from("review-photos").getPublicUrl(path);
  return data.publicUrl;
}
