// Based on https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#pbkdf2_2

const IV = new Uint8Array([
  181, 205, 79, 202, 71, 30, 192, 175, 44, 93, 57, 15, 106, 207, 83, 179,
]);

const SALT = "I'm so salty!";

async function generateKey(password, cryptoLib) {
  const enc = new TextEncoder();
  const keyMaterial = await cryptoLib.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );

  return await cryptoLib.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(SALT),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(blob, password, cryptoLib) {
  const key = await generateKey(password, cryptoLib);
  return cryptoLib.subtle.encrypt({ name: "AES-GCM", iv: IV }, key, blob);
}

export async function decrypt(blob, password, cryptoLib) {
  const key = await generateKey(password, cryptoLib);
  return cryptoLib.subtle.decrypt({ name: "AES-GCM", iv: IV }, key, blob);
}
