import { getAllVideos } from '@/lib/videos';

// Medical terms and their potential video matches
const MEDICAL_TERMS_MAP: Record<string, string[]> = {
  // Cardiac procedures
  'PCI': ['primary pci', 'percutaneous coronary intervention', 'angioplasty'],
  'primary PCI': ['primary pci', 'percutaneous coronary intervention', 'angioplasty'],
  'Primary PCI': ['primary pci', 'percutaneous coronary intervention', 'angioplasty'],
  'percutaneous coronary intervention': ['primary pci', 'percutaneous coronary intervention'],
  'angioplasty': ['primary pci', 'percutaneous coronary intervention', 'angioplasty'],
  'CABG': ['cabg', 'bypass surgery', 'coronary artery bypass'],
  'door-to-balloon': ['primary pci', 'angioplasty', 'stemi'],
  'reperfusion therapy': ['primary pci', 'angioplasty', 'stemi'],
  
  // MI Types  
  'AWMI': ['anterior wall mi', 'anterior myocardial infarction', 'anterior wall'],
  'anterior wall MI': ['anterior wall mi', 'anterior myocardial infarction'],
  'Anterior MI': ['anterior wall mi', 'anterior myocardial infarction'],
  'STEMI': ['stemi', 'st elevation myocardial infarction', 'st elevation'],
  'NSTEMI': ['nstemi', 'non st elevation myocardial infarction'],
  'myocardial infarction': ['myocardial infarction', 'heart attack', 'mi'],
  'heart attack': ['heart attack', 'myocardial infarction', 'stemi'],
  'MI': ['myocardial infarction', 'heart attack', 'stemi'],
  
  // Anatomy
  'LAD': ['lad', 'left anterior descending', 'anterior descending'],
  'LAD occlusion': ['lad', 'left anterior descending', 'anterior descending', 'occlusion'],
  'LAD Occlusion': ['lad', 'left anterior descending', 'anterior descending', 'occlusion'],
  'left anterior descending': ['lad', 'left anterior descending'],
  'RCA': ['rca', 'right coronary artery'],
  'LCX': ['lcx', 'left circumflex', 'circumflex'],
  'LCx': ['lcx', 'left circumflex', 'circumflex'],
  'coronary artery': ['coronary', 'artery', 'lad', 'rca'],
  
  // Arrhythmias
  'atrial fibrillation': ['atrial fibrillation', 'afib', 'af'],
  'AFib': ['atrial fibrillation', 'afib', 'af'],
  'A-fib': ['atrial fibrillation', 'afib', 'af'],
  'ventricular tachycardia': ['ventricular tachycardia', 'vtach', 'vt'],
  'VTach': ['ventricular tachycardia', 'vtach', 'vt'],
  'VT': ['ventricular tachycardia', 'vtach', 'vt'],
  'SVT': ['svt', 'supraventricular tachycardia'],
  'supraventricular tachycardia': ['svt', 'supraventricular tachycardia'],
  
  // ECG Components
  'ST elevation': ['st elevation', 'stemi', 'st segment'],
  'ST-elevation': ['st elevation', 'stemi', 'st segment'],
  'ST depression': ['st depression', 'st segment'],
  'T wave': ['t wave', 't waves'],
  'QRS complex': ['qrs complex', 'qrs'],
  'PR interval': ['pr interval'],
  'QT interval': ['qt interval', 'qtc'],
  'QTc': ['qt interval', 'qtc'],
  
  // Blocks
  'AV block': ['av block', 'heart block', 'atrioventricular block'],
  'heart block': ['heart block', 'av block', 'atrioventricular block'],
  'bundle branch block': ['bundle branch block', 'bbb'],
  'LBBB': ['lbbb', 'left bundle branch block'],
  'RBBB': ['rbbb', 'right bundle branch block'],
  'first degree AV block': ['first degree', 'av block'],
  'second degree AV block': ['second degree', 'av block', 'mobitz'],
  'third degree AV block': ['third degree', 'complete heart block'],
  'complete heart block': ['complete heart block', 'third degree'],
  
  // Medications
  'aspirin': ['aspirin', 'asa'],
  'clopidogrel': ['clopidogrel', 'plavix', 'p2y12'],
  'P2Y12 inhibitor': ['p2y12', 'clopidogrel', 'plavix'],
  'atorvastatin': ['atorvastatin', 'statin'],
  'metoprolol': ['metoprolol', 'beta blocker'],
  'lisinopril': ['lisinopril', 'ace inhibitor'],
  
  // Emergency terms
  'cardiogenic shock': ['cardiogenic shock', 'shock', 'pump failure'],
  'pump failure': ['cardiogenic shock', 'pump failure', 'heart failure'],
  'mechanical circulatory support': ['mechanical support', 'iabp', 'impella'],
  'IABP': ['iabp', 'balloon pump', 'mechanical support'],
  
  // Clinical terms
  'golden hour': ['stemi', 'time is muscle', 'primary pci'],
  'time is muscle': ['stemi', 'primary pci', 'reperfusion'],
  'door-to-needle': ['thrombolysis', 'fibrinolysis', 'stemi'],
  'thrombolysis': ['thrombolysis', 'fibrinolysis', 'stemi'],
  'fibrinolysis': ['thrombolysis', 'fibrinolysis', 'stemi'],
};

