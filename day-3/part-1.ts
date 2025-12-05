import { readFile } from "node:fs/promises";

async function getInput(path = "input.txt") {
  const lines = await readFile(path, { encoding: "utf-8" });
  return lines.trim().split("\n");
}

function largestPair(digits: string) {
  let lMax = 0;

  for (let i = 0; i < digits.length - 1; i++) {
    if (parseInt(digits[i]!) > parseInt(digits[lMax]!)) {
      lMax = i;
    }
  }

  let rMax = lMax + 1;

  for (let i = lMax + 1; i < digits.length; i++) {
    if (parseInt(digits[i]!) > parseInt(digits[rMax]!)) {
      rMax = i;
    }
  }

  return parseInt(`${digits[lMax]}${digits[rMax]}`);
}

async function main() {
  const banks = await getInput();

  const result = banks
    .map((bank) => largestPair(bank))
    .reduce((acc, cur) => acc + cur);

  console.log({ result });
}

main().catch(console.error);
