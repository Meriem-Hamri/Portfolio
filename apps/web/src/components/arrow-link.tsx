import Link from "next/link";
import type { Route } from "next";

type ArrowLinkProps = {
  href: Route | string;
  children: React.ReactNode;
  external?: boolean;
  tone?: "light" | "dark";
};

export function ArrowLink({
  href,
  children,
  external = false,
  tone = "dark",
}: ArrowLinkProps) {
  const className = `arrow-link ${tone === "light" ? "arrow-link--light" : ""}`;

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        <span>{children}</span>
        <span aria-hidden="true" className="arrow-link__icon">↗</span>
      </a>
    );
  }

  return (
    <Link className={className} href={href as Route}>
      <span>{children}</span>
      <span aria-hidden="true" className="arrow-link__icon">↗</span>
    </Link>
  );
}
