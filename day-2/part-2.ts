import { readFile } from "node:fs/promises";

async function getInput(path = "input.txt") {
  const lines = await readFile(path, { encoding: "utf-8" });
  return lines
    .trim()
    .split(",")
    .map((el) => el.split("-").map((el) => parseInt(el)));
}

function splitParts(str: string, n: number) {
  const partLength = str.length / n;
  const parts = [];

  for (let i = 0; i < str.length; i += partLength) {
    const part = str.slice(i, i + partLength);
    parts.push(part);
  }

  return parts;
}

const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10];

async function main() {
  const ranges = await getInput("input.txt");
  const invalidIds = [];
  for (const [start, end] of ranges) {
    if (!start || !end) throw new Error("Invalid input");

    for (let i = start; i <= end; i++) {
      const numStr = i.toString();
      for (const divisor of divisors) {
        if (Number.isInteger(numStr.length / divisor)) {
          const parts = splitParts(numStr, divisor);
          const isInvalid = parts.every((el, _, arr) => el === arr[0]);
          if (isInvalid) invalidIds.push(i);
        }
      }
    }
  }

  const result = [...new Set(invalidIds)].reduce((acc, cur) => acc + cur);
  console.log({ result });
}

main().catch(console.error);
