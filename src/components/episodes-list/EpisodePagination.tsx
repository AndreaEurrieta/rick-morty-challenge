interface EpisodePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function EpisodePagination({
  page,
  totalPages,
  onPageChange,
}: EpisodePaginationProps) {
  return (
    <div className="mt-3 flex items-center justify-between gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 text-xs font-medium rounded bg-gray-200 dark:bg-gray-700
                   text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>

      <span className="text-xs text-gray-600 dark:text-gray-400">
        Página {page} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 text-xs font-medium rounded bg-gray-200 dark:bg-gray-700
                   text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
}
