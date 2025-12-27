#!/usr/bin/env python3
import os
import re
import yaml
from pathlib import Path

def read_yaml_safe(file_path):
    """Read YAML file with proper handling of quotes"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Fix unescaped quotes in descriptions and titles
    lines = content.split('\n')
    fixed_lines = []
    
    for line in lines:
        if line.strip().startswith(('title:', 'description:')):
            # Find the colon and extract the value part
            if ':' in line:
                key_part = line.split(':', 1)[0]
                value_part = line.split(':', 1)[1].strip()
                
                # If it's already quoted, fix internal quotes
                if value_part.startswith('"') and value_part.endswith('"'):
                    # Remove outer quotes, escape internal quotes, and re-add outer quotes
                    inner_content = value_part[1:-1]
                    inner_content = inner_content.replace('"', '\\"')
                    line = f'{key_part}: "{inner_content}"'
                
        fixed_lines.append(line)
    
    fixed_content = '\n'.join(fixed_lines)
    
    try:
        return yaml.safe_load(fixed_content)
    except yaml.YAMLError as e:
        print(f"Error parsing {file_path}: {e}")
        return None

def write_yaml_safe(file_path, data):
    """Write YAML file with proper quote escaping"""
    with open(file_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

def main():
    videos_dir = Path("content/videos")
    
    # Define categorization fixes
    category_fixes = {
        # Change "Conduction Disorders" to "Conduction Blocks"
        "Conduction Disorders": "Conduction Blocks",
        # MI/STEMI related videos that should be in "STEMI & MI"
        "MI_KEYWORDS": [
            "stemi", "myocardial infarction", "heart attack", "mi ", "anterior wall", 
            "posterior wall", "lateral wall", "septal wall", "inferior wall", 
            "st elevation", "st-elevation", "nstemi"
        ]
    }
    
    # Videos that need specific category corrections
    specific_corrections = {
        # Based on title analysis, these should be in STEMI & MI
        "why-st-segment-elevation-happens-in-a-heart-attack-doctor-explains": "STEMI & MI",
        "de-winter-t-waves-explained-the-hidden-stemi-equivalent-on-ecg": "STEMI & MI",
        "what-is-ihd-ischemic-heart-disease": "STEMI & MI",
        
        # Arrhythmia videos
        "ventricular-fibrillation-v-fib-terminal-cardiac-rhythm": "Arrhythmias",
        
        # Proper ECG Interpretation videos
        "hyperkalemia-explained-causes-ecg-symptoms-treatment-icu-essentials": "ECG Interpretation",
        "master-ecg-spot-potassium-abnormalities-from-hypo-to-hyperkalemia": "ECG Interpretation",
    }
    
    fixes_applied = 0
    
    for yaml_file in videos_dir.glob("*.yaml"):
        data = read_yaml_safe(yaml_file)
        if not data:
            continue
            
        original_category = data.get('category', '')
        new_category = original_category
        reason = ""
        
        # Fix the "Conduction Disorders" -> "Conduction Blocks" 
        if original_category == "Conduction Disorders":
            new_category = "Conduction Blocks"
            reason = "Changed 'Conduction Disorders' to 'Conduction Blocks'"
        
        # Check specific corrections
        file_stem = yaml_file.stem
        if file_stem in specific_corrections:
            new_category = specific_corrections[file_stem]
            reason = f"Specific correction to {new_category}"
        
        # Check if title/description contains MI/STEMI keywords and should be in STEMI & MI
        title = data.get('title', '').lower()
        description = data.get('description', '').lower()
        
        if original_category not in ["STEMI & MI", "Myocardial Infarction"]:
            for keyword in category_fixes["MI_KEYWORDS"]:
                if keyword in title or keyword in description:
                    new_category = "STEMI & MI"
                    reason = f"Contains MI/STEMI keywords: {keyword}"
                    break
        
        # Apply the fix if needed
        if new_category != original_category and new_category:
            data['category'] = new_category
            write_yaml_safe(yaml_file, data)
            fixes_applied += 1
            print(f"✓ Fixed {yaml_file.name}: {original_category} → {new_category} ({reason})")
    
    print(f"\nTotal fixes applied: {fixes_applied}")
    
    # Generate category summary
    print("\nCategory summary after fixes:")
    category_counts = {}
    for yaml_file in videos_dir.glob("*.yaml"):
        data = read_yaml_safe(yaml_file)
        if data and 'category' in data:
            cat = data['category']
            category_counts[cat] = category_counts.get(cat, 0) + 1
    
    for cat, count in sorted(category_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"  {cat}: {count}")

if __name__ == "__main__":
    main()