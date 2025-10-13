import { supabase } from "@/supabase/supabase";
import { AuthStateChangeTypes } from "./types";

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
}

export async function setupUser() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  if (!data.session) {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
  }
}

export function setupAuthListener(callback: AuthStateChangeTypes) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return { unsubscribe: () => subscription.unsubscribe() };
}