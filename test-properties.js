const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const { data, error } = await supabase.from('properties').select('*');
  console.log('Properties:', data?.length);
  if (data?.length > 0) {
    console.log(data[0]);
  }
}
run();
