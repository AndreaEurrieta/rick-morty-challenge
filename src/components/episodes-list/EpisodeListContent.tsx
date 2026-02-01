import { Episode, ColorVariant } from '@/types';
import { EpisodeItem } from './EpisodeItem';

interface EpisodeListContentProps {
  episodes: Episode[];
  color: ColorVariant;
}

export function EpisodeListContent({ episodes, color }: EpisodeListContentProps) {
  return (
    <div className="space-y-2 min-h-[280px]">
      {episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode={episode} color={color} />
      ))}
    </div>
  );
}
