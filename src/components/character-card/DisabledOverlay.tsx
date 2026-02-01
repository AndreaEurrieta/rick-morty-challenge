interface DisabledOverlayProps {
  isDisabled: boolean;
  message?: string;
}
export function DisabledOverlay({ isDisabled, message = 'Ya seleccionado' }: DisabledOverlayProps) {
  if (!isDisabled) return null;
  
  return (
    <div className="overlay-disabled">
      <span className="text-xs text-white/80 bg-black/60 px-3 py-1.5 rounded-full">
        {message}
      </span>
    </div>
  );
}
