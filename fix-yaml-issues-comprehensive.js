const fs = require('fs');
const path = require('path');

// Get all YAML files in the videos directory
const videosDir = path.join(__dirname, 'content', 'videos');

function fixYamlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if file needs fixing by looking for specific patterns
        const hasIssues = content.includes('description: "') && 
                         (!content.match(/description: ".*"\s*\n/) || 
                          content.includes('"\n\n') || 
                          content.includes('" \n'));
        
        if (!hasIssues) {
            return false; // No issues found
        }
        
        console.log(`Fixing ${filePath}`);
        
        // Split by lines to work with each field
        const lines = content.split('\n');
        const fixedLines = [];
        let inDescription = false;
        let descriptionContent = '';
        let currentField = '';
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Handle the start of description field
            if (line.startsWith('description: "')) {
                inDescription = true;
                descriptionContent = line.substring(13); // Remove 'description: "'
                
                // Check if description ends on same line
                if (descriptionContent.endsWith('"')) {
                    // Single line description
                    descriptionContent = descriptionContent.slice(0, -1); // Remove ending quote
                    // Escape any internal quotes
                    descriptionContent = descriptionContent.replace(/"/g, '\\"');
                    fixedLines.push(`description: "${descriptionContent}"`);
                    inDescription = false;
                }
                continue;
            }
            
            if (inDescription) {
                // Check if this line ends the description
                if (line.endsWith('"') || line.trim() === '"' || line.includes('" ') || 
                    (i + 1 < lines.length && lines[i + 1].match(/^\w+:/))) {
                    
                    // This is the end of description
                    let endContent = line;
                    if (endContent.endsWith('"')) {
                        endContent = endContent.slice(0, -1); // Remove ending quote
                    }
                    if (endContent.trim() === '"') {
                        endContent = '';
                    }
                    if (endContent.includes('" ')) {
                        endContent = endContent.replace('" ', '');
                    }
                    
                    descriptionContent += ' ' + endContent;
                    
                    // Clean up and escape the full description
                    descriptionContent = descriptionContent
                        .replace(/\s+/g, ' ')  // Normalize whitespace
                        .replace(/"/g, '\\"')  // Escape internal quotes
                        .trim();
                    
                    fixedLines.push(`description: "${descriptionContent}"`);
                    inDescription = false;
                    
                    // If the line had content after the quote, handle it
                    if (line.includes('" ') && line.split('" ')[1].trim()) {
                        const nextField = line.split('" ')[1].trim();
                        fixedLines.push(nextField);
                    }
                    continue;
                }
                
                // Middle of description
                descriptionContent += ' ' + line;
                continue;
            }
            
            // Handle title field with potential quote issues
            if (line.startsWith('title: "') && line.includes('""')) {
                const titleContent = line.substring(8).replace(/"+/g, '"').replace(/^"/, '').replace(/"$/, '');
                fixedLines.push(`title: "${titleContent}"`);
                continue;
            }
            
            // Regular line - add as is
            fixedLines.push(line);
        }
        
        const fixedContent = fixedLines.join('\n');
        
        // Final cleanup pass
        let finalContent = fixedContent
            .replace(/description: ""\s*\n/g, 'description: ""\n')  // Fix empty descriptions
            .replace(/description: "\s*"\s*\n/g, 'description: ""\n')  // Fix whitespace-only descriptions
            .replace(/\n\n+/g, '\n\n')  // Normalize line breaks
            .trim() + '\n';
        
        // Write the fixed content back
        fs.writeFileSync(filePath, finalContent, 'utf8');
        
        console.log(`✅ Fixed ${path.basename(filePath)}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

function processAllYamlFiles() {
    console.log('🔍 Scanning for YAML files with parsing issues...\n');
    
    if (!fs.existsSync(videosDir)) {
        console.error('Videos directory not found:', videosDir);
        return;
    }
    
    const files = fs.readdirSync(videosDir);
    const yamlFiles = files.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    
    console.log(`Found ${yamlFiles.length} YAML files to check`);
    
    let fixedCount = 0;
    
    for (const file of yamlFiles) {
        const filePath = path.join(videosDir, file);
        if (fixYamlFile(filePath)) {
            fixedCount++;
        }
    }
    
    console.log(`\n🎉 Processing complete!`);
    console.log(`📊 Fixed ${fixedCount} files with YAML issues`);
}

// Run the script
processAllYamlFiles();