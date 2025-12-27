import { getAllVideos, VideoData } from './videos';

// Medical terms and their related video categories/keywords
const MEDICAL_TERM_MAPPINGS: Record<string, string[]> = {
  // Cardiac Procedures
  'pci': ['percutaneous coronary intervention', 'angioplasty', 'stent', 'catheterization'],
  'percutaneous coronary intervention': ['pci', 'angioplasty', 'stent'],
  'angioplasty': ['pci', 'stent', 'balloon'],
  'cardiac catheterization': ['cathlab', 'angiogram', 'coronary'],
  
  // Myocardial Infarction Types
  'awmi': ['anterior wall myocardial infarction', 'anterior mi', 'lad'],
  'anterior wall myocardial infarction': ['awmi', 'anterior mi', 'lad'],
  'anterior mi': ['awmi', 'anterior wall', 'lad'],
  'lateral wall mi': ['lateral myocardial infarction', 'circumflex'],
  'inferior wall mi': ['inferior myocardial infarction', 'rca'],
  'posterior mi': ['posterior myocardial infarction', 'posterior wall'],
  
  // Coronary Arteries
  'lad': ['left anterior descending', 'anterior wall', 'septal'],
  'left anterior descending': ['lad', 'anterior'],
  'lad occlusion': ['lad', 'anterior wall mi', 'proximal lad'],
  'rca': ['right coronary artery', 'inferior wall'],
  'right coronary artery': ['rca', 'inferior'],
  'circumflex': ['lcx', 'lateral wall'],
  'lcx': ['circumflex', 'lateral'],
  
  // ECG Findings
  'st elevation': ['stemi', 'st segment elevation'],
  'stemi': ['st elevation myocardial infarction', 'st elevation'],
  'st depression': ['ischemia', 'reciprocal changes'],
  'q waves': ['pathological q waves', 'necrosis'],
  't wave inversion': ['ischemia', 'evolution'],
  
  // Arrhythmias
  'atrial fibrillation': ['afib', 'irregular rhythm'],
  'afib': ['atrial fibrillation', 'irregular'],
  'ventricular tachycardia': ['vtach', 'wide complex'],
  'vtach': ['ventricular tachycardia', 'wide complex'],
  'supraventricular tachycardia': ['svt', 'narrow complex'],
  'svt': ['supraventricular tachycardia'],
  
  // Conduction Blocks
  'av block': ['heart block', 'conduction block'],
  'heart block': ['av block', 'conduction'],
  'bundle branch block': ['bbb', 'conduction delay'],
  'lbbb': ['left bundle branch block'],
  'rbbb': ['right bundle branch block'],
  
  // Cardiac Enzymes/Biomarkers
  'troponin': ['cardiac enzymes', 'biomarkers'],
  'cardiac enzymes': ['troponin', 'biomarkers'],
  'ck-mb': ['creatine kinase', 'cardiac enzymes'],
  
  // Medications
  'aspirin': ['antiplatelet', 'cardiology'],
  'clopidogrel': ['plavix', 'antiplatelet'],
  'metoprolol': ['beta blocker', 'cardiology'],
  'atorvastatin': ['statin', 'cholesterol'],
  'nitroglycerin': ['nitrates', 'chest pain'],
  
  // Symptoms
  'chest pain': ['angina', 'acs', 'cardiac'],
  'angina': ['chest pain', 'ischemia'],
  'dyspnea': ['shortness of breath', 'heart failure'],
  'palpitations': ['arrhythmia', 'irregular heartbeat']
};

/**
 * Find the best matching video for a medical term
 */
export function findVideoForTerm(term: string): VideoData | null {
  const allVideos = getAllVideos();
  const lowerTerm = term.toLowerCase();
  
  // Get related terms for broader matching
  const relatedTerms = MEDICAL_TERM_MAPPINGS[lowerTerm] || [lowerTerm];
  const searchTerms = [lowerTerm, ...relatedTerms];
  
  // Score videos based on relevance
  const scoredVideos = allVideos
    .map(video => {
      let score = 0;
      const videoText = `${video.title} ${video.description}`.toLowerCase();
      
      // Check for exact term match (highest priority)
      if (videoText.includes(lowerTerm)) {
        score += 10;
      }
      
      // Check for related terms
      searchTerms.forEach(searchTerm => {
        if (videoText.includes(searchTerm.toLowerCase())) {
          score += 5;
        }
      });
      
      // Check title specifically (higher weight)
      if (video.title.toLowerCase().includes(lowerTerm)) {
        score += 8;
      }
      
      // Check category relevance
      const categoryMapping = {
        'stemi': ['STEMI & MI', 'Myocardial Infarction'],
        'mi': ['STEMI & MI', 'Myocardial Infarction'],
        'infarction': ['STEMI & MI', 'Myocardial Infarction'],
        'arrhythmia': ['Arrhythmias'],
        'fibrillation': ['Arrhythmias'],
        'tachycardia': ['Arrhythmias'],
        'block': ['Conduction Blocks'],
        'conduction': ['Conduction Blocks']
      };
      
      Object.entries(categoryMapping).forEach(([key, categories]) => {
        if (lowerTerm.includes(key) && categories.includes(video.category)) {
          score += 3;
        }
      });
      
      return { video, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
  
  return scoredVideos.length > 0 ? scoredVideos[0].video : null;
}

/**
 * Add internal links to medical terms in content
 */
export function addInternalLinks(content: string): string {
  let linkedContent = content;
  
  // Sort terms by length (longest first) to avoid partial matches
  const terms = Object.keys(MEDICAL_TERM_MAPPINGS).sort((a, b) => b.length - a.length);
  
  terms.forEach(term => {
    const video = findVideoForTerm(term);
    if (video) {
      // Create case-insensitive regex that matches whole words
      const regex = new RegExp(`\\b(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      
      linkedContent = linkedContent.replace(regex, (match) => {
        // Don't add links if already inside a link tag
        const beforeMatch = linkedContent.substring(0, linkedContent.indexOf(match));
        const openLinks = (beforeMatch.match(/<a\b/g) || []).length;
        const closeLinks = (beforeMatch.match(/<\/a>/g) || []).length;
        
        if (openLinks > closeLinks) {
          return match; // We're inside a link, don't add another
        }
        
        return `<a href="/watch/${video.slug}" class="medical-term-link" title="Watch: ${video.title}">${match}</a>`;
      });
    }
  });
  
  return linkedContent;
}

/**
 * Extract medical terms from content that could be linked
 */
export function extractLinkableTerms(content: string): string[] {
  const terms = Object.keys(MEDICAL_TERM_MAPPINGS);
  const foundTerms: string[] = [];
  
  terms.forEach(term => {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    if (regex.test(content)) {
      foundTerms.push(term);
    }
  });
  
  return foundTerms;
}