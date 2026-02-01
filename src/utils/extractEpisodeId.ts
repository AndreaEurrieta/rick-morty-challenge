export function extractEpisodeId(url: string): number {
  const id = url.split('/').pop();
  return id ? parseInt(id, 10) : 0;
}

export function extractEpisodeIds(urls: string[]): number[] {
  return urls.map(extractEpisodeId).filter(id => id > 0);
}
