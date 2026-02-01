'use client';

import { EpisodesListProps, ColorVariant, EpisodeListVariant } from '@/types';
import { CHARACTERS_PER_PAGE } from '@/constants';
import { EmptyState } from './EmptyState';
import { EpisodeListContent } from './EpisodeListContent';
import { EpisodeFooter } from './EpisodeFooter';
import { EpisodePagination } from './EpisodePagination';

const VARIANT_MAP: Record<EpisodeListVariant, ColorVariant> = {
  character1: 'blue',
  shared: 'green',
  character2: 'purple',
};

export function EpisodesList({
  episodes,
  title,
  emptyMessage,
  variant = 'shared',
  page = 1,
  onPageChange,
}: EpisodesListProps) {
  const color = VARIANT_MAP[variant];
  const totalPages = Math.max(1, Math.ceil(episodes.length / CHARACTERS_PER_PAGE));
  const startIndex = (page - 1) * CHARACTERS_PER_PAGE;
  const paginatedEpisodes = episodes.slice(startIndex, startIndex + CHARACTERS_PER_PAGE);

  return (
    <div className={`episode-card episode-card-${color}`}>
      <div className="flex-1 p-4 flex flex-col">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
          {title}
        </h4>

        {episodes.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <EpisodeListContent episodes={paginatedEpisodes} color={color} />
        )}

        <EpisodeFooter count={episodes.length} />

        {episodes.length > CHARACTERS_PER_PAGE && onPageChange && (
          <EpisodePagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}
