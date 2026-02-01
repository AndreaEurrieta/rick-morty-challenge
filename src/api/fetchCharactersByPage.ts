import { Character, ApiResponse } from '@/types';
import { API_BASE_URL } from '@/constants/api';

export async function fetchCharactersByPage(page: number = 1): Promise<ApiResponse<Character>> {
  const response = await fetch(`${API_BASE_URL}/character?page=${page}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.status}`);
  }

  return response.json();
}
