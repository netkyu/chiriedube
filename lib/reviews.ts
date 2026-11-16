export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  author_name: string;
  role: string | null;
  rating: number;
  body: string;
  image_url: string | null;
  avatar_url: string | null;
  status: ReviewStatus;
  source: "public" | "admin";
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
};

export type AdminProfile = {
  user_id: string;
  email: string;
  display_name: string | null;
  created_at: string;
};

export const REVIEW_STATUS_LABEL: Record<ReviewStatus, string> = {
  pending: "În așteptare",
  approved: "Aprobată",
  rejected: "Respinsă",
};
