import { readFile } from "node:fs/promises";

async function getInput(path = "input.txt") {
  const lines = await readFile(path, { encoding: "utf-8" });
  return lines
    .trim()
    .split(",")
    .map((el) => el.split("-").map((el) => parseInt(el)));
}

function isDuplicate(num: number) {
  const numStr = num.toString();
  const part1 = numStr.slice(0, numStr.length / 2);
  const part2 = numStr.slice(numStr.length / 2, numStr.length);
  return part1 === part2;
}

async function main() {
  const ranges = await getInput();
  const invalidIds = [];
  for (const [start, end] of ranges) {
    if (!start || !end) throw new Error("invalid input");
    for (let i = start; i < end; i++) {
      if (isDuplicate(i)) invalidIds.push(i);
    }
  }

  const sum = invalidIds.reduce((acc, cur) => acc + cur);

  console.log(sum);
}

main().catch(console.error);
