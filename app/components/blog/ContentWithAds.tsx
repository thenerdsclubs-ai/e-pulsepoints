'use client';

import ArticleAd from '@/app/components/ads/ArticleAd';

interface ContentWithAdsProps {
  htmlContent: string;
}

export default function ContentWithAds({ htmlContent }: ContentWithAdsProps) {
  // Split content into sections and inject ads
  const injectAds = (content: string) => {
    // Split by h2 headings (major sections)
    const sections = content.split(/(<h2[^>]*>.*?<\/h2>)/gi);
    const result: React.ReactNode[] = [];
    let adCount = 0;
    
    sections.forEach((section, index) => {
      result.push(
        <div
          key={`section-${index}`}
          dangerouslySetInnerHTML={{ __html: section }}
        />
      );
      
      // Add article ad after every 2nd major section (h2)
      if (section.match(/<h2[^>]*>/gi) && adCount < 2) {
        adCount++;
        result.push(
          <ArticleAd key={`ad-${adCount}`} className="my-12" />
        );
      }
    });
    
    return result;
  };

  return (
    <div className="medical-article-content
      prose prose-lg lg:prose-xl max-w-none
      
      /* Base Typography - PDF-like */
      [&>*]:max-w-[75ch]
      
      /* Headings - Chapter-like */
      prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
      
      /* H2 - Major Sections (like PDF chapters) */
      prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl 
      prose-h2:mt-16 md:prose-h2:mt-20 lg:prose-h2:mt-24
      prose-h2:mb-8 md:prose-h2:mb-10
      prose-h2:pb-6
      prose-h2:border-b-[3px] prose-h2:border-blue-400
      prose-h2:relative
      prose-h2:scroll-mt-24
      after:prose-h2:content-[''] after:prose-h2:absolute after:prose-h2:left-0 after:prose-h2:bottom-0 
      after:prose-h2:w-20 after:prose-h2:h-[3px] after:prose-h2:bg-blue-600
      
      /* H3 - Subsections */
      prose-h3:text-xl md:prose-h3:text-2xl lg:prose-h3:text-3xl
      prose-h3:mt-12 md:prose-h3:mt-14 lg:prose-h3:mt-16
      prose-h3:mb-6 md:prose-h3:mb-7
      prose-h3:text-blue-900
      prose-h3:border-l-4 prose-h3:border-blue-500
      prose-h3:pl-6
      prose-h3:py-2
      prose-h3:bg-gradient-to-r prose-h3:from-blue-50/50 prose-h3:to-transparent
      prose-h3:scroll-mt-24
      
      /* H4 - Minor Sections */
      prose-h4:text-lg md:prose-h4:text-xl lg:prose-h4:text-2xl
      prose-h4:mt-8 md:prose-h4:mt-10
      prose-h4:mb-4 md:prose-h4:mb-5
      prose-h4:text-slate-800
      prose-h4:font-bold
      prose-h4:scroll-mt-24
      
      /* Paragraphs - Optimal line height for readability */
      prose-p:text-slate-700 prose-p:leading-[1.8]
      prose-p:text-base md:prose-p:text-lg lg:prose-p:text-xl
      prose-p:mb-6 md:prose-p:mb-7
      prose-p:max-w-[75ch]
      
      /* Links */
      prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline 
      hover:prose-a:underline prose-a:underline-offset-4
      prose-a:transition-all
      
      /* Strong/Bold */
      prose-strong:text-slate-900 prose-strong:font-bold
      
      /* Lists - Better spacing */
      prose-ul:my-8 md:prose-ul:my-10 prose-ul:space-y-3
      prose-ol:my-8 md:prose-ol:my-10 prose-ol:space-y-3
      prose-li:text-slate-700 prose-li:leading-[1.8] 
      prose-li:text-base md:prose-li:text-lg
      prose-li:pl-2
      [&_ul]:list-disc [&_ul]:marker:text-blue-600 [&_ul]:pl-6
      [&_ol]:list-decimal [&_ol]:marker:text-blue-600 [&_ol]:marker:font-bold [&_ol]:pl-6
      [&_li>ul]:mt-3 [&_li>ol]:mt-3
      [&_li_strong]:text-slate-900 [&_li_strong]:font-bold
      
      /* Images - Enhanced presentation */
      prose-img:rounded-2xl 
      prose-img:shadow-2xl 
      prose-img:my-10 md:prose-img:my-14
      prose-img:border-2 prose-img:border-slate-200
      prose-img:w-full
      prose-img:transition-transform prose-img:duration-300
      hover:prose-img:scale-[1.02]
      
      /* Code */
      prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 
      prose-code:rounded prose-code:text-sm 
      prose-code:text-red-600 prose-code:font-mono
      prose-code:before:content-[''] prose-code:after:content-['']
      
      prose-pre:bg-slate-900 prose-pre:text-slate-50 
      prose-pre:p-6 md:prose-pre:p-8
      prose-pre:rounded-2xl prose-pre:overflow-x-auto 
      prose-pre:my-8 md:prose-pre:my-10
      prose-pre:shadow-xl
      
      /* Blockquotes - Styled like callouts */
      prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 
      prose-blockquote:pl-8 prose-blockquote:pr-6
      prose-blockquote:py-6
      prose-blockquote:italic 
      prose-blockquote:bg-gradient-to-r prose-blockquote:from-indigo-50 prose-blockquote:to-transparent
      prose-blockquote:rounded-r-2xl
      prose-blockquote:my-8 md:prose-blockquote:my-10
      prose-blockquote:shadow-sm
      prose-blockquote:text-slate-700
      
      /* Tables - Professional styling */
      prose-table:w-full prose-table:my-10 md:prose-table:my-12
      prose-table:border-2 prose-table:border-slate-300 
      prose-table:rounded-xl prose-table:overflow-hidden
      prose-table:shadow-lg
      
      prose-thead:bg-gradient-to-r prose-thead:from-blue-600 prose-thead:to-indigo-600
      prose-thead:text-white
      
      prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-bold
      prose-th:text-base md:prose-th:text-lg
      
      prose-td:px-6 prose-td:py-4 prose-td:border-t prose-td:border-slate-200
      prose-td:text-slate-700
      
      prose-tbody:bg-white
      [&_tbody_tr:nth-child(even)]:bg-slate-50
      [&_tbody_tr]:transition-colors
      hover:[&_tbody_tr]:bg-blue-50
      
      /* Horizontal Rules - Section dividers */
      prose-hr:border-slate-300 prose-hr:my-16 md:prose-hr:my-20
      prose-hr:border-t-2
      
      /* Ensure content doesn't overflow */
      [&>*]:break-words
      [&_*]:scroll-mt-24
      
      /* Better spacing for nested elements */
      [&>*+*]:mt-6
      [&_h2+*]:mt-8
      [&_h3+*]:mt-6
      [&_h4+*]:mt-4
      "
    >
      {injectAds(htmlContent)}
    </div>
  );
}