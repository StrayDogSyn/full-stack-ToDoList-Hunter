const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

async function checkLink(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve(res.statusCode === 200);
        }).on('error', () => {
            resolve(false);
        });
    });
}

async function verifyLinks() {
    try {
        const readmePath = path.join(__dirname, '..', 'README.md');
        const content = await readFileAsync(readmePath, 'utf8');
        
        // Match markdown links and URLs
        const urlRegex = /\[([^\]]+)\]\(([^)]+)\)|(?:^|\s)(https?:\/\/[^\s\)]+)/gm;
        const matches = [...content.matchAll(urlRegex)];
        
        const results = [];
        for (const match of matches) {
            const url = match[2] || match[3];
            if (url.startsWith('http')) {
                const isValid = await checkLink(url);
                results.push({ url, isValid });
            }
        }

        console.log('\nLink Verification Results:');
        console.log('========================');
        
        const invalidLinks = results.filter(r => !r.isValid);
        if (invalidLinks.length === 0) {
            console.log('✅ All external links are valid!\n');
            process.exit(0);
        } else {
            console.log('❌ Found invalid links:');
            invalidLinks.forEach(({ url }) => {
                console.log(`   - ${url}`);
            });
            process.exit(1);
        }
    } catch (error) {
        console.error('Error verifying links:', error);
        process.exit(1);
    }
}

verifyLinks();