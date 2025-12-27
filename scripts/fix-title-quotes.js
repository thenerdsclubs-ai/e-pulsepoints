const fs = require('fs');
const path = require('path');

const videosDir = './content/videos';

console.log('🔧 Starting title quote fix...');

// Get all YAML files
const yamlFiles = fs.readdirSync(videosDir).filter(file => file.endsWith('.yaml'));
console.log(`📁 Found ${yamlFiles.length} video files to process`);

let fixedCount = 0;

yamlFiles.forEach(file => {
  const filePath = path.join(videosDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix double quotes at end of title
  const originalContent = content;
  content = content.replace(/^title: "(.*)""\s*$/gm, 'title: "$1"');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${file}`);
    fixedCount++;
  }
});

console.log(`\n🎉 Title quote fixing complete!`);
console.log(`✅ Fixed: ${fixedCount} files`);