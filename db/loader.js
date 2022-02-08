import { readFile } from "fs/promises";

var data = {};

export const JSONLoader = async (model) => {
  if (!model) {
    return;
  }
  if (!data[model]) {
    data[model] = JSON.parse(await readFile(`./data/${model}.json`));
  }
  return data[model];
};
