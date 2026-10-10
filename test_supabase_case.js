const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: dataUpper, error: errorUpper } = await supabase.from('PROPERTY').select('*').limit(1);
  console.log("Upper Error:", errorUpper?.message);
  
  const { data: dataLower, error: errorLower } = await supabase.from('property').select('*').limit(1);
  console.log("Lower Error:", errorLower?.message);
  
  console.log("Lower Data found:", dataLower ? true : false);
}

main();
