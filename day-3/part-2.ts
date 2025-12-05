import { readFile } from "node:fs/promises";

async function getInput(path = "input.txt") {
  const lines = await readFile(path, { encoding: "utf-8" });
  return lines.trim().split("\n");
}

function largestN(digits: string, n = 12, maxStr = "") {
  if (n === 0) return parseInt(maxStr);
  let max = 0;

  for (let i = 0; i < digits.length - (n - 1); i++) {
    if (parseInt(digits[i]!) > parseInt(digits[max]!)) {
      max = i;
    }
  }

  maxStr += digits[max]!.toString();

  return largestN(digits.slice(max + 1, digits.length), n - 1, maxStr);
}

async function main() {
  const banks = await getInput();

  const result = banks
    .map((bank) => largestN(bank))
    .reduce((acc, cur) => acc + cur);

  console.log({ result });
}

main().catch(console.error);
