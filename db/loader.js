import { readFile } from "fs/promises";

var data = null;

export const JSONLoader = async (model) => {
  if (!model) {
    return;
  }
  if (!data) {
    data = JSON.parse(await readFile(`db/data/${model}.json`));
  }
  return data;
};
