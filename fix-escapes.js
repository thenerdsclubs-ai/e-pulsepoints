const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'content', 'videos');

function fixFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const original = content;
        
        // Fix the specific malformed patterns
        content = content.replace(/\\+"+$/gm, '"');  // Fix trailing \\""
        content = content.replace(/description: "\\+"$/gm, 'description: ""');  // Fix empty description with escapes
        content = content.replace(/\\+"/g, '"');  // Fix all instances of \\\"
        
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed ${path.basename(filePath)}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}: ${error.message}`);
        return false;
    }
}

console.log('🔧 Fixing YAML escape sequences...\n');

const files = fs.readdirSync(videosDir);
const yamlFiles = files.filter(file => file.endsWith('.yaml'));

let fixedCount = 0;
for (const file of yamlFiles) {
    const filePath = path.join(videosDir, file);
    if (fixFile(filePath)) {
        fixedCount++;
    }
}

console.log(`\n✅ Fixed ${fixedCount} files with malformed escape sequences`);