// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vtanucxiavevwrpfozhl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0YW51Y3hpYXZldndycGZvemhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4ODEwOTMsImV4cCI6MjA1MDQ1NzA5M30.93-i0H3xiZILjxjd09GLPLmqXnHR47BKMhSub7wSriE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);