/**
 * Find the best matching video for a medical term (optimized for build performance)
 */
export function findVideoForMedicalTerm(term: string): string | null {
  // Use a simple cache to avoid repeated getAllVideos() calls
  if (typeof global !== 'undefined' && !(global as any).videoCache) {
    (global as any).videoCache = getAllVideos();
  }
  
  const allVideos = typeof global !== 'undefined' ? (global as any).videoCache : getAllVideos();
  const searchTerms = MEDICAL_TERMS_MAP[term as keyof typeof MEDICAL_TERMS_MAP] || [term.toLowerCase()];
  
  // Simple scoring - just look for exact matches in title first
  for (const video of allVideos) {
    const videoTitle = video.title.toLowerCase();
    
    // Check if any search term appears in the video title
    for (const searchTerm of searchTerms) {
      if (videoTitle.includes(searchTerm)) {
        return video.slug;
      }
    }
  }
  
  // If no title match, check description but only for high-priority videos
  for (const video of allVideos) {
    if (['STEMI & MI', 'Arrhythmias', 'ECG Interpretation'].includes(video.category)) {
      const videoDesc = video.description.toLowerCase();
      
      for (const searchTerm of searchTerms) {
        if (videoDesc.includes(searchTerm)) {
          return video.slug;
        }
      }
    }
  }
  
  return null;
}

/**
 * Add internal links to medical terms in HTML content
 */
export function addMedicalTermLinks(htmlContent: string, enableLinking: boolean = true): string {
  if (!enableLinking || !htmlContent || htmlContent.length > 50000) {
    return htmlContent; // Skip for very large content or when disabled
  }
  
  let processedContent = htmlContent;
  
  // Only process the most common and important medical terms to improve performance
  const priorityTerms = [
    'STEMI', 'PCI', 'primary PCI', 'LAD', 'LAD occlusion', 'AWMI', 
    'atrial fibrillation', 'AFib', 'ventricular tachycardia', 'VTach',
    'ST elevation', 'myocardial infarction', 'heart attack'
  ];
  
  // Sort terms by length (longest first) to avoid partial replacements
  const sortedTerms = priorityTerms
    .filter(term => MEDICAL_TERMS_MAP[term])
    .sort((a, b) => b.length - a.length);
  
  for (const term of sortedTerms) {
    const videoSlug = findVideoForMedicalTerm(term);
    if (videoSlug) {
      // Create a case-insensitive regex that doesn't match inside HTML tags or existing links
      const regex = new RegExp(
        `(?<!<[^>]*>)(?<!<a[^>]*>)\\b(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})\\b(?![^<]*</a>)`,
        'gi'
      );
      
      let matchCount = 0;
      processedContent = processedContent.replace(regex, (match) => {
        matchCount++;
        if (matchCount > 3) return match; // Limit to 3 links per term to avoid overloading
        
        return `<a href="/watch/${videoSlug}" class="medical-term-link text-blue-600 hover:text-blue-800 underline font-medium" title="Watch video about ${match}">${match}</a>`;
      });
    }
  }
  
  return processedContent;
}

