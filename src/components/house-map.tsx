import { clinicNetwork, peerLine, tops } from "@/lib/house"

export function HouseMap() {
  return (
    <div className="space-y-14">
      <section>
        <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--rule)] uppercase">
          Peer tops
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black">
          {peerLine}
        </p>
        {tops.length === 0 ? (
          <p className="mt-8 border border-border bg-white px-4 py-6 text-sm leading-6 text-black">
            The peer-top list is empty in this build.
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {tops.map((top) => (
              <li
                key={top.id}
                className="grid gap-3 bg-white py-6 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-8"
              >
                <div>
                  <h2 className="text-xl leading-tight text-black">{top.name}</h2>
                  <p className="mt-2 text-[0.72rem] tracking-[0.08em] text-black/70 uppercase">
                    {top.role}
                  </p>
                </div>
                <p className="text-sm leading-7 text-black">{top.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--rule)] uppercase">
          Humanehealth clinic network
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black">
          Acashi, Phenomatch, Antiporn, Lessfret, and devoutshaman sit under
          Humanehealth.
        </p>
        {clinicNetwork.length === 0 ? (
          <p className="mt-8 border border-border bg-white px-4 py-6 text-sm leading-6 text-black">
            The clinic network list is empty in this build.
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {clinicNetwork.map((node) => (
              <li
                key={node.id}
                className="grid gap-3 bg-white py-6 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-8"
              >
                <div>
                  <h2 className="text-xl leading-tight text-black">{node.name}</h2>
                  <p className="mt-2 text-[0.72rem] tracking-[0.08em] text-black/70 uppercase">
                    Humanehealth
                  </p>
                </div>
                <p className="text-sm leading-7 text-black">{node.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
