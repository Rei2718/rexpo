import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = "https://lmasnvjacnikocawmezn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYXNudmphY25pa29jYXdtZXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4ODIzMTAsImV4cCI6MjA3NzQ1ODMxMH0.2fHfuzQzwSIaOjLURWF5iQggSLK51ZcAZyb0ldXe95M";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});