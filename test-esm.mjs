
import { config } from 'dotenv';
import { Resend } from 'resend';

console.log('=== ES MODULE TEST ===');

// Load .env
config();

const key = process.env.RESEND_API_KEY;
console.log('RESEND_API_KEY exists:', !!key);

if (key) {
    console.log('Key length:', key.length);
    console.log('First 8 chars:', key.substring(0, 8));
    console.log('Starts with re_:', key.startsWith('re_'));
    
    try {
        // Test Resend
        const resend = new Resend(key);
        console.log('✅ Resend initialized');
    } catch (error) {
        console.error('❌ Resend error:', error.message);
    }
} else {
    console.log('❌ Key not found');
    console.log('All env vars:');
    for (const k in process.env) {
        if (k.includes('RESEND') || k.includes('KEY')) {
            console.log(\  \: \...\);
        }
    }
}

