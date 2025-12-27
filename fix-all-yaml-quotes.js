const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const videosDir = path.join(__dirname, 'content/videos');
const files = fs.readdirSync(videosDir).filter(file => file.endsWith('.yaml'));

console.log(`Found ${files.length} YAML files to check`);

const problematicFiles = [];

for (const file of files) {
  const filePath = path.join(videosDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    yaml.load(content); // Try to parse
  } catch (error) {
    console.log(`❌ YAML Error in ${file}:`, error.message);
    problematicFiles.push(file);
    
    // Try to fix common quote issues
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      let fixed = false;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('description: ')) {
          // Extract the description content
          const descLine = lines[i];
          
          // Check if it has unescaped quotes in the middle
          if (descLine.includes('"') && descLine.indexOf('"') !== descLine.lastIndexOf('"')) {
            const match = descLine.match(/^description: "(.+)"$/);
            if (match) {
              const desc = match[1];
              // Replace internal double quotes with single quotes
              const fixedDesc = desc.replace(/"/g, "'");
              lines[i] = `description: "${fixedDesc}"`;
              fixed = true;
              console.log(`  🔧 Fixed quotes in description for ${file}`);
            }
          }
        }
      }
      
      if (fixed) {
        fs.writeFileSync(filePath, lines.join('\n'));
        console.log(`  ✅ Saved fixed version of ${file}`);
        
        // Verify the fix worked
        try {
          const fixedContent = fs.readFileSync(filePath, 'utf8');
          yaml.load(fixedContent);
          console.log(`  ✅ YAML parsing successful for ${file}`);
        } catch (verifyError) {
          console.log(`  ❌ Still has errors in ${file}:`, verifyError.message);
        }
      }
    } catch (fixError) {
      console.log(`  ❌ Could not fix ${file}:`, fixError.message);
    }
  }
}

console.log(`\nSummary: ${problematicFiles.length} files had YAML errors`);
if (problematicFiles.length > 0) {
  console.log('Problematic files:', problematicFiles);
}