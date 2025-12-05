import { readFile } from "node:fs/promises";

async function getInput(path = "input.txt") {
  const raw = await readFile(path, { encoding: "utf-8" });
  return raw.split("\n");
}

function getNeighbours(y: number, x: number, map: Record<string, boolean>) {
  const a = map[`${y - 1},${x - 1}`];
  const b = map[`${y - 1},${x}`];
  const c = map[`${y - 1},${x + 1}`];
  const d = map[`${y},${x - 1}`];
  const e = map[`${y},${x + 1}`];
  const f = map[`${y + 1},${x - 1}`];
  const g = map[`${y + 1},${x}`];
  const h = map[`${y + 1},${x + 1}`];

  return [a, b, c, d, e, f, g, h];
}

async function main() {
  const input = await getInput();
  const rollsMap = {} as Record<string, boolean>;
  let totalRolls = 0;
  let accessibleRolls;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y]!.length; x++) {
      const hasRoll = input[y]![x] === "@";
      rollsMap[`${y},${x}`] = hasRoll;
    }
  }

  do {
    const toRemove = [];
    accessibleRolls = 0;

    for (const coord of Object.keys(rollsMap)) {
      const [y, x] = coord.split(",").map((el) => parseInt(el)) as [
        number,
        number,
      ];

      const neighbours = getNeighbours(y, x, rollsMap);

      if (rollsMap[coord] && neighbours.filter(Boolean).length < 4) {
        accessibleRolls++;
        toRemove.push(coord);
      }
    }

    totalRolls += accessibleRolls;

    for (const coord of toRemove) {
      rollsMap[coord] = false;
    }
  } while (accessibleRolls > 0);

  console.log({ totalRolls });
}

main().catch(console.error);
