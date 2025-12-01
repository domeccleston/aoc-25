import { readFile } from "node:fs/promises";

async function getInput(path = "input.txt") {
  const lines = await readFile(path, { encoding: "utf-8" });
  return lines.trim().split("\n");
}

function rotateLeft(current: number, amount: number) {
  let result = Infinity;
  let count = 0;
  for (let i = 1; i <= amount; i++) {
    result = (100 + current - i) % 100;
    if (result === 0) count++;
  }
  return { count, result };
}

function rotateRight(current: number, amount: number) {
  let result = Infinity;
  let count = 0;
  for (let i = 1; i <= amount; i++) {
    result = (100 + current + i) % 100;
    if (result === 0) count++;
  }
  return { count, result };
}

function rotate(opts: {
  direction: "L" | "R";
  current: number;
  amount: number;
}) {
  if (opts.direction === "L") return rotateLeft(opts.current, opts.amount);
  else return rotateRight(opts.current, opts.amount);
}

async function main() {
  let index = 50;
  let numZeros = 0;

  for (const line of await getInput()) {
    const [direction, ...rest] = line;
    const amount = parseInt(rest.join(""));
    if (!direction || (direction !== "L" && direction !== "R"))
      throw new Error("Invalid input");
    const { count, result } = rotate({ direction, amount, current: index });
    index = result;
    numZeros += count;
  }

  console.log({ index, numZeros });
}

main().catch(console.error);
