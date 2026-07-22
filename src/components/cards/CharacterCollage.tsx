interface CharacterCollageProps {
  images: string[];
  alt: string;
}

// Fallback caso um episódio venha sem personagens vinculados (raro)
const FALLBACK_IMAGE = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';

export function CharacterCollage({ images, alt }: CharacterCollageProps) {
  const pics = images.length > 0 ? images.slice(0, 4) : [FALLBACK_IMAGE];

  if (pics.length === 1) {
    return <img src={pics[0]} alt={alt} loading="lazy" className="h-full w-full object-cover" />;
  }

  if (pics.length === 2) {
    return (
      <div className="grid h-full w-full grid-cols-2 gap-0.5 bg-black/40">
        {pics.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
        ))}
      </div>
    );
  }

  if (pics.length === 3) {
    return (
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[2px] bg-black/40">
        <img src={pics[0]} alt="" loading="lazy" className="col-span-2 h-full w-full object-cover" />
        <img src={pics[1]} alt="" loading="lazy" className="h-full w-full object-cover" />
        <img src={pics[2]} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[2px] bg-black/40">
      {pics.map((src, i) => (
        <img key={i} src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
      ))}
    </div>
  );
}
