import { getDecodeData, getEncodeData } from "./cryptoCfg";

//解密用户信息
export const decodeHostUserByRsa = function (userInfo) {
  let decodeObj = {};
  decodeObj.TradeHostID = userInfo.TradeHostID;
  decodeObj.UserName = getDecodeData(userInfo.UserName);
  decodeObj.UserPwd = getDecodeData(userInfo.UserPwd);
  decodeObj.UserHomeDir = getDecodeData(userInfo.UserHomeDir);
  decodeObj.UserType = userInfo.UserType;
  decodeObj.IsAvailable = userInfo.IsAvailable;
  return decodeObj;
};
//判断用户类型
export function judgeUserType(srcUserTypeArr) {
  let rtnUserTypeObj = {};
  if (srcUserTypeArr.indexOf("0") > -1) {
    rtnUserTypeObj["root用户"] = 1;
  }

  if (srcUserTypeArr.indexOf("1") > -1) {
    rtnUserTypeObj["ngts用户"] = 1;
  }

  if (srcUserTypeArr.indexOf("2") > -1) {
    rtnUserTypeObj["交易用户"] = 1;
  }

  if (srcUserTypeArr.indexOf("4") > -1) {
    rtnUserTypeObj["开发用户"] = 1;
  }
  return Object.keys(rtnUserTypeObj);
}
//加密用户信息
export function encryptHostUserByRsa(userInfo) {
  let encryptObj = {};
  encryptObj.TradeHostID = userInfo.TradeHostID;
  encryptObj.UserName = getEncodeData(String(userInfo.UserName));
  if (userInfo.OldUserName) {
    encryptObj.OldUserName = getEncodeData(String(userInfo.OldUserName));
  }
  encryptObj.UserPwd = getEncodeData(String(userInfo.UserPwd));
  encryptObj.UserHomeDir = getEncodeData(String(userInfo.UserHomeDir));
  encryptObj.UserType = userInfo.UserType;
  encryptObj.IsAvailable = userInfo.IsAvailable;
  return encryptObj;
}
