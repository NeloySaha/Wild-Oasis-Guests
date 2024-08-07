import { createClient } from "@supabase/supabase-js";

// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = 'https://zaaopnogqwbkasyujppf.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
