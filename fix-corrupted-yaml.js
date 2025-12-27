const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'content', 'videos');

function fixCorruptedYamlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;
        
        console.log(`Fixing ${path.basename(filePath)}`);
        
        // Fix corrupted title field (title that contains slug at the end)
        const corruptedTitleRegex = /title: "([^"]*?)\\?"([^"]*?)"/g;
        if (content.match(corruptedTitleRegex)) {
            content = content.replace(corruptedTitleRegex, (match, titlePart, extraPart) => {
                console.log(`  🔧 Fixing corrupted title: "${titlePart}"`);
                hasChanges = true;
                return `title: "${titlePart.trim()}"`;
            });
        }
        
        // Fix title field that has slug merged into it
        const titleSlugRegex = /title: "([^"]*?)"([a-z0-9-]+)/g;
        if (content.match(titleSlugRegex)) {
            content = content.replace(titleSlugRegex, (match, titlePart, slugPart) => {
                console.log(`  🔧 Fixing title with merged slug: "${titlePart}"`);
                hasChanges = true;
                return `title: "${titlePart.trim()}"`;
            });
        }
        
        // Ensure proper field order and formatting
        const lines = content.split('\n');
        const fields = {};
        let currentField = null;
        let currentValue = '';
        
        for (const line of lines) {
            if (line.includes(':')) {
                // Save previous field if exists
                if (currentField) {
                    fields[currentField] = currentValue.trim();
                }
                
                const colonIndex = line.indexOf(':');
                currentField = line.substring(0, colonIndex).trim();
                currentValue = line.substring(colonIndex + 1).trim();
                
                // Clean up quotes
                if (currentValue.startsWith('"') && currentValue.endsWith('"')) {
                    currentValue = currentValue.slice(1, -1);
                }
            } else if (currentField && line.trim()) {
                currentValue += ' ' + line.trim();
            }
        }
        
        // Save the last field
        if (currentField) {
            fields[currentField] = currentValue.trim();
        }
        
        // Reconstruct the YAML with proper formatting
        if (hasChanges) {
            const orderedFields = [
                'videoId', 'title', 'slug', 'description', 'thumbnailUrl', 
                'duration', 'durationSeconds', 'publishedAt', 'updatedAt', 'category'
            ];
            
            const newContent = orderedFields
                .filter(field => fields[field])
                .map(field => {
                    let value = fields[field];
                    
                    // Escape quotes in the value
                    if (value.includes('"')) {
                        value = value.replace(/"/g, '\\"');
                    }
                    
                    return `${field}: "${value}"`;
                })
                .join('\n') + '\n';
            
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ Fixed and reformatted ${path.basename(filePath)}`);
            return true;
        }
        
        return false;
        
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

function processAllYamlFiles() {
    console.log('🔧 Fixing corrupted YAML files...\n');
    
    if (!fs.existsSync(videosDir)) {
        console.error('Videos directory not found:', videosDir);
        return;
    }
    
    const files = fs.readdirSync(videosDir);
    const yamlFiles = files.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    
    console.log(`Processing ${yamlFiles.length} YAML files`);
    
    let fixedCount = 0;
    
    for (const file of yamlFiles) {
        const filePath = path.join(videosDir, file);
        if (fixCorruptedYamlFile(filePath)) {
            fixedCount++;
        }
    }
    
    console.log(`\n🎉 Processing complete!`);
    console.log(`📊 Fixed ${fixedCount} corrupted files`);
}

processAllYamlFiles();