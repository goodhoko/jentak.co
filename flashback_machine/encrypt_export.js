import { encrypt } from "./crypto.js";
import { open, readFile, writeFile } from "fs/promises";
import { webcrypto } from "crypto";
import { LZString } from "./lz_string.js";

(async () => {
  const inputFile = await open(process.argv[2]);
  const input = await readFile(inputFile, "utf-8");

  // Compress before encrypting for best compression ratio.
  const compressed = LZString.compressToUint8Array(input);
  const password = process.argv[4];
  const output = await encrypt(compressed, password, webcrypto);

  const outputFile = await open(process.argv[3], "w");
  writeFile(outputFile, Buffer.from(output));
})();
