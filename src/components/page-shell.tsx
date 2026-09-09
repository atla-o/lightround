import type { ReactNode } from "react"

export function PageShell({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string
  title: string
  lede?: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 text-center sm:px-8 sm:py-16">
      <p className="text-[0.68rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
        {kicker}
      </p>
      <h1 className="mx-auto mt-3 max-w-3xl text-4xl leading-[1.15] sm:text-5xl">
        {title}
      </h1>
      {lede ? (
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-[1.05rem] sm:leading-8">
          {lede}
        </p>
      ) : null}
      <div className="mt-12 text-left">{children}</div>
    </div>
  )
}
