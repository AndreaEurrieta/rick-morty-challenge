interface EpisodeFooterProps {
  count: number;
}

export function EpisodeFooter({ count }: EpisodeFooterProps) {
  return (
    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        Total: <span className="font-bold text-gray-900 dark:text-gray-100">{count}</span> episodios
      </p>
    </div>
  );
}
