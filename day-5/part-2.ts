import { readFile } from "node:fs/promises";

function findIntersections(range: number[][]) {
  const toRemove = [];
  const intersections = [] as Array<[number, number]>;

  for (let i = 0; i < range.length; i++) {
    for (let j = i + 1; j < range.length; j++) {
      if (range[j]![0]! >= range[i]![0]! && range[j]![0]! <= range[i]![1]!) {
        toRemove.push(i, j);
        intersections.push([range[i]![0]!, range[j]![1]!]);
      }
    }
  }

  return { toRemove, intersections };
}

async function getInput(path = "input.txt") {
  const input = await readFile(path, { encoding: "utf-8" });
  const [ranges, ids] = input
    .trim()
    .split("\n\n")
    .map((el) => el.split("\n")) as string[][];

  if (!ranges || !ids) throw new Error("Invalid input");

  return { ranges, ids };
}

async function main() {
  const { ranges } = await getInput();
  const rangeMap = [];

  for (const range of ranges) {
    const [start, end] = range.split("-").map((el) => parseInt(el)) as [
      number,
      number,
    ];
    rangeMap.push([start, end]);
  }

  rangeMap.sort((a, b) => a[0]! - b[0]!);

  const { toRemove, intersections } = findIntersections(rangeMap);

  const filtered = rangeMap.filter((el, i) => !toRemove.includes(i));

  const merged = [...filtered, ...intersections];

  merged.sort((a, b) => a[0]! - b[0]!);

  function findDuplicates(arr) {
    const seen = new Map();
    const dupes = [];

    arr.forEach((v, i) => {
      const key = v.join(",");
      if (seen.has(key)) {
        dupes.push({ value: v, firstIndex: seen.get(key), dupIndex: i });
      } else {
        seen.set(key, i);
      }
    });

    return dupes;
  }
  
  // console.log(findDuplicates(merged))
  
  console.log(merged[10], merged[11])
}

main().catch(console.error);

//
// Currently this kind of works, but there are a few problems:
//
// - I'm getting duplicates in the merged array (see the first two elements) [x]
// - I believe I need to re-run the intersection finding algo on the merged array
//
// I should work through this by hand and verify it works. The idea is to created a sorted array of all ranges with no
// duplicate ranges, then I can iterate through each number, iterate through each range, and see if any range contains the
// number
//
