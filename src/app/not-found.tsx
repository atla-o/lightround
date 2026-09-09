import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
      <p className="text-[0.68rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
        Missing
      </p>
      <h1 className="mt-3 text-4xl">No page at this path.</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
        The mandate, the illustrative book, and the LP desk are the surfaces
        that exist in this build.
      </p>
      <Button nativeButton={false} render={<Link href="/" />} className="mt-8 h-10 rounded-sm px-4">
        Return to the mandate
      </Button>
    </div>
  )
}
