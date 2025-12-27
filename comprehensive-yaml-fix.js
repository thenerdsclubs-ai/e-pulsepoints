const fs = require('fs');
const path = require('path');

function findAndFixAllIssues() {
    const videosDir = path.join(__dirname, 'content', 'videos');
    const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.yaml'));
    
    console.log(`🔍 Checking ${files.length} YAML files for issues...\n`);
    
    let totalFixed = 0;
    
    for (const file of files) {
        const filePath = path.join(videosDir, file);
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            const original = content;
            let hasIssues = false;
            
            // Check for various problematic patterns
            if (content.includes('\\""\n') || content.includes('\\"" ') || content.includes('\\""') || 
                content.includes('\\"\\') || content.includes('\\\\') || content.endsWith('\\"')) {
                
                // Fix various escape issues
                content = content.replace(/\\+"/g, '"');  // Multiple backslashes before quotes
                content = content.replace(/\\\\+/g, '\\'); // Multiple backslashes
                content = content.replace(/"+$/gm, '"');   // Multiple quotes at end of line
                content = content.replace(/description: ""+$/gm, 'description: ""'); // Empty description fix
                
                hasIssues = true;
            }
            
            // Check for lines ending with problematic patterns
            const lines = content.split('\n');
            const fixedLines = lines.map(line => {
                if (line.includes('\\""\\"') || line.includes('\\"\\"\\"')) {
                    return line.replace(/\\+"/g, '"');
                }
                if (line.endsWith('\\""\\"') || line.endsWith('\\"\\"\\"')) {
                    return line.replace(/\\+"/g, '"');
                }
                if (line.includes(': "') && line.includes('\\""')) {
                    const colonIndex = line.indexOf(': "');
                    if (colonIndex !== -1) {
                        const field = line.substring(0, colonIndex + 3);
                        let value = line.substring(colonIndex + 3);
                        if (value.endsWith('\\""\\"') || value.endsWith('\\"\\"\\"') || value.endsWith('\\""')) {
                            value = value.replace(/\\+"+$/g, '"');
                            hasIssues = true;
                            return field + value;
                        }
                    }
                }
                return line;
            });
            
            if (hasIssues) {
                content = fixedLines.join('\n');
            }
            
            // Try to parse with js-yaml to verify validity
            try {
                require('js-yaml').load(content);
                if (content !== original) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Fixed ${file}`);
                    totalFixed++;
                }
            } catch (yamlError) {
                console.log(`❌ ${file}: ${yamlError.message}`);
                
                // If it's still invalid, try more aggressive fixes
                if (yamlError.message.includes('Unexpected double-quoted-scalar at node end')) {
                    // Find and fix the specific problem line
                    const lines = content.split('\n');
                    const newLines = lines.map(line => {
                        if (line.includes('description:') && line.endsWith('\\""')) {
                            return line.replace(/\\+"+$/g, '"');
                        }
                        return line;
                    });
                    
                    const newContent = newLines.join('\n');
                    try {
                        require('js-yaml').load(newContent);
                        fs.writeFileSync(filePath, newContent, 'utf8');
                        console.log(`✅ Fixed ${file} (aggressive)`);
                        totalFixed++;
                    } catch (err) {
                        console.log(`❌ Still invalid after aggressive fix: ${file}`);
                    }
                }
            }
            
        } catch (error) {
            console.error(`❌ Error processing ${file}: ${error.message}`);
        }
    }
    
    console.log(`\n🎉 Fixed ${totalFixed} files total`);
    return totalFixed;
}

// Install js-yaml if needed
try {
    require('js-yaml');
} catch (e) {
    console.log('Installing js-yaml...');
    require('child_process').execSync('npm install js-yaml --save-dev', { stdio: 'inherit' });
}

findAndFixAllIssues();