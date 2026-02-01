interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400 text-center italic text-sm">
        {message}
      </p>
    </div>
  );
}