/**
 * Remove "About the Author" section from blog post content
 */
export function cleanBlogPostContent(content: string): string {
  // Remove "About the Author" section that appears at the end
  let cleanedContent = content;
  
  // Patterns to match "About the Author" sections with any doctor name
  const authorPatterns = [
    // HTML patterns for any doctor
    /About the Author[\s\S]*?Dr\. [A-Za-z\s]+(MD|M\.D\.)?[\s\S]*?(?=\n\n|\n---|$)/gi,
    /About the Author[\s\S]*?board-certified[\s\S]*?(?=\n\n|\n---|$)/gi,
    /About the Author[\s\S]*?Emergency Medicine[\s\S]*?(?=\n\n|\n---|$)/gi,
    /Dr\. [A-Za-z\s]+(MD|M\.D\.)?[\s\S]*?Emergency Medicine Physician[\s\S]*?(?=\n\n|\n---|$)/gi,
    
    // Markdown patterns for any doctor
    /## About the Author[\s\S]*?### Dr\. [A-Za-z\s]+(MD|M\.D\.)?[\s\S]*?(?=\n\n|$)/gi,
    /## About the Author[\s\S]*?Emergency Medicine Physician[\s\S]*?(?=\n\n|$)/gi,
    /## About the Author[\s\S]*?board-certified[\s\S]*?(?=\n\n|$)/gi,
    /### Dr\. [A-Za-z\s]+(MD|M\.D\.)?[\s\S]*?Emergency Medicine Physician[\s\S]*?(?=\n\n|$)/gi,
    
    // General author section patterns
    /^## About the Author[\s\S]*$/gmi,
    /^### Dr\. [A-Za-z\s]+(MD|M\.D\.)?[\s\S]*$/gmi,
    /Emergency Medicine Physician[\s\S]*?E-PulsePoints[\s\S]*?(?=\n\n|$)/gi,
    
    // Specific doctor names to remove completely
    /Dr\. James Chen[\s\S]*?(?=\n\n|\n---|$)/gi,
    /Dr\. Emily Rodriguez[\s\S]*?(?=\n\n|\n---|$)/gi,
    /Dr\. Michael Thompson[\s\S]*?(?=\n\n|\n---|$)/gi,
    /Dr\. Sarah Johnson[\s\S]*?(?=\n\n|\n---|$)/gi,
    /Dr\. [A-Za-z\s]+(MD|M\.D\.)? is a board-certified[\s\S]*?(?=\n\n|$)/gi,
    /Dr\. [A-Za-z\s]+(MD|M\.D\.)? has extensive experience[\s\S]*?(?=\n\n|$)/gi,
    /passionate about teaching evidence-based[\s\S]*?(?=\n\n|$)/gi,
    
    // Remove any standalone doctor credentials at the end
    /[\n\s]*Dr\. [A-Za-z\s]+(MD|M\.D\.)?[\s]*$/gi,
    /[\n\s]*- Dr\. [A-Za-z\s]+(MD|M\.D\.)?[\s]*$/gi
  ];
  
  for (const pattern of authorPatterns) {
    cleanedContent = cleanedContent.replace(pattern, '');
  }
  
  // Clean up excessive whitespace
  cleanedContent = cleanedContent.replace(/\n\n\n+/g, '\n\n');
  cleanedContent = cleanedContent.trim();
  
  return cleanedContent;
}

