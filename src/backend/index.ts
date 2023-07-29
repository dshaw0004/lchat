import { createClient } from "@supabase/supabase-js";
const key = process.env.REACT_APP_SUPABASE_KEY || "";
// console.log(key);
const supabase = createClient("https://lfawutoxyatmrorqyldo.supabase.co", key);
export default supabase;
