import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useState } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  category: string;
  excerpt: string;
  imageUrl?: string;
  featured?: boolean;
}

export class BlogPDFGenerator {
  private pdf: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private currentY: number;
  
  constructor() {
    this.pdf = new jsPDF('p', 'mm', 'a4');
    this.pageWidth = this.pdf.internal.pageSize.getWidth();
    this.pageHeight = this.pdf.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
  }

  async generateBlogPostPDF(post: BlogPost): Promise<void> {
    try {
      // Add header with logo and branding
      await this.addHeader();
      
      // Add title section
      this.addTitle(post.title);
      
      // Add metadata section
      this.addMetadata(post);
      
      // Add content
      await this.addContent(post.content);
      
      // Add footer to all pages
      this.addFooterToAllPages();
      
      // Download the PDF
      this.pdf.save(`${this.sanitizeFilename(post.title)}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  private async addHeader(): Promise<void> {
    // Add logo area (if logo is available)
    this.pdf.setFillColor(59, 130, 246); // Blue background
    this.pdf.rect(0, 0, this.pageWidth, 25, 'F');
    
    // Add E-PulsePoints branding
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.setFontSize(20);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('E-PulsePoints', this.margin, 15);
    
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text('ECG Learning Platform | ecgkid.com', this.margin, 20);
    
    this.currentY = 35;
  }

  private addTitle(title: string): void {
    // Title background
    this.pdf.setFillColor(248, 250, 252); // Light gray background
    this.pdf.rect(this.margin - 5, this.currentY - 5, this.pageWidth - (this.margin * 2) + 10, 25, 'F');
    
    // Title text
    this.pdf.setTextColor(15, 23, 42); // Slate 900
    this.pdf.setFontSize(18);
    this.pdf.setFont('helvetica', 'bold');
    
    // Word wrap title if needed
    const titleLines = this.pdf.splitTextToSize(title, this.pageWidth - (this.margin * 2));
    this.pdf.text(titleLines, this.margin, this.currentY + 10);
    
    this.currentY += (titleLines.length * 7) + 20;
  }

  private addMetadata(post: BlogPost): void {
    // Metadata section background
    this.pdf.setFillColor(239, 246, 255); // Blue 50
    this.pdf.rect(this.margin - 5, this.currentY - 5, this.pageWidth - (this.margin * 2) + 10, 30, 'F');
    
    this.pdf.setTextColor(30, 64, 175); // Blue 800
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'bold');
    
    // Author
    this.pdf.text('Author:', this.margin, this.currentY + 5);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(post.author, this.margin + 25, this.currentY + 5);
    
    // Published date
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Published:', this.margin, this.currentY + 12);
    this.pdf.setFont('helvetica', 'normal');
    const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.pdf.text(publishedDate, this.margin + 30, this.currentY + 12);
    
    // Category
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Category:', this.pageWidth / 2, this.currentY + 5);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(post.category, (this.pageWidth / 2) + 25, this.currentY + 5);
    
    // Tags
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Tags:', this.pageWidth / 2, this.currentY + 12);
    this.pdf.setFont('helvetica', 'normal');
    const tagsText = post.tags.slice(0, 3).join(', ');
    this.pdf.text(tagsText, (this.pageWidth / 2) + 20, this.currentY + 12);
    
    this.currentY += 40;
  }

  private async addContent(content: string): Promise<void> {
    // Create a temporary div with styled content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.processMarkdownContent(content);
    tempDiv.style.width = `${(this.pageWidth - (this.margin * 2)) * 3.78}px`; // Convert mm to px
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.6';
    tempDiv.style.color = '#1f2937';
    tempDiv.style.padding = '20px';
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    
    // Apply additional styling
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      h1, h2, h3 { color: #1e40af; margin: 20px 0 10px 0; }
      h1 { font-size: 20px; }
      h2 { font-size: 16px; }
      h3 { font-size: 14px; }
      p { margin: 10px 0; }
      ul, ol { margin: 10px 0; padding-left: 20px; }
      li { margin: 5px 0; }
      strong { color: #374151; }
      code { background-color: #f3f4f6; padding: 2px 4px; border-radius: 3px; }
      blockquote { 
        background-color: #fef3c7; 
        border-left: 4px solid #f59e0b; 
        padding: 10px; 
        margin: 15px 0; 
        font-style: italic;
      }
      .highlight { 
        background-color: #dbeafe; 
        padding: 15px; 
        border-radius: 8px; 
        margin: 15px 0;
        border-left: 4px solid #3b82f6;
      }
    `;
    
    document.head.appendChild(styleElement);
    document.body.appendChild(tempDiv);
    
    try {
      // Convert HTML content to canvas with higher resolution
      const canvas = await html2canvas(tempDiv, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: tempDiv.scrollWidth,
        height: tempDiv.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = this.pageWidth - (this.margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Calculate available space on current page
      const availableHeight = this.pageHeight - this.currentY - this.margin;
      
      if (imgHeight <= availableHeight) {
        // Content fits on current page
        this.pdf.addImage(imgData, 'PNG', this.margin, this.currentY, imgWidth, imgHeight);
        this.currentY += imgHeight + 10;
      } else {
        // Content needs to be split across multiple pages
        await this.addContentAcrossPages(canvas, imgWidth, imgHeight);
      }
      
    } finally {
      // Clean up
      document.body.removeChild(tempDiv);
      document.head.removeChild(styleElement);
    }
  }

  private async addContentAcrossPages(canvas: HTMLCanvasElement, imgWidth: number, imgHeight: number): Promise<void> {
    const pageContentHeight = this.pageHeight - (this.margin * 2);
    const availableHeight = this.pageHeight - this.currentY - this.margin;
    
    // Calculate how many pages we need
    const remainingHeight = imgHeight - availableHeight;
    const additionalPages = Math.ceil(remainingHeight / pageContentHeight);
    
    // Create a canvas for the current page
    const currentPageCanvas = document.createElement('canvas');
    const currentCtx = currentPageCanvas.getContext('2d');
    currentPageCanvas.width = canvas.width;
    currentPageCanvas.height = (availableHeight * canvas.height) / imgHeight;
    
    if (currentCtx) {
      // Draw the portion that fits on current page
      currentCtx.drawImage(
        canvas,
        0, 0, canvas.width, currentPageCanvas.height,
        0, 0, canvas.width, currentPageCanvas.height
      );
      
      const currentPageData = currentPageCanvas.toDataURL('image/png');
      this.pdf.addImage(currentPageData, 'PNG', this.margin, this.currentY, imgWidth, availableHeight);
    }
    
    // Add remaining content on new pages
    let remainingCanvasHeight = canvas.height - currentPageCanvas.height;
    let sourceY = currentPageCanvas.height;
    
    for (let i = 0; i < additionalPages; i++) {
      this.pdf.addPage();
      this.currentY = this.margin;
      
      const pageCanvas = document.createElement('canvas');
      const pageCtx = pageCanvas.getContext('2d');
      
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(remainingCanvasHeight, (pageContentHeight * canvas.height) / imgHeight);
      
      if (pageCtx) {
        pageCtx.drawImage(
          canvas,
          0, sourceY, canvas.width, pageCanvas.height,
          0, 0, canvas.width, pageCanvas.height
        );
        
        const pageData = pageCanvas.toDataURL('image/png');
        const pageImgHeight = (pageCanvas.height * imgWidth) / canvas.width;
        
        this.pdf.addImage(pageData, 'PNG', this.margin, this.currentY, imgWidth, pageImgHeight);
        this.currentY += pageImgHeight + 10;
        
        sourceY += pageCanvas.height;
        remainingCanvasHeight -= pageCanvas.height;
      }
    }
  }

  private processMarkdownContent(content: string): string {
    // Convert markdown-like content to HTML
    let html = content;
    
    // Convert headers
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    
    // Convert bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italic text
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Convert line breaks to paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Convert lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    
    // Add highlight boxes for important content
    html = html.replace(/### (Key Points?|Important|Note):?\s*/gi, '<div class="highlight"><h3>$1</h3>');
    html = html.replace(/### (Clinical Significance|Management|Treatment):?\s*/gi, '</div><div class="highlight"><h3>$1</h3>');
    
    return html;
  }

  private addFooterToAllPages(): void {
    const totalPages = this.pdf.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
      this.pdf.setPage(i);
      
      const footerY = this.pageHeight - 15;
      
      // Footer background
      this.pdf.setFillColor(249, 250, 251);
      this.pdf.rect(0, footerY - 5, this.pageWidth, 20, 'F');
      
      // Footer text
      this.pdf.setTextColor(107, 114, 128);
      this.pdf.setFontSize(8);
      this.pdf.setFont('helvetica', 'normal');
      
      const footerText = 'Generated by E-PulsePoints | ECG Learning Platform | ecgkid.com';
      const textWidth = this.pdf.getTextWidth(footerText);
      this.pdf.text(footerText, (this.pageWidth - textWidth) / 2, footerY);
      
      // Page number
      this.pdf.text(`Page ${i} of ${totalPages}`, this.pageWidth - this.margin, footerY);
    }
  }

  private addFooter(): void {
    const footerY = this.pageHeight - 15;
    
    // Footer background
    this.pdf.setFillColor(249, 250, 251);
    this.pdf.rect(0, footerY - 5, this.pageWidth, 20, 'F');
    
    // Footer text
    this.pdf.setTextColor(107, 114, 128);
    this.pdf.setFontSize(8);
    this.pdf.setFont('helvetica', 'normal');
    
    const footerText = 'Generated by E-PulsePoints | ECG Learning Platform | ecgkid.com';
    const textWidth = this.pdf.getTextWidth(footerText);
    this.pdf.text(footerText, (this.pageWidth - textWidth) / 2, footerY);
    
    // Page number
    const pageNum = this.pdf.getNumberOfPages();
    this.pdf.text(`Page ${pageNum}`, this.pageWidth - this.margin, footerY);
  }

  private sanitizeFilename(title: string): string {
    return title
      .replace(/[^a-z0-9\s-]/gi, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 100);
  }
}

// Usage function for blog post component
export const downloadBlogPostPDF = async (post: BlogPost): Promise<void> => {
  try {
    const generator = new BlogPDFGenerator();
    await generator.generateBlogPostPDF(post);
  } catch (error) {
    console.error('Failed to download PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};

// React hook for PDF download functionality
export const usePDFDownload = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const downloadPDF = async (post: BlogPost) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      await downloadBlogPostPDF(post);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return { downloadPDF, isGenerating };
};