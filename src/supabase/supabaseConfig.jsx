import { createClient } from "@supabase/supabase-js";
import { varSupabase } from "./vars/varSupabase";

export const supabaseClient = createClient(
  varSupabase.url,
  varSupabase.anonKey
);