/**
 * Enhance blog post content formatting with better spacing and headings
 */
export function enhanceBlogPostFormatting(htmlContent: string): string {
  let enhanced = htmlContent;
  
  // Add proper spacing after headings
  enhanced = enhanced.replace(/<\/h([1-6])>/g, '</h$1>\n\n');
  
  // Add spacing after paragraphs
  enhanced = enhanced.replace(/<\/p>/g, '</p>\n\n');
  
  // Add spacing after lists
  enhanced = enhanced.replace(/<\/(ul|ol)>/g, '</$1>\n\n');
  
  // Style clinical bottom line sections
  enhanced = enhanced.replace(
    /📋\s*Clinical Bottom Line([\s\S]*?)(?=\n\n|\n[🎯📊📋🔍]|$)/gi,
    '<div class="clinical-bottom-line bg-blue-50 border-l-4 border-blue-400 p-6 my-8 rounded-r-lg">' +
    '<h3 class="text-lg font-bold text-blue-800 mb-3 flex items-center">' +
    '<span class="mr-2">📋</span>Clinical Bottom Line</h3>' +
    '<div class="text-blue-700 leading-relaxed">$1</div></div>'
  );
  
  // Style key points sections
  enhanced = enhanced.replace(
    /🎯\s*Key Points?([\s\S]*?)(?=\n\n|\n[🎯📊📋🔍]|$)/gi,
    '<div class="key-points bg-green-50 border-l-4 border-green-400 p-6 my-8 rounded-r-lg">' +
    '<h3 class="text-lg font-bold text-green-800 mb-3 flex items-center">' +
    '<span class="mr-2">🎯</span>Key Points</h3>' +
    '<div class="text-green-700 leading-relaxed">$1</div></div>'
  );
  
  // Style remember sections
  enhanced = enhanced.replace(
    /Remember:?\s*([\s\S]*?)(?=\n\n|\n[🎯📊📋🔍]|$)/gi,
    '<div class="remember-section bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">' +
    '<h3 class="text-lg font-bold text-amber-800 mb-3 flex items-center">' +
    '<span class="mr-2">💡</span>Remember</h3>' +
    '<div class="text-amber-700 leading-relaxed">$1</div></div>'
  );
  
  // Enhance list styling
  enhanced = enhanced.replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 my-4">');
  enhanced = enhanced.replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 my-4">');
  enhanced = enhanced.replace(/<li>/g, '<li class="leading-relaxed">');
  
  // Enhance heading styles
  enhanced = enhanced.replace(/<h1>/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">');
  enhanced = enhanced.replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-800 mb-4 mt-6">');
  enhanced = enhanced.replace(/<h3>/g, '<h3 class="text-xl font-semibold text-gray-800 mb-3 mt-5">');
  enhanced = enhanced.replace(/<h4>/g, '<h4 class="text-lg font-semibold text-gray-700 mb-2 mt-4">');
  
  // Enhance paragraph styling
  enhanced = enhanced.replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-4">');
  
  // Add responsive image classes
  enhanced = enhanced.replace(/<img([^>]*?)>/g, '<img$1 class="max-w-full h-auto rounded-lg shadow-md my-6">');
  
  return enhanced;
}

/**
 * Process blog content with all enhancements
 */
export function processBlogContent(content: string, htmlContent?: string, enableLinking: boolean = true): string {
  // Clean the content first
  const cleanedContent = cleanBlogPostContent(content);
  
  // If HTML content is provided, process it
  if (htmlContent) {
    let processedHtml = cleanBlogPostContent(htmlContent);
    processedHtml = enhanceBlogPostFormatting(processedHtml);
    
    // Only add medical term links in development or when explicitly enabled
    if (enableLinking && process.env.NODE_ENV !== 'production') {
      processedHtml = addMedicalTermLinks(processedHtml, enableLinking);
    }
    
    return processedHtml;
  }
  
  return cleanedContent;
}