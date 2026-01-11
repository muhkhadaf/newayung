const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

async function diagnose() {
    console.log("Starting diagnosis...");

    // 1. Check .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        console.error("❌ .env.local file not found!");
        return;
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envVars[key.trim()] = value.trim();
        }
    });

    const url = envVars['NEXT_PUBLIC_SUPABASE_URL'];
    const anonKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
    const serviceKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];

    console.log("Environment Variables:");
    console.log(`- NEXT_PUBLIC_SUPABASE_URL: ${url ? '✅ Present' : '❌ Missing'}`);
    console.log(`- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${anonKey ? '✅ Present' : '❌ Missing'}`);
    console.log(`- SUPABASE_SERVICE_ROLE_KEY: ${serviceKey ? '✅ Present' : '❌ Missing'}`);

    if (!url || !serviceKey) {
        console.error("❌ Missing required environment variables for admin access.");
        return;
    }

    // 2. Test Connection
    console.log("\nTesting Supabase Connection...");
    const supabase = createClient(url, serviceKey);

    try {
        const { data, error } = await supabase.from('users').select('*').limit(1);

        if (error) {
            console.error("❌ Error querying 'users' table:", error);
            if (error.code === '42P01') {
                console.error("   -> Hint: The 'users' table might not exist.");
            }
        } else {
            console.log("✅ Successfully connected to 'users' table.");
            console.log(`   -> Found ${data.length} users.`);
        }
    } catch (err) {
        console.error("❌ Unexpected error:", err);
    }
}

diagnose();
