import { readFile } from "node:fs/promises";

async function getInput(path = "input.txt") {
  const lines = await readFile(path, { encoding: "utf-8" });
  return lines.trim().split("\n");
}

function rotateLeft(current: number, amount: number) {
  return (100 + (current - amount)) % 100;
}

function rotateRight(current: number, amount: number) {
  return (100 + (current + amount)) % 100;
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
  let counter = 0;

  for (const line of await getInput()) {
    const [direction, ...rest] = line;
    const amount = parseInt(rest.join(""));
    if (!direction || (direction !== "L" && direction !== "R"))
      throw new Error("Invalid input");
    index = rotate({ direction, amount, current: index });
    if (index === 0) counter++;
  }

  console.log({ counter });
}

main().catch(console.error);

// rotateLeft(10, 50) -> { counter: 1 }
// rotateRight(50, 1000) -> { counter: 10 }
// rotateLeft(20, 20) -> { counter: 1 }