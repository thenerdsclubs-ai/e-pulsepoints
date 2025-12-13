import json
import re

def create_slug(title):
    """Convert title to URL-friendly slug"""
    # Convert to lowercase
    slug = title.lower()
    # Remove special characters and replace spaces with hyphens
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    # Remove leading/trailing hyphens
    slug = slug.strip('-')
    # Limit length to 100 characters
    return slug[:100]

# Process clean rhythm ECG articles
with open('../public/scripts/ecg-blog-articles-v2.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

for article in articles:
    article['slug'] = create_slug(article['title'])

with open('../public/scripts/ecg-blog-articles-v2.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)

print(f"✅ Added slugs to {len(articles)} articles in ecg-blog-articles-v2.json")

# Process best ECG images articles
with open('../public/scripts/ecg-blog-best-images.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

for article in articles:
    article['slug'] = create_slug(article['title'])

with open('../public/scripts/ecg-blog-best-images.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)

print(f"✅ Added slugs to {len(articles)} articles in ecg-blog-best-images.json")

# Show some examples
with open('../public/scripts/ecg-blog-articles-v2.json', 'r', encoding='utf-8') as f:
    examples = json.load(f)
    print("\n📝 Example slugs (first 3):")
    for i, article in enumerate(examples[:3], 1):
        print(f"  {i}. {article['title']}")
        print(f"     → {article['slug']}\n")
