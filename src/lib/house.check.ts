import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"
import { clinicNetwork, roadmap, tops } from "./house.ts"

const lockedTops = ["Arcada", "Lightround", "Humanehealth", "Mattercircle"]
const lockedClinic = ["Acashi", "Phenomatch", "Antiporn", "Lessfret", "devoutshaman"]

test("peer tops stay in the locked order", () => {
  assert.deepEqual(
    tops.map((top) => top.name),
    lockedTops
  )
  assert.equal(new Set(tops.map((top) => top.id)).size, 4)
})

test("clinic network stays nested and off the peer row", () => {
  assert.deepEqual(
    clinicNetwork.map((node) => node.name),
    lockedClinic
  )
  const topNames = new Set(tops.map((top) => top.name.toLowerCase()))
  for (const node of clinicNetwork) {
    assert.equal(topNames.has(node.name.toLowerCase()), false)
  }
})

test("roadmap names the four tops and the clinic network", () => {
  const text = roadmap.map((stage) => `${stage.title} ${stage.body}`).join("\n")
  for (const name of lockedTops) assert.match(text, new RegExp(name))
  for (const name of lockedClinic) assert.match(text, new RegExp(name))
  assert.match(text, /example thesis/i)
  assert.match(text, /factory and essentials/i)
  assert.match(text, /matter and physics/i)
})

test("public surfaces do not name Unnaturalfertility", () => {
  const roots = ["src/app", "src/components"]
  const files: string[] = []
  for (const root of roots) collect(root, files)
  const hits = files.filter((file) =>
    /unnaturalfertility/i.test(readFileSync(file, "utf8"))
  )
  assert.deepEqual(hits, [])
})

function collect(dir: string, files: string[]) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) collect(path, files)
    else if (/\.(tsx|ts)$/.test(name)) files.push(path)
  }
}
