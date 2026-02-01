interface HoverOverlayProps {
  isDisabled: boolean;
  isSelected: boolean;
}

export function HoverOverlay({ isDisabled, isSelected }: HoverOverlayProps) {
  if (isDisabled || isSelected) return null;
  
  return (
    <div className="overlay-hover">
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent" />
    </div>
  );
}