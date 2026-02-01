'use client';

import { Icon } from '@/components/ui';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}: PaginationProps) {
  const canPrevious = currentPage > 1;
  const canNext = currentPage < totalPages;

  const getPages = (): (number | '...')[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      aria-label="Pagination"
      aria-busy={loading}
      className={`flex items-center justify-center gap-2 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrevious || loading}
        aria-label="Página anterior"
        className={`btn btn-icon ${canPrevious ? 'btn-primary' : 'btn-primary-disabled'}`}
      >
        <Icon name="chevron-left" className="w-5 h-5" />
      </button>

      <div className="flex gap-1">
        {getPages().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={loading}
              aria-label={`Ir a página ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`btn min-w-[36px] h-9 px-2 text-sm ${page === currentPage ? 'btn-active' : 'btn-primary'}`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext || loading}
        aria-label="Página siguiente"
        className={`btn btn-icon ${canNext ? 'btn-primary' : 'btn-primary-disabled'}`}
      >
        <Icon name="chevron-right" className="w-5 h-5" />
      </button>
    </nav>
  );
}
