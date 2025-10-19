import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = "https://smslotoqloiwggranizq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtc2xvdG9xbG9pd2dncmFuaXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NjA5MTAsImV4cCI6MjA3NjQzNjkxMH0.rEUuM6C3Fifci_YI9WGxiYMOinWnjG6jeAMn_mbqDvg";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});