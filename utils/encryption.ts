import CryptoJS from "crypto-js";

const ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "your-32-chr-secure-key-!";

export function encrypt(text: string): string {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(
    text,
    CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return (
    iv.toString(CryptoJS.enc.Hex) +
    ":" +
    encrypted.ciphertext.toString(CryptoJS.enc.Hex)
  );
}

export function decrypt(text: string): string {
  const [ivHex, ciphertextHex] = text.split(":");
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encrypted = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertextHex),
  });
  const decrypted = CryptoJS.AES.decrypt(
    encrypted,
    CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}
