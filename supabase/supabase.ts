// セキュアストレージ化を検討
// 今回の要件では少しセキュリティを緩く開発を進める

import { createClient } from '@supabase/supabase-js';
import 'expo-sqlite/localStorage/install';

const supabaseUrl = "https://boysgjakilvkkvqnobss.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJveXNnamFraWx2a2t2cW5vYnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNTQyODcsImV4cCI6MjA3NTkzMDI4N30.HCvxGQ5HpdHg4AG_hwV3Wct0hzJFEY2GYVH6tPKqsV0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
