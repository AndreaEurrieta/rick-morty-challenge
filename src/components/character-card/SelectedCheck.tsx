import { Icon } from '../ui';

interface SelectedCheck {
  isSelected: boolean;
}

export function SelectedCheck({ isSelected }: SelectedCheck) {
  if (!isSelected) return null
  
  return (
    <div className="selected-check">
      <Icon name="check" strokeWidth={3} />
    </div>
  );
}
