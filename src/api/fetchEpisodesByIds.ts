import { Episode } from '@/types';
import { API_BASE_URL } from '@/constants/api';

export async function fetchEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) {
    return [];
  }

  const endpoint =  `${API_BASE_URL}/episode/${ids}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch episodes: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}
