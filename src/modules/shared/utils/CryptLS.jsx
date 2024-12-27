import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "SECRET_KEY";

const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

const decrypt = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};

export const encryptedStorage = {
  getItem: (name) => {
    const encryptedData = localStorage.getItem(name);
    if (!encryptedData) return null;
    return decrypt(encryptedData);
  },
  setItem: (name, value) => {
    const encryptedData = encrypt(value);
    localStorage.setItem(name, encryptedData);
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};
