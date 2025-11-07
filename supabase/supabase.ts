import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = "https://feevjgbrjoicwzbxnann.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZXZqZ2Jyam9pY3d6YnhuYW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0ODk2MzEsImV4cCI6MjA3ODA2NTYzMX0.KH5wzegetNr7WYiKT_0eW2mZl6yCwqqoTNu9gpaqqMA";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});