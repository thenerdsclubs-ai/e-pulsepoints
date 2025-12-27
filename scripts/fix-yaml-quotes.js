const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, '..', 'content', 'videos');

function fixYamlQuotes() {
  console.log('🔧 Starting YAML quote fixing process...');
  
  // Get all YAML files
  const yamlFiles = fs.readdirSync(videosDir).filter(file => file.endsWith('.yaml'));
  console.log(`📁 Found ${yamlFiles.length} video files to process`);
  
  let fixedCount = 0;
  let errorCount = 0;

  yamlFiles.forEach((filename, index) => {
    try {
      const filePath = path.join(videosDir, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Use a more sophisticated approach to fix multi-line quoted values
      let fixedContent = content;
      
      // Fix description field that spans multiple lines
      fixedContent = fixedContent.replace(
        /description:\s*"([^"]*(?:\n[^"]*)*)/g, 
        (match, descContent) => {
          // Clean up the description content
          const cleanDesc = descContent
            .replace(/\n/g, ' ')  // Replace newlines with spaces
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/"/g, '\\"') // Escape quotes
            .trim();
          return `description: "${cleanDesc}"`;
        }
      );
      
      // Fix title field if it has quote issues
      fixedContent = fixedContent.replace(
        /title:\s*"([^"]*(?:\n[^"]*)*)/g,
        (match, titleContent) => {
          const cleanTitle = titleContent
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/"/g, '\\"')
            .trim();
          return `title: "${cleanTitle}"`;
        }
      );
      
      // Handle cases where description starts with quote but doesn't end properly
      fixedContent = fixedContent.replace(
        /description:\s*"([^"]*)\n([^"]*?)$/gm,
        (match, firstLine, remainder) => {
          const fullDesc = (firstLine + ' ' + remainder)
            .replace(/\s+/g, ' ')
            .replace(/"/g, '\\"')
            .trim();
          return `description: "${fullDesc}"`;
        }
      );
      
      // Split by lines and fix any remaining issues
      const lines = fixedContent.split('\n');
      const cleanedLines = [];
      let inDescription = false;
      let descriptionContent = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.startsWith('description: ')) {
          if (line.includes('"') && !line.endsWith('"')) {
            // Start of multi-line description
            inDescription = true;
            descriptionContent = line.substring('description: '.length).replace(/^"/, '');
          } else {
            cleanedLines.push(line);
          }
        } else if (inDescription) {
          // Continuation of description
          if (line.includes('thumbnailUrl:') || line.includes('duration:') || line.includes('durationSeconds:')) {
            // End of description, process accumulated content
            const cleanDesc = descriptionContent
              .replace(/\s+/g, ' ')
              .replace(/"/g, '\\"')
              .trim();
            cleanedLines.push(`description: "${cleanDesc}"`);
            cleanedLines.push(line);
            inDescription = false;
            descriptionContent = '';
          } else {
            descriptionContent += ' ' + line;
          }
        } else {
          cleanedLines.push(line);
        }
      }
      
      // Handle case where description was the last field
      if (inDescription) {
        const cleanDesc = descriptionContent
          .replace(/\s+/g, ' ')
          .replace(/"/g, '\\"')
          .trim();
        cleanedLines.push(`description: "${cleanDesc}"`);
      }
      
      const finalContent = cleanedLines.join('\n');
      
      // Only write if content changed
      if (finalContent !== content) {
        fs.writeFileSync(filePath, finalContent, 'utf8');
        fixedCount++;
        console.log(`✅ Fixed: ${filename}`);
      }
      
      // Show progress every 50 files
      if ((index + 1) % 50 === 0) {
        console.log(`📊 Progress: ${index + 1}/${yamlFiles.length} files processed`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filename}: ${error.message}`);
      errorCount++;
    }
  });
  
  console.log('\n🎉 YAML fixing complete!');
  console.log(`✅ Fixed: ${fixedCount} files`);
  console.log(`❌ Errors: ${errorCount} files`);
  console.log(`📄 Total processed: ${yamlFiles.length} files`);
}

// Test YAML parsing with a simple validator
function validateYamlFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Basic validation - check for unmatched quotes
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.includes('description:') || line.includes('title:')) {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          const value = line.substring(colonIndex + 1).trim();
          // Check for unmatched quotes
          if (value.startsWith('"') && !value.endsWith('"')) {
            return false;
          }
          if (!value.startsWith('"') && value.endsWith('"')) {
            return false;
          }
        }
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

// Run the fix and then validate a few files
if (require.main === module) {
  fixYamlQuotes();
  
  // Test validation on a few files
  const testFiles = fs.readdirSync(videosDir)
    .filter(file => file.endsWith('.yaml'))
    .slice(0, 5);
    
  console.log('\n🧪 Testing validation on sample files...');
  testFiles.forEach(filename => {
    const filePath = path.join(videosDir, filename);
    const isValid = validateYamlFile(filePath);
    console.log(`${isValid ? '✅' : '❌'} ${filename}`);
  });
}

module.exports = { fixYamlQuotes, validateYamlFile };