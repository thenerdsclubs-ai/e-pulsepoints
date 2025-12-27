import Link from 'next/link';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Pagination({ currentPage, totalPages, basePath, searchParams }: PaginationProps) {
  // Build query string from search params
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && key !== 'page') {
          params.set(key, Array.isArray(value) ? value[0] : value);
        }
      });
    }
    if (page > 1) {
      params.set('page', page.toString());
    }
    const queryString = params.toString();
    return `${basePath}${queryString ? `?${queryString}` : ''}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2; // Show 2 pages on each side of current page
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
    
    // Add ellipsis if there's a gap after page 1
    if (rangeStart > 2) {
      pageNumbers.push('ellipsis-start');
    }
    
    // Add range around current page
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }
    
    // Add ellipsis if there's a gap before last page
    if (rangeEnd < totalPages - 1) {
      pageNumbers.push('ellipsis-end');
    }
    
    // Always show last page (if different from first)
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-1 mt-8 mb-4" aria-label="Pagination">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-l-md cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Previous</span>
        </span>
      )}

      {/* Page numbers */}
      <div className="flex">
        {pageNumbers.map((pageNum, index) => {
          if (typeof pageNum === 'string' && pageNum.startsWith('ellipsis')) {
            return (
              <span 
                key={`${pageNum}-${index}`}
                className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300"
              >
                <MoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          const isCurrentPage = pageNum === currentPage;
          
          return (
            <Link
              key={`page-${pageNum}`}
              href={buildUrl(pageNum as number)}
              className={`flex items-center justify-center px-3 py-2 text-sm font-medium border-t border-b border-gray-300 transition-colors ${
                isCurrentPage
                  ? 'text-white bg-blue-600 border-blue-600 z-10'
                  : 'text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900'
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Next page"
        >
          <span className="mr-1 hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-r-md cursor-not-allowed">
          <span className="mr-1 hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}