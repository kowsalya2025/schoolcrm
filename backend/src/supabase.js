const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://junlllkbkzkqjhfzyllb.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_sfsOffkhPxHgFQHD0SqVlg_RDw0Dk3e';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = { supabase, SUPABASE_URL, SUPABASE_KEY };
