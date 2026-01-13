# Blog Post Creation Guide

Complete guide for manually creating and uploading blog posts to ePulsePoints.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [File Structure](#file-structure)
3. [Frontmatter Reference](#frontmatter-reference)
4. [Markdown Syntax](#markdown-syntax)
5. [Image Management](#image-management)
6. [SEO Best Practices](#seo-best-practices)
7. [Step-by-Step Tutorial](#step-by-step-tutorial)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- Basic understanding of Markdown
- Text editor (VS Code recommended)
- Images prepared and optimized

### 5-Minute Workflow
1. Create `.mdx` file in `content/articles/`
2. Add frontmatter metadata
3. Write content in Markdown
4. Add images to `public/` folder
5. Test locally with `npm run dev`
6. Deploy with `npm run build`

---

## File Structure

### Directory Organization

```
epulsepoints-website/
├── content/
│   └── articles/           # All blog posts here
│       ├── article-slug.mdx
│       └── another-article.mdx
├── public/
│   ├── clean_rhythm_ecg/   # ECG images
│   ├── MI_ecg_database/    # MI ECG images
│   ├── medical_accurate/   # Medical images
│   └── best_ecg_images/    # Featured ECG images
└── app/
    └── blog/
        └── [id]/
            └── page.tsx     # Blog post renderer
```

### File Naming Convention

**Format:** `lowercase-with-hyphens-slug.mdx`

**Rules:**
- Use `.mdx` extension (Markdown + JSX support)
- No spaces, underscores, or special characters
- Keep URLs SEO-friendly and readable
- Match the `slug` field in frontmatter

**Examples:**
```
✅ GOOD:
- normal-sinus-rhythm-basics.mdx
- atrial-fibrillation-ecg-recognition.mdx
- stemi-recognition-complete-guide.mdx

❌ BAD:
- Normal Sinus Rhythm.mdx
- atrial_fibrillation.mdx
- STEMI-2024.mdx
- my-article!!!.mdx
```

---

## Frontmatter Reference

### Required Fields

Every blog post MUST include these fields at the top between `---` markers:

```yaml
---
title: "Your Article Title Here"
slug: "your-article-slug"
excerpt: "Brief 1-2 sentence summary for previews and SEO"
author: "Dr. Raj K Reddy"
authorId: "raj-k-reddy"
publishedAt: "2024-12-27"
updatedAt: "2024-12-27"
featured: false
imageUrl: "/clean_rhythm_ecg/image-name.jpg"
tags:
  - ECG Basics
  - Cardiology
  - Emergency Medicine
---
```

### Field Descriptions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | String | Full article title (60-70 chars for SEO) | `"Atrial Fibrillation: ECG Recognition Guide"` |
| `slug` | String | URL-safe identifier (must match filename) | `"atrial-fibrillation-ecg-recognition"` |
| `excerpt` | String | Meta description for SEO (150-160 chars) | `"Learn to identify atrial fibrillation on ECG with key characteristics and clinical management strategies."` |
| `author` | String | Author's display name | `"Dr. Raj K Reddy"` |
| `authorId` | String | Author's URL slug | `"raj-k-reddy"` |
| `publishedAt` | Date | Publication date (YYYY-MM-DD) | `"2024-12-27"` |
| `updatedAt` | Date | Last update date (YYYY-MM-DD) | `"2024-12-27"` |
| `featured` | Boolean | Show in featured section | `true` or `false` |
| `imageUrl` | String | Thumbnail image path (from /public) | `"/clean_rhythm_ecg/afib.jpg"` |
| `tags` | Array | Categories for filtering | See below |

### Tag Options

Use 2-4 relevant tags from this list:

```yaml
tags:
  - ECG Basics
  - Normal Rhythms
  - Cardiac Arrhythmias
  - Heart Block
  - Bundle Branch Block
  - Myocardial Infarction
  - STEMI Recognition
  - Emergency Medicine
  - Cardiology
  - Critical Care
  - Clinical Skills
  - Diagnostic Tests
  - ECG Interpretation
  - Medical Education
  - Nursing Education
  - Paramedic Training
  - Advanced Life Support
  - Pacemaker Rhythms
  - Electrophysiology
  - Tachyarrhythmias
```

### Complete Frontmatter Example

```yaml
---
title: "Atrial Fibrillation: Complete ECG Recognition and Emergency Management Guide"
slug: "atrial-fibrillation-ecg-recognition-and-emergency-management"
excerpt: "Master atrial fibrillation identification on ECG with irregularly irregular rhythm, absent P waves, and rapid ventricular rates. Includes emergency management protocols and clinical pearls."
author: "Dr. Raj K Reddy"
authorId: "raj-k-reddy"
publishedAt: "2024-12-27"
updatedAt: "2024-12-27"
featured: true
imageUrl: "/clean_rhythm_ecg/atrial_fibrillation.jpg"
tags:
  - Cardiac Arrhythmias
  - ECG Interpretation
  - Emergency Medicine
  - Critical Care
---
```

---

## Markdown Syntax

### Headings

Use proper heading hierarchy for structure and SEO:

```markdown
## Main Section (H2 - Auto-generated in TOC)

### Subsection (H3 - Auto-generated in TOC)

#### Minor Point (H4 - Not in TOC)
```

**Rules:**
- Never use `# H1` (reserved for article title)
- Start with `## H2` for main sections
- Use `### H3` for subsections
- Maximum 3 levels deep for readability

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for medical terms
`code or technical terms` for inline code
~~Strikethrough~~ (supported with remark-gfm)
```

### Lists

#### Unordered Lists
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

#### Ordered Lists
```markdown
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step
```

#### Definition Lists
```markdown
**Term**: Definition here

**Another Term**: Another definition
```

### Links

```markdown
[Link text](https://example.com)
[Internal link](/tools/qtc-calculator)
[Anchor link](#section-name)
```

### Blockquotes

Perfect for clinical pearls and important notes:

```markdown
> **Clinical Pearl:** This is an important insight for practitioners.

> **Warning:** Critical safety information here.
```

### Tables

```markdown
| Parameter | Normal Range | Units |
|-----------|--------------|-------|
| Heart Rate | 60-100 | bpm |
| PR Interval | 0.12-0.20 | seconds |
| QRS Duration | <0.12 | seconds |
```

### Code Blocks

For technical content or algorithms:

````markdown
```
ACLS Algorithm:
1. Check pulse
2. Start CPR if needed
3. Attach monitor/defibrillator
4. Assess rhythm
```
````

### Horizontal Rules

Use sparingly to separate major sections:

```markdown
---
```

---

## Image Management

### Image Placement

Images go in `/public/` folder and are referenced with absolute paths:

```markdown
![Alt text description](/folder/image-name.jpg)
```

### Directory Structure

```
public/
├── clean_rhythm_ecg/       # Clean ECG examples
├── MI_ecg_database/        # Myocardial infarction ECGs
├── medical_accurate/       # General medical images
├── best_ecg_images/        # High-quality featured images
└── logo/                   # Branding assets
```

### Image Requirements

**Technical Specifications:**
- **Format:** JPG (preferred) or PNG
- **Resolution:** 1200x800px minimum
- **File Size:** <200KB (optimize before upload)
- **Aspect Ratio:** 3:2 or 16:9 recommended

**Optimization Tools:**
- [TinyPNG](https://tinypng.com/) - Free compression
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- ImageMagick CLI: `convert input.jpg -quality 85 -resize 1200x output.jpg`

### Alt Text Best Practices

Write descriptive alt text for accessibility and SEO:

```markdown
✅ GOOD:
![12-lead ECG showing atrial fibrillation with irregularly irregular rhythm and absent P waves](/clean_rhythm_ecg/afib.jpg)

❌ BAD:
![ECG](/image.jpg)
![Picture](/afib.jpg)
```

**Alt Text Formula:**
```
[Content Type] + [Key Features] + [Clinical Context]
```

**Examples:**
```markdown
![12-lead ECG demonstrating normal sinus rhythm with regular P waves, PR interval 0.16s, and narrow QRS complexes](/clean_rhythm_ecg/normal_sinus.jpg)

![ECG strip showing third-degree AV block with complete dissociation between P waves and QRS complexes](/clean_rhythm_ecg/complete_heart_block.jpg)

![Anterolateral STEMI with ST elevation in leads I, aVL, and V4-V6 with reciprocal ST depression in inferior leads](/MI_ecg_database/anterolateral_stemi.jpg)
```

### Adding Images to Articles

**Basic Syntax:**
```markdown
## ECG Findings

Here's what you'll see on the 12-lead ECG:

![12-lead ECG showing atrial fibrillation with irregularly irregular rhythm, absent P waves, and rapid ventricular response at 140 bpm](/clean_rhythm_ecg/atrial_fibrillation.jpg)

Notice the key characteristics highlighted in this ECG strip.
```

**Multiple Images:**
```markdown
## Comparison: Before and After Treatment

![Pre-treatment ECG showing atrial fibrillation with RVR at 150 bpm](/clean_rhythm_ecg/afib_before.jpg)

![Post-treatment ECG showing controlled atrial fibrillation at 80 bpm after rate control medication](/clean_rhythm_ecg/afib_after.jpg)
```

### Image Naming Convention

**Format:** `condition-variant-optional.jpg`

**Examples:**
```
✅ GOOD:
- atrial-fibrillation-rvr.jpg
- normal-sinus-rhythm.jpg
- stemi-anterior-acute.jpg
- ventricular-tachycardia-monomorphic.jpg

❌ BAD:
- ECG1.jpg
- image.jpg
- 20241227.jpg
- final_FINAL_v2.jpg
```

---

## SEO Best Practices

### Meta Optimization

**Title (frontmatter `title` field):**
- Length: 60-70 characters
- Include primary keyword
- Format: `"[Condition]: [Type] Guide"`
- Example: `"Atrial Fibrillation: Complete ECG Recognition Guide"`

**Excerpt (frontmatter `excerpt` field):**
- Length: 150-160 characters
- Include primary and secondary keywords
- Compelling call-to-action
- No duplicate titles
- Example: `"Master atrial fibrillation identification on ECG with irregularly irregular rhythm, absent P waves, and rapid ventricular rates. Includes emergency management protocols."`

### Keyword Strategy

**Primary Keyword:** In title, first H2, and first paragraph
**Secondary Keywords:** Throughout H2/H3 headings naturally
**Long-tail Keywords:** In body content and alt text

**Example Structure:**
```markdown
---
title: "Atrial Fibrillation: ECG Recognition Guide"  # Primary keyword
excerpt: "Learn atrial fibrillation ECG patterns..." # Primary + secondary
---

## What is Atrial Fibrillation? # Primary keyword in first H2

Atrial fibrillation (AFib) is... # Primary keyword in first paragraph

### ECG Characteristics of Atrial Fibrillation # Secondary keyword

### Clinical Management of AFib # Long-tail keyword
```

### Internal Linking

Link to related articles and tools:

```markdown
Learn more about [QTc calculation](/tools/qtc-calculator) for patients on antiarrhythmic medications.

For a broader overview, see our guide on [ECG interpretation basics](/blog/ecg-interpretation-guide).

Related: [Ventricular Tachycardia Recognition](/blog/ventricular-tachycardia-ecg-recognition)
```

### Schema.org Structured Data

The system automatically generates:
- **Article Schema** (title, author, dates, image)
- **MedicalWebPage Schema** (medical context)
- **BreadcrumbList Schema** (navigation)

Ensure your frontmatter is complete for proper schema generation.

---

## Step-by-Step Tutorial

### Example: Creating "Sinus Bradycardia" Article

#### Step 1: Create the File

Create `content/articles/sinus-bradycardia-ecg-recognition.mdx`

#### Step 2: Add Frontmatter

```yaml
---
title: "Sinus Bradycardia: ECG Recognition and Clinical Management"
slug: "sinus-bradycardia-ecg-recognition"
excerpt: "Understand sinus bradycardia with heart rate <60 bpm, regular rhythm, and normal P waves. Learn when it's normal versus pathological and treatment approaches."
author: "Dr. Raj K Reddy"
authorId: "raj-k-reddy"
publishedAt: "2024-12-27"
updatedAt: "2024-12-27"
featured: false
imageUrl: "/clean_rhythm_ecg/sinus_bradycardia.jpg"
tags:
  - Normal Rhythms
  - ECG Interpretation
  - Cardiology
  - Clinical Skills
---
```

#### Step 3: Write the Introduction

```markdown
## What is Sinus Bradycardia?

Sinus bradycardia is a cardiac rhythm where the heart rate is less than 60 beats per minute (bpm), but the rhythm originates from the sinoatrial (SA) node and follows normal conduction pathways.

While often benign in athletes and during sleep, sinus bradycardia can indicate underlying pathology in certain clinical contexts.
```

#### Step 4: Add Key Characteristics

```markdown
## ECG Characteristics

### Rate
- **Heart rate <60 bpm**
- Calculate using the 300 rule or R-R interval method

### Rhythm
- **Regular rhythm** with consistent R-R intervals
- Normal sinus rhythm pattern, just slower

### P Waves
- **Present before each QRS complex**
- **Upright in leads I, II, aVL, aVF**
- **Inverted in aVR**
- Same morphology throughout

### PR Interval
- **0.12-0.20 seconds** (normal)
- Consistent across all beats

### QRS Complex
- **Narrow (<0.12 seconds)** if no bundle branch block
- Normal morphology
```

#### Step 5: Add Clinical Image

```markdown
## Example ECG

![12-lead ECG demonstrating sinus bradycardia at 45 bpm with regular rhythm, normal P waves before each QRS, and normal PR interval](/clean_rhythm_ecg/sinus_bradycardia.jpg)

Note the regular spacing between beats and the presence of normal P-QRS-T complexes.
```

#### Step 6: Clinical Context

```markdown
## Clinical Significance

### Physiological (Normal) Causes
- **Athletes**: Increased vagal tone from conditioning
- **Sleep**: Normal during rest and sleep cycles
- **Young, healthy adults**: Resting heart rate 50-60 bpm

### Pathological Causes
- **Medications**:
  - Beta-blockers (metoprolol, atenolol)
  - Calcium channel blockers (diltiazem, verapamil)
  - Digoxin
  - Antiarrhythmics (amiodarone, sotalol)
  
- **Cardiac Conditions**:
  - Sick sinus syndrome
  - Increased intracranial pressure
  - Hypothyroidism
  - Hypothermia
  - Inferior wall MI affecting SA node

### When to Treat

Treatment is indicated when:
- **Symptomatic**: Dizziness, syncope, fatigue
- **Hemodynamic instability**: Hypotension, altered mental status
- **Escape rhythms present**: Junctional or ventricular escape

> **Clinical Pearl:** Not all sinus bradycardia requires treatment. If the patient is asymptomatic and hemodynamically stable, observation is appropriate.
```

#### Step 7: Management

```markdown
## Management

### Asymptomatic and Stable
- **Observation only**
- Review medications
- Monitor for symptoms

### Symptomatic or Unstable
1. **Atropine 0.5-1 mg IV**
   - First-line for symptomatic bradycardia
   - May repeat every 3-5 minutes
   - Max total dose: 3 mg

2. **Transcutaneous Pacing**
   - If atropine ineffective
   - Temporary measure

3. **Dopamine or Epinephrine Infusion**
   - Alternative to pacing
   - Dopamine: 5-20 mcg/kg/min
   - Epinephrine: 2-10 mcg/min

4. **Permanent Pacemaker**
   - For persistent symptomatic bradycardia
   - Sick sinus syndrome
   - High-grade AV block
```

#### Step 8: Add Related Links

```markdown
## Related Topics

- [Normal Sinus Rhythm](/blog/normal-sinus-rhythm-basics)
- [Sinus Tachycardia](/blog/sinus-tachycardia-ecg-recognition)
- [Heart Rate Calculation](/tools/heart-rate-calculator)
- [First-Degree AV Block](/blog/first-degree-av-block-ecg-recognition)

## Practice Questions

Test your knowledge with our [ECG Practice Tests](/practice-tests).
```

#### Step 9: Test Locally

```bash
# Navigate to project directory
cd c:\Users\rajka\epulsepoints-website

# Start development server
npm run dev

# Open browser to http://localhost:3000
# Navigate to http://localhost:3000/blog/sinus-bradycardia-ecg-recognition
```

#### Step 10: Build and Deploy

```bash
# Build for production
npm run build

# Verify no errors
# If successful, deploy to hosting
```

---

## Complete Article Template

Use this template for new articles:

```markdown
---
title: "[Condition]: [Type] Guide"
slug: "condition-name-guide"
excerpt: "Brief description with keywords for SEO (150-160 chars)"
author: "Dr. Raj K Reddy"
authorId: "raj-k-reddy"
publishedAt: "2024-12-27"
updatedAt: "2024-12-27"
featured: false
imageUrl: "/folder/image-name.jpg"
tags:
  - Primary Category
  - Secondary Category
  - Tertiary Category
---

## What is [Condition]?

Brief introduction explaining the condition in 2-3 sentences.

## ECG Characteristics

### Rate
- Normal, fast, or slow?

### Rhythm
- Regular or irregular?

### P Waves
- Present, absent, or abnormal?

### PR Interval
- Normal, short, or prolonged?

### QRS Complex
- Narrow or wide?

## Example ECG

![Descriptive alt text for the ECG image](/folder/image-name.jpg)

## Clinical Significance

### Causes
- List common causes

### Symptoms
- List common symptoms

### When to Worry
- Red flags and concerning features

## Management

### Initial Assessment
1. ABCs (Airway, Breathing, Circulation)
2. Vital signs
3. Symptom assessment

### Treatment
- Specific interventions
- Medications
- Procedures

## Related Topics

- [Related Article 1](/blog/related-1)
- [Related Article 2](/blog/related-2)
- [Related Tool](/tools/tool-name)
```

---

## Troubleshooting

### Images Not Showing

**Problem:** Images display in editor but not on website

**Solutions:**
1. ✅ Verify image is in `/public/` directory
2. ✅ Use absolute path starting with `/`
   ```markdown
   ✅ CORRECT: ![Alt text](/clean_rhythm_ecg/image.jpg)
   ❌ WRONG: ![Alt text](clean_rhythm_ecg/image.jpg)
   ❌ WRONG: ![Alt text](../public/image.jpg)
   ```
3. ✅ Check filename matches exactly (case-sensitive)
4. ✅ Ensure no spaces in filename (use hyphens)
5. ✅ Clear Next.js cache: `rm -rf .next` then `npm run dev`

### Build Errors

**Problem:** `npm run build` fails

**Common Causes:**
1. **Missing frontmatter field:**
   ```
   Error: Missing required field 'excerpt'
   ```
   Solution: Add all required frontmatter fields

2. **Invalid date format:**
   ```
   Error: Invalid date format
   ```
   Solution: Use `YYYY-MM-DD` format: `"2024-12-27"`

3. **Duplicate slugs:**
   ```
   Error: Duplicate slug detected
   ```
   Solution: Ensure each article has a unique slug

4. **Malformed YAML:**
   ```
   Error: Unable to parse frontmatter
   ```
   Solution: Check YAML syntax, proper indentation, matching quotes

### Article Not Appearing

**Problem:** Article doesn't show in blog list

**Solutions:**
1. ✅ Check file is in `content/articles/` directory
2. ✅ Verify file has `.mdx` or `.md` extension
3. ✅ Ensure frontmatter is properly formatted
4. ✅ Rebuild: `npm run build`
5. ✅ Check `publishedAt` date is not in future

### Formatting Issues

**Problem:** Markdown not rendering correctly

**Solutions:**
1. **Headings not showing in TOC:**
   - Only `## H2` and `### H3` appear in TOC
   - Ensure proper heading levels

2. **Lists not rendering:**
   - Add blank line before and after lists
   - Check indentation (2 spaces for nested items)

3. **Code blocks not styled:**
   - Use triple backticks: ` ``` `
   - Add language identifier if needed: ` ```javascript `

4. **Tables not displaying:**
   - Ensure proper markdown table syntax
   - Add blank lines before/after table
   - Check all rows have same column count

### SEO Issues

**Problem:** Article not ranking or appearing in search

**Solutions:**
1. ✅ Verify `excerpt` is 150-160 characters with keywords
2. ✅ Include primary keyword in title, first H2, first paragraph
3. ✅ Add descriptive alt text to all images
4. ✅ Use proper heading hierarchy (H2 → H3 → H4)
5. ✅ Include internal links to related content
6. ✅ Ensure `featured: true` for important articles
7. ✅ Submit sitemap to Google Search Console

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev                # Start dev server (http://localhost:3000)
npm run build             # Production build
npm run start             # Start production server

# Verification
npm run lint              # Check for errors
```

### File Paths

```
Article File:    content/articles/your-slug.mdx
Images:          public/clean_rhythm_ecg/image.jpg
URL:             https://epulsepoints.com/blog/your-slug
```

### Frontmatter Checklist

- [ ] title (60-70 chars)
- [ ] slug (matches filename)
- [ ] excerpt (150-160 chars)
- [ ] author
- [ ] authorId
- [ ] publishedAt (YYYY-MM-DD)
- [ ] updatedAt (YYYY-MM-DD)
- [ ] featured (true/false)
- [ ] imageUrl (absolute path from /public)
- [ ] tags (2-4 tags from approved list)

### Image Checklist

- [ ] Image in `/public/` folder
- [ ] Optimized (<200KB)
- [ ] Proper dimensions (1200x800px min)
- [ ] Descriptive filename (hyphen-separated)
- [ ] Alt text written (descriptive, keyword-rich)
- [ ] Absolute path used (`/folder/image.jpg`)

---

## Additional Resources

### Internal Links
- [Main Documentation](README.md)
- [SEO Implementation Guide](SEO_IMPLEMENTATION_SUMMARY.md)
- [Image SEO Guide](IMAGE_SEO_IMPLEMENTATION.md)
- [Deployment Guide](DEPLOYMENT.md)

### External Resources
- [Markdown Guide](https://www.markdownguide.org/)
- [MDX Documentation](https://mdxjs.com/)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Medical Schemas](https://schema.org/MedicalWebPage)

---

## Support

For technical issues:
1. Check [Troubleshooting](#troubleshooting) section
2. Review build logs for specific errors
3. Verify all requirements met
4. Test in development mode first (`npm run dev`)

For content questions:
- Ensure medical accuracy
- Follow clinical guidelines
- Cite sources when appropriate
- Review existing articles for style consistency

---

**Last Updated:** 2024-12-27
**Version:** 1.0
**Maintained by:** Dr. Raj K Reddy
