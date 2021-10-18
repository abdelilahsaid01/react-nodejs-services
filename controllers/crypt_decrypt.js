const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted.toString("hex"),
    key: key.toString("hex"),
  };
};

const decrypt = (text) => {
  let iv = Buffer.from(text.iv, "hex");
  let key = Buffer.from(text.key, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

exports.decryptPassword = () => {
  const data = {
    iv: "4ea9a4ed1dd518902036691e2256ecff",
    encryptedData:
      "b3e1a4fd8e8ff1ffc665161a4bbfcf4044badcfd80299ed7fa47efca695e6a12",
    key: "5d33ffc8c2c4021fc5fa48de62a8aba139e68f6e57c52bc6e75de87e72e01bdc",
  };
  return decrypt(data);

  // const hw = encrypt("abcdef");
  // console.log(hw);
  // console.log(decrypt(data));
};
