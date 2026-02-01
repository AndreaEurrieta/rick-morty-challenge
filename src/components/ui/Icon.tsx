interface Props {
  name: 'check' | 'chevron-left' | 'chevron-right' | 'x' | 'external-link' | 'error';
  className?: string;
  strokeWidth?: number;
}

const paths: Record<string, string> = {
  check: 'M5 13l4 4L19 7',
  'chevron-left': 'M15 19l-7-7 7-7',
  'chevron-right': 'M9 5l7 7-7 7',
  x: 'M6 18L18 6M6 6l12 12',
  'external-link': 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
  error: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};

export default function Icon({ name, className = 'w-4 h-4', strokeWidth = 2 }: Props) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d={paths[name]} />
    </svg>
  );
}
