const fs = require('fs');
const path = require('path');

// Get all YAML files in the videos directory
const videosDir = path.join(__dirname, 'content', 'videos');

function fixYamlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;
        
        console.log(`Checking ${path.basename(filePath)}`);
        
        // Fix description field with unescaped quotes
        const descriptionRegex = /description: "(.*?)"/s;
        const match = content.match(descriptionRegex);
        
        if (match) {
            const originalDesc = match[1];
            
            // Check if description has issues
            const hasUnescapedQuotes = originalDesc.includes('"') && !originalDesc.includes('\\"');
            const hasExtraQuotes = originalDesc.endsWith('""') || originalDesc.endsWith('..." ');
            
            if (hasUnescapedQuotes || hasExtraQuotes || originalDesc.includes('...""')) {
                console.log(`  🔧 Fixing description quotes`);
                
                let fixedDesc = originalDesc
                    // Remove any trailing quote marks and ellipsis patterns
                    .replace(/\.{3}"+$/, '...')
                    .replace(/"+$/, '')
                    .replace(/\.{3}"\s*$/, '...')
                    // Escape internal quotes that aren't already escaped
                    .replace(/(?<!\\)"/g, '\\"')
                    // Clean up any double backslashes
                    .replace(/\\\\"/g, '\\"')
                    // Normalize whitespace
                    .replace(/\s+/g, ' ')
                    .trim();
                
                content = content.replace(descriptionRegex, `description: "${fixedDesc}"`);
                hasChanges = true;
            }
        }
        
        // Fix title field with double quotes
        const titleRegex = /title: "([^"]*)"([^"]*)"/g;
        const titleMatch = content.match(titleRegex);
        
        if (titleMatch) {
            content = content.replace(titleRegex, (match, titleContent, extra) => {
                if (extra && extra.trim()) {
                    console.log(`  🔧 Fixing title with extra content: ${extra}`);
                    hasChanges = true;
                    return `title: "${titleContent.replace(/"/g, '\\"')}"`;
                }
                return match;
            });
        }
        
        // Fix any remaining quote issues in other fields
        const lines = content.split('\n');
        const fixedLines = lines.map(line => {
            // Look for lines with field: "value with unescaped quotes"
            const fieldMatch = line.match(/^(\w+): "(.*)"\s*$/);
            if (fieldMatch && fieldMatch[2].includes('"') && !fieldMatch[2].includes('\\"')) {
                const field = fieldMatch[1];
                const value = fieldMatch[2].replace(/"/g, '\\"');
                console.log(`  🔧 Fixing quotes in ${field} field`);
                hasChanges = true;
                return `${field}: "${value}"`;
            }
            return line;
        });
        
        if (hasChanges) {
            const finalContent = fixedLines.join('\n');
            fs.writeFileSync(filePath, finalContent, 'utf8');
            console.log(`✅ Fixed ${path.basename(filePath)}`);
            return true;
        }
        
        return false;
        
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

function processAllYamlFiles() {
    console.log('🔍 Scanning for YAML files with quote issues...\n');
    
    if (!fs.existsSync(videosDir)) {
        console.error('Videos directory not found:', videosDir);
        return;
    }
    
    const files = fs.readdirSync(videosDir);
    const yamlFiles = files.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    
    console.log(`Found ${yamlFiles.length} YAML files to process`);
    
    let fixedCount = 0;
    
    for (const file of yamlFiles) {
        const filePath = path.join(videosDir, file);
        if (fixYamlFile(filePath)) {
            fixedCount++;
        }
    }
    
    console.log(`\n🎉 Processing complete!`);
    console.log(`📊 Fixed ${fixedCount} files with YAML quote issues`);
    
    // Test parsing one of the previously problematic files
    console.log('\n🧪 Testing YAML parsing...');
    const testFiles = [
        '12-lead-ecg-placement-of-leads-properly.yaml',
        '3-meningitis-tests-nuchal-rigidity-kernig-s-brudzinski-s-signs-explained.yaml',
        '4-types-of-anesthetic-nerve-block-every-physician-should-know.yaml'
    ];
    
    testFiles.forEach(file => {
        const filePath = path.join(videosDir, file);
        if (fs.existsSync(filePath)) {
            try {
                const yaml = require('js-yaml');
                const content = fs.readFileSync(filePath, 'utf8');
                yaml.load(content);
                console.log(`✅ ${file} parses correctly`);
            } catch (error) {
                console.log(`❌ ${file} still has issues: ${error.message}`);
            }
        }
    });
}

// Run the script
processAllYamlFiles();