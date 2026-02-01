export function getCardClasses(isSelected: boolean, isDisabled: boolean): string {
  return [
    'character-card group',
    isSelected && 'character-card-selected',
    isDisabled ? 'character-card-disabled' : 'character-card-hover',
  ]
    .filter(Boolean)
    .join(' ');
}