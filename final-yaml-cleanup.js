const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'content', 'videos');

function fixYamlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Fix malformed escaped quotes like \\""
        content = content.replace(/\\+"/g, '\\"');
        
        // Fix descriptions that end with just \\""
        content = content.replace(/description: "\\+"$/gm, 'description: ""');
        
        // Fix trailing escaped quotes at the end of lines
        content = content.replace(/\\+"+$/gm, '"');
        
        // Fix multiple consecutive backslashes
        content = content.replace(/\\{2,}/g, '\\');
        
        // Parse and fix each field properly
        const lines = content.split('\n');
        const fixedLines = [];
        
        for (let line of lines) {
            if (line.trim() === '') {
                fixedLines.push(line);
                continue;
            }
            
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) {
                fixedLines.push(line);
                continue;
            }
            
            const field = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // Clean up quoted values
            if (value.startsWith('"') && value.length > 1) {
                // Remove outer quotes
                value = value.substring(1);
                if (value.endsWith('"')) {
                    value = value.substring(0, value.length - 1);
                }
                
                // Clean up any malformed escaping
                value = value.replace(/\\+"/g, '"');
                value = value.replace(/\\{2,}/g, '\\');
                
                // Re-escape internal quotes properly
                value = value.replace(/"/g, '\\"');
                
                // Add back outer quotes
                fixedLines.push(`${field}: "${value}"`);
            } else if (value.startsWith('"')) {
                // Handle edge case where quote is not properly closed
                value = value.substring(1);
                value = value.replace(/\\+"/g, '"');
                value = value.replace(/\\{2,}/g, '\\');
                value = value.replace(/"/g, '\\"');
                fixedLines.push(`${field}: "${value}"`);
            } else {
                // Non-quoted value, add quotes if it contains spaces or special chars
                if (value && (value.includes(' ') || value.includes('#') || value.includes(':'))) {
                    value = value.replace(/"/g, '\\"');
                    fixedLines.push(`${field}: "${value}"`);
                } else {
                    fixedLines.push(line);
                }
            }
        }
        
        const fixedContent = fixedLines.join('\n');
        
        if (fixedContent !== originalContent) {
            fs.writeFileSync(filePath, fixedContent, 'utf8');
            console.log(`✅ Fixed ${path.basename(filePath)}`);
            return true;
        }
        
        return false;
        
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

function validateYaml(filePath) {
    try {
        const yaml = require('js-yaml');
        const content = fs.readFileSync(filePath, 'utf8');
        yaml.load(content);
        return true;
    } catch (error) {
        console.log(`❌ ${path.basename(filePath)}: ${error.message}`);
        return false;
    }
}

function processAllYamlFiles() {
    console.log('🔧 Final YAML cleanup...\n');
    
    if (!fs.existsSync(videosDir)) {
        console.error('Videos directory not found:', videosDir);
        return;
    }
    
    const files = fs.readdirSync(videosDir);
    const yamlFiles = files.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    
    console.log(`Processing ${yamlFiles.length} YAML files`);
    
    let fixedCount = 0;
    let validCount = 0;
    let errorCount = 0;
    
    for (const file of yamlFiles) {
        const filePath = path.join(videosDir, file);
        
        if (fixYamlFile(filePath)) {
            fixedCount++;
        }
        
        if (validateYaml(filePath)) {
            validCount++;
        } else {
            errorCount++;
        }
    }
    
    console.log(`\n🎉 Processing complete!`);
    console.log(`📊 Fixed: ${fixedCount} files`);
    console.log(`✅ Valid: ${validCount} files`);
    console.log(`❌ Errors: ${errorCount} files`);
    
    return errorCount === 0;
}

// Install js-yaml if not present
try {
    require('js-yaml');
} catch (e) {
    console.log('Installing js-yaml...');
    require('child_process').execSync('npm install js-yaml', { stdio: 'inherit' });
}

const success = processAllYamlFiles();
if (success) {
    console.log('\n🎉 All YAML files are now valid!');
} else {
    console.log('\n⚠️ Some files still have issues. Check the errors above.');
}