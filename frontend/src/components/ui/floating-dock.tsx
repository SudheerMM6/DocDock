import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    external?: boolean;
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    external?: boolean;
  }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      {open && (
        <div className="absolute bottom-full mb-3 inset-x-0 flex flex-col gap-2 items-end">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={item.onClick}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="h-10 w-10 rounded-full bg-[var(--color-canvas-white)] border border-[var(--border)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20 transition-colors hover:bg-[var(--surface)]"
              aria-label={item.title}
            >
              <div className="h-4 w-4">{item.icon}</div>
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="h-11 w-11 rounded-full bg-[var(--color-canvas-white)] border border-[var(--border)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20 transition-colors hover:bg-[var(--surface)]"
        aria-label="Toggle navigation menu"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-[var(--ink-secondary)]" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    external?: boolean;
  }[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-card bg-[var(--color-canvas-white)] border border-[var(--border)] px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          onClick={item.onClick}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          className="h-10 w-10 rounded-full bg-[var(--color-canvas-white)] border border-[var(--border)] flex items-center justify-center transition-colors hover:bg-[var(--surface)] hover:border-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
          aria-label={item.title}
        >
          <div className="h-4 w-4">{item.icon}</div>
        </a>
      ))}
    </div>
  );
}
