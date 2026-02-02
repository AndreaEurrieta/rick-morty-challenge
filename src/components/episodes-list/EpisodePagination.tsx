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
    <div className="mt-3 flex-between gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="btn btn-primary px-3 py-1 text-xs"
      >
        Anterior
      </button>

      <span className="text-xs text-muted">
        Página {page} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="btn btn-primary px-3 py-1 text-xs"
      >
        Siguiente
      </button>
    </div>
  );
}
