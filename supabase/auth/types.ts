import { AuthChangeEvent, Session } from "@supabase/supabase-js";
export type AuthStateChangeTypes = (event: AuthChangeEvent, session: Session | null) => void;