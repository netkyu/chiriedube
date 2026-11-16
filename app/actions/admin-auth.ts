"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthResult = { ok: true } | { ok: false; error: string };

export async function adminLogin(
  _prev: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  let data;
  let error;
  try {
    ({ data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    }));
  } catch {
    return {
      ok: false,
      error:
        "Nu pot contacta Supabase (rețea/DNS). Verifică că proiectul e pornit, apoi repornește `npm run dev`.",
    };
  }

  if (error || !data.user) {
    const networkish =
      error?.name === "AuthRetryableFetchError" ||
      /fetch failed|network|ENOTFOUND|ECONNREFUSED/i.test(error?.message ?? "");
    return {
      ok: false,
      error: networkish
        ? "Nu pot contacta Supabase (rețea/DNS). Verifică că proiectul e pornit, apoi repornește `npm run dev`."
        : "Email sau parolă greșită.",
    };
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    return { ok: false, error: "Contul nu are acces de administrator." };
  }

  redirect("/admin/reviews");
}

export async function adminLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function changeOwnPassword(
  _prev: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 10) {
    return { ok: false, error: "Parola trebuie să aibă cel puțin 10 caractere." };
  }
  if (password !== confirm) {
    return { ok: false, error: "Parolele nu coincid." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Neautentificat" };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { ok: false, error: error.message };

  return { ok: true };
}

export async function createAdminAccount(
  _prev: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const display_name = String(formData.get("display_name") ?? "").trim();

  const supabase = await createClient();
  const { error } = await supabase.rpc("create_admin_account", {
    p_email: email,
    p_password: password,
    p_display_name: display_name || null,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/account");
  return { ok: true };
}

export async function deleteAdminAccount(userId: string): Promise<AuthResult> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("delete_admin_account", {
    p_user_id: userId,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/account");
  return { ok: true };
}
