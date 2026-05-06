import dotenv from "dotenv";

dotenv.config();

const clientUrls = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(",").map((url) => url.trim()).filter(Boolean)
  : Array.from(
      new Set([process.env.CLIENT_URL || "http://localhost:5173", "http://localhost:5174"])
    );

export const env = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "skillbridge_super_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL || clientUrls[0],
  clientUrls,
  allowVercelPreviewOrigins: process.env.ALLOW_VERCEL_PREVIEW_ORIGINS === "true",
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ""
};
