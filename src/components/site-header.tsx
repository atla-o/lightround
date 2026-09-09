"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-6 text-center sm:px-8">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="font-heading text-sm leading-none tracking-tight text-foreground"
        >
          o
        </Link>
        <p className="font-heading mt-2 text-sm leading-none tracking-tight">
          {site.name}
        </p>
        <nav
          aria-label="Primary"
          className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2"
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[0.8rem] tracking-[0.08em] uppercase transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
