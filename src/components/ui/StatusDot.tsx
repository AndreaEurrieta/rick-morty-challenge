import { CharacterStatus } from '@/types';

interface Props {
  status: CharacterStatus;
  showLabel?: boolean;
}

const styles: Record<CharacterStatus, { dot: string; text: string }> = {
  Alive: { dot: 'status-alive', text: 'text-green-400' },
  Dead: { dot: 'status-dead', text: 'text-red-400' },
  unknown: { dot: 'status-unknown', text: 'text-gray-400' },
};

export default function StatusDot({ status, showLabel = true }: Props) {
  const { dot, text } = styles[status];

  return (
    <div className="status-badge absolute top-2 left-2">
      <div className={`status-dot ${dot}`} />
      {showLabel && <span className={`text-xs font-medium ${text}`}>{status}</span>}
    </div>
  );
}
