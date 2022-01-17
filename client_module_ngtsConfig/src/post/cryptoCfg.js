let crypto = require("crypto");
const CryptoJS = require("crypto-js");

// md5 重复加密算法
function encryption(str) {
  if (str && typeof str == "string") {
    for (let i = 0; i < str.length; i++) {
      str = crypto.createHash("md5").update(str).digest("hex");
    }
    return str;
  } else {
    throw new Error("str cant empty");
  }
}

//获取加密数据
function getEncodeData(srcData) {
  if (!srcData || srcData.length === 0 || srcData === "N/A") {
    //公钥加密
    return srcData;
  } else {
    // let publicKey = sessionStorage.getItem("publicKey");
    let publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCibX9zQmDPQ8MtT2Ha1/KCsQ01
oPwphAY6cM4MZx4VikmqvYefcDtV50KqprbYVwxZnVumsjNILlnpi4vzIHEc/J+i
K+TLRlAefUvprwkyxauSAiAfctHMPpa2OdK8opPeKWebS0aOKH5AxazqyrTUYZFb
VuBMqgmTMingdFQ6gQIDAQAB
-----END PUBLIC KEY-----`;
    const encodeData = crypto
      .publicEncrypt(publicKey, Buffer.from(srcData))
      .toString("base64");
    return encodeData;
  }
}

//获取解密数据
function getDecodeData(encodeData) {
  if (!encodeData || encodeData.length === 0 || encodeData === "N/A") {
    return encodeData;
  } else {
    // let privateKey = sessionStorage.getItem("privateKey");
    let privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCibX9zQmDPQ8MtT2Ha1/KCsQ01oPwphAY6cM4MZx4VikmqvYef
cDtV50KqprbYVwxZnVumsjNILlnpi4vzIHEc/J+iK+TLRlAefUvprwkyxauSAiAf
ctHMPpa2OdK8opPeKWebS0aOKH5AxazqyrTUYZFbVuBMqgmTMingdFQ6gQIDAQAB
AoGAMpCH5qe5X4ymzAo0Wl5znn/jrthI59uz3KmVW4MWeHouaLrL57SWpC10MY/o
x/yBWbyE9aXwFP5o+y14Cd4FmBN2paFsfnVoMyE1XESu74Ld6Ut+7xClLp/pgfKo
ui+/fH1hJ8Pcw/ajq0/x93vwFWL0HCNyLHc5wbtwvUBE3gECQQDT5rrMUs2rGbWO
8iMlAkytAD535ybnsw823ztKNAXug4950Z/pE4+V/SToba3HLMSpOecYt/MEB0nh
IYypd+HxAkEAxDsCugNfuzN99/TFvE2qeMR4VmW1kZEIZ03azI2QE0fKa9t7e9cY
urZJd76UmTtnI9t+SV8VsnqISpomJ/BRkQJAezv6cw3M8q72+fU0HzfhI9O6gLz7
0VA/jufwcU0kDfyRGoWg/EoV/WLFbi8rG2Sb0tcL4UJJoJQkkTuTtJM14QJAbHJc
aGbS8kdb17wbx5x4mPOjucPOG5u2tDjPsfqOZElpskADN4bBcParFZVq1GCC+Msm
OPBmslOLnQciDTKAMQJAMRG9KRZDOIGnRabyRzM3EJXsH9VEzOFKZMsRfZKJYMVT
kSXVGA23H+9hZce1/x3xmL4/i15/xx6HpuCBSW4sUg==
-----END RSA PRIVATE KEY-----`;
    const decodeData = crypto.privateDecrypt(
      privateKey,
      Buffer.from(encodeData.toString(), "base64")
    );
    return decodeData.toString();
  }
}

// base64加密
function encrypt_base64(str) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
}

function decode_base64(str) {
  return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
}

function decodeFn(code) {
  const cipherType = "base64";
  switch (cipherType) {
    case "base64":
      return decode_base64(code);
  }
}

function encryptFn(code) {
  const cipherType = "base64";
  switch (cipherType) {
    case "base64":
      return encrypt_base64(code);
  }
}

module.exports = {
  encryption,
  getEncodeData,
  getDecodeData,
  decodeFn,
  encryptFn,
};
