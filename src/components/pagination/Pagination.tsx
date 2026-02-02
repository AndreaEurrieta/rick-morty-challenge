'use client';

import { Icon } from '@/components/ui';
import { getPages } from '@/utils/getPages';

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
        {getPages(currentPage, totalPages).map((page, index) =>
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
