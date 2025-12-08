import { readFile } from "node:fs/promises";

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
  const { ranges, ids } = await getInput();
  let validIds = 0;

  for (const id of ids) {
    for (const range of ranges) {
      const [start, end] = range.split("-");
      if (parseInt(id) > parseInt(start!) && parseInt(id) < parseInt(end!)) {
        validIds++;
        break;
      }
    }
  }

  console.log({ validIds });
}

main().catch(console.error);
