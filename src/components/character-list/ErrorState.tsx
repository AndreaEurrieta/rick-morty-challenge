import { Icon } from '../ui';

interface ErrorStateProps {
  title: string;
  error: string;
}

export function ErrorState({ title, error }: ErrorStateProps) {
  return (
    <div className="alert-error-compact">
      <h2 className="text-xl font-bold mb-3 text-red-800 dark:text-red-200">{title}</h2>
      <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
        <Icon name="error" className="w-6 h-6 flex-shrink-0" />
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
}
