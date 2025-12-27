const fs = require('fs');
const path = require('path');

function fixSpecificIssues() {
    const videosDir = path.join(__dirname, 'content', 'videos');
    const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.yaml'));
    
    console.log('🔧 Fixing specific YAML quote issues...\n');
    
    let fixedCount = 0;
    const problemFiles = [
        'adrenaline-addiction-inside-the-body-of-adrenaline-junkies.yaml',
        'atrial-fibrillation-ecg-recognition-management.yaml',
        'brugada-syndrome-why-it-s-called-the-silent-killer.yaml',
        'cluster-headache-suicide-headache-explained.yaml',
        'co2-overload-what-does-hypercapnia-do-to-your-body.yaml',
        'diagnosis-and-management-of-fever-in-icu.yaml',
        'diverticulitis-explained-3d-animation-medicaleducation-guthealth-doctor.yaml',
        'ecg-basics-12-lead-understanding.yaml',
        'ecg-that-predicts-heart-attack-before-it-happens-wellens-syndrome.yaml',
        'good-bad-cholesterol-hdl-and-ldl.yaml',
        'heart-blocks-complete-av-blocks-guide.yaml',
        'heart-transplant-a-pig-s-heart-gives-life-to-man.yaml',
        'how-to-dignose-abnormal-heart-rhythm-tachyarrythmias-on-ecg-step-by-step.yaml',
        'infective-endocarditis-pathophysiology-symptoms-diagnosis-treatment.yaml',
        'lesson-1-code-blue-airway-emergencies-explained-anyone-can-intubate.yaml',
        'module-1-decoding-the-ecg-code-interactive-ecg-interpretation-course.yaml',
        'osteoporosis-3d-medical-animation.yaml',
        'stemi-anterior-wall-mi-ecg-patterns.yaml',
        'the-7-p-s-for-successful-emergency-intubation.yaml',
        'the-ecg-poem-just-being-a-little-creative.yaml',
        'the-heart-s-lightning-speed-of-electrical-impulses.yaml',
        'ventricular-tachycardia-vs-svt-differentiation.yaml',
        'what-is-ectopic-pregnancy-medical-animation.yaml'
    ];
    
    for (const file of problemFiles) {
        const filePath = path.join(videosDir, file);
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            const original = content;
            
            // Fix double quotes at end of description lines
            content = content.replace(/description: "([^"]*)""/g, 'description: "$1"');
            
            // Fix double quotes in the middle of descriptions
            content = content.replace(/""/g, '"');
            
            // Fix lines that have quotes but no proper ending
            const lines = content.split('\n');
            const fixedLines = lines.map(line => {
                // Fix specific patterns
                if (line.includes('description: "') && !line.endsWith('"') && line.includes('""')) {
                    // Find the description and clean it up
                    const match = line.match(/description: "(.*)$/);
                    if (match) {
                        let desc = match[1];
                        desc = desc.replace(/""/g, '"'); // Replace double quotes with single
                        desc = desc.replace(/"+$/, ''); // Remove trailing quotes
                        return `description: "${desc}"`;
                    }
                }
                
                if (line.includes('title: "') && line.includes('""')) {
                    const match = line.match(/title: "(.*)$/);
                    if (match) {
                        let title = match[1];
                        title = title.replace(/""/g, "'"); // Replace double quotes with single quotes in titles
                        title = title.replace(/"+$/, ''); // Remove trailing quotes
                        return `title: "${title}"`;
                    }
                }
                
                return line;
            });
            
            content = fixedLines.join('\n');
            
            if (content !== original) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Fixed ${file}`);
                fixedCount++;
            }
            
        } catch (error) {
            console.error(`❌ Error fixing ${file}: ${error.message}`);
        }
    }
    
    console.log(`\n🎉 Fixed ${fixedCount} problem files`);
}

fixSpecificIssues();