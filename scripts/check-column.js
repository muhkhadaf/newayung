const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

async function checkColumn() {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) envVars[key.trim()] = value.trim();
    });

    const url = envVars['NEXT_PUBLIC_SUPABASE_URL'];
    const serviceKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];
    const supabase = createClient(url, serviceKey);

    const { data, error } = await supabase.from('users').select('*').limit(1);

    if (data && data.length > 0) {
        const user = data[0];
        console.log("User keys:", Object.keys(user));
        if ('created_at' in user) {
            console.log("✅ 'created_at' column exists.");
        } else {
            console.log("❌ 'created_at' column MISSING.");
        }
    } else {
        console.log("No users found to check columns.");
    }
}

checkColumn();
