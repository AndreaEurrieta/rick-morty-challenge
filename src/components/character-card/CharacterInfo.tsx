interface CharacterInfoProps {
  name: string;
  species: string;
}

export function CharacterInfo({ name, species }: CharacterInfoProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-3">
      <h3 className="font-bold text-white text-sm leading-tight truncate mb-1" title={name}>
        {name}
      </h3>
      <p className="text-xs text-gray-300 truncate">{species}</p>
    </div>
  );
}
