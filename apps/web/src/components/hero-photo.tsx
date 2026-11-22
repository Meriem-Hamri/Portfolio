import Image from "next/image";

type Tag = { label: string; x: string; y: string; dx: number; dy: number; tone: "olive" | "terracotta" | "sable" | "ink" };

/** Real portrait with technology tags floating around it; tags drift outward on hover (CSS only). */
export function HeroPhoto({ alt, tags }: { alt: string; tags: Tag[] }) {
  return <figure className="hero-photo">
    <div className="hero-photo__frame">
      <Image src="/images/meriem-portrait.jpg" width={740} height={987} priority sizes="(max-width: 860px) 70vw, 340px" alt={alt} />
    </div>
    {tags.map((tag, index) => <span key={tag.label} className={`hero-tag hero-tag--${tag.tone}`} aria-hidden="true"
      style={{ left: tag.x, top: tag.y, "--dx": `${tag.dx}px`, "--dy": `${tag.dy}px`, "--delay": `${index * -1.1}s` } as React.CSSProperties}>
      {tag.label}
    </span>)}
  </figure>;
}
