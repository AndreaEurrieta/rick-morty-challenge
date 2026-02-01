import { Episode, ColorVariant } from '@/types';
import { Badge } from '../ui';

interface EpisodeItemProps {
  episode: Episode;
  color: ColorVariant;
}

export function EpisodeItem({ episode, color }: EpisodeItemProps) {
  return (
    <div className={`episode-item episode-item-${color}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p
            className="font-medium text-gray-900 dark:text-gray-100 truncate text-sm"
            title={episode.name}
          >
            {episode.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {episode.air_date}
          </p>
        </div>
        <Badge variant={color}>{episode.episode}</Badge>
      </div>
    </div>
  );
}
