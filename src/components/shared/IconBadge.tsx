import type { ReactNode } from "react";

export default function IconBadge({
  bg,
  fg,
  children,
}: {
  bg: string;
  fg: string;
  children: ReactNode;
}) {
  return (
    <div
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm"
      style={{ background: bg, color: fg }}
      aria-hidden
    >
      <span className="text-base">{children}</span>
    </div>
  );
}
