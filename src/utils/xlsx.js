import XLSX from "xlsx";
import { utils, writeFile } from "xlsx";

const Datas = {
  // We will make a Workbook contains 2 Worksheets
  animals: [
    { name: "cat", category: "animal" },
    { name: "dog", category: "animal" },
    { name: "pig", category: "animal" },
  ],
  pokemons: [
    { name: "pikachu", category: "pokemon" },
    { name: "Arbok", category: "pokemon" },
    { name: "Eevee", category: "pokemon" },
  ],
};

export const convertToXlsx = (data, fileName) => {
  const wb = utils.book_new();

  Object.entries(data).forEach(([key, value]) => {
    const ws = utils.json_to_sheet(value);
    utils.book_append_sheet(wb, ws, key);
  });
  /* export to XLSX */
  writeFile(wb, fileName + ".xlsx");
};
