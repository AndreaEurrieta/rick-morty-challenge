import { Skeleton } from '../ui';
import { CHARACTERS_PER_PAGE } from '@/constants';

const SKELETON_ITEMS = Array.from({ length: CHARACTERS_PER_PAGE });

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {SKELETON_ITEMS.map((_, index) => (
        <Skeleton key={index} variant="card" delay={index * 100} />
      ))}
    </div>
  );
}
