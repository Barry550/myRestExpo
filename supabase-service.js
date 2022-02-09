import { createClient } from "@supabase/supabase-js"
import AsyncStorage from '@react-native-async-storage/async-storage'

import { SUPABASE_URL , SUPABASE_PUBLIC_KEY } from '@env'

console.log("SUPABASE_URL ", SUPABASE_URL);
console.log("SUPABASE_PUBLIC_KEY ", SUPABASE_PUBLIC_KEY);

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
  localStorage: AsyncStorage
})

export {supabase}