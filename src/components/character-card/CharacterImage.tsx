import Image from 'next/image';

interface CharacterImageProps {
  src: string;
  alt: string;
  isDisabled: boolean;
}

export function CharacterImage({ src, alt, isDisabled }: CharacterImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover transition-transform duration-500 ${!isDisabled && 'group-hover:scale-110'}`}
      sizes="(max-width: 640px) 50vw, 200px"
    />
  );
}
