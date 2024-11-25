import { promises as fs } from "fs";
import { join } from "path";

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

/**
 * Lee un archivo JSON y lo parsea.
 * @param relativePath - La ruta relativa del archivo JSON.
 * @returns El contenido del archivo JSON como objeto.
 */
export const readJSON = async (relativePath: string): Promise<any> => {
  const filePath = join(__dirname, "../../", relativePath);
  if (!(await fileExists(filePath))) {
    return [];
  }
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data || "[]");
};

/**
 * Escribe un objeto en un archivo JSON.
 * @param relativePath - La ruta relativa del archivo JSON.
 * @param data - El objeto a escribir en el archivo JSON.
 */
export const writeJSON = async (
  relativePath: string,
  data: any
): Promise<void> => {
  const filePath = join(__dirname, "../../", relativePath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export const saveData = async (relativePath: string, data: any) => {
  const currentData: any[] = await readJSON(relativePath);
  currentData.push(data);
  await writeJSON(relativePath, currentData);
};
