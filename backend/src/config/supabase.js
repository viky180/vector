import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

export const isSupabaseEnabled = Boolean(env.supabaseUrl && env.supabaseServiceRoleKey);

export const supabase = isSupabaseEnabled
  ? createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
  : null;
