import axios from "axios";
import uuid from "node-uuid";
import { remote } from "electron";

const base_url = remote.getGlobal("config_cms_web_ser_http_baseurl");
const version = remote.getGlobal("config_Version");
const _tokenID = remote.getGlobal("tokenID");

let _g_algoInfo = {};

export var reqTemplate = {
  ClientVersion: version,
  wyreq: {
    messageid: 0,
    requestid: 0,
    arguments: {},
    tokenID: _tokenID,
    wyuuid: uuid.v1(),
  },
  tokenID: _tokenID,
};

//策略id
export function getStrategyIDData(cb) {
  let reqObj = Object.assign({}, reqTemplate);
  reqObj.wyreq.arguments = {};
  axios
    .post(base_url + "/strategyInfo/qryStrategyInfo", reqObj)
    .then((result) => {
      cb(null, result.data.wyrtn.datalist);
    })
    .catch((error) => {
      cb(error, null);
    });
}
//证券代码
export function getInstrumentIDData(cb) {
  let reqObj = Object.assign({}, reqTemplate);
  reqObj.wyreq.arguments = {};
  axios
    .post(base_url + "/common/qryInstrumentId", reqObj)
    .then((result) => {
      cb(null, result.data.wyrtn.datalist);
    })
    .catch((error) => {
      cb(error, null);
    });
}
//资金账号
export function getInvestorIDData(data, cb) {
  let reqObj = Object.assign({}, reqTemplate);
  reqObj.wyreq.arguments = data;
  axios
    .post(base_url + "/settleObj/investorIDByStgyIDGet", reqObj)
    .then((result) => {
      cb(null, result.data.wyrtn.datalist);
    })
    .catch((error) => {
      cb(error, null);
    });
}

export function rtnArgumentsObj(RequestUUID, ArgumentsObj) {
  return {
    RequestUUID: RequestUUID ? RequestUUID : uuid.v1(),
    ReqArguments: ArgumentsObj,
  };
}

//算法下单
export function strategyAlgoOrder(data, cb) {
  let reqObj = Object.assign({}, reqTemplate);
  reqObj.wyreq.tradehostid = data.tradeHostID;
  reqObj.wyreq.arguments = rtnArgumentsObj(reqObj.wyreq.wyuuid, data);
  axios
    .post(base_url + "/strategyInfo/strategyAlgoOrder", reqObj)
    .then((result) => {
      if (result.data.wyrtn.statecode === 0) {
        cb(null, result.data.wyrtn);
      } else {
        cb(result.data.wyrtn.statemsg, null);
      }
    })
    .catch((error) => {
      cb(error, null);
    });
}

//算法撤单
export function strategyAlgoCancelOrder(data, cb) {
  let reqObj = Object.assign({}, reqTemplate);
  reqObj.wyreq.tradehostid = data.tradeHostID;
  reqObj.wyreq.arguments = rtnArgumentsObj(reqObj.wyreq.wyuuid, data);
  axios
    .post(base_url + "/strategyInfo/strategyAlgoCancelOrder", reqObj)
    .then((result) => {
      if (result.data.wyrtn.statecode === 0) {
        cb(null, result.data.wyrtn);
      } else {
        cb(result.data.wyrtn.statemsg, null);
      }
    })
    .catch((error) => {
      cb(error, null);
    });
}

//
function apiGetModuleInfo(cb) {
  let reqObj = Object.assign({}, reqTemplate);
  axios
    .post(base_url + "/strategyInfo/algoModuleInfoGet", reqObj)
    .then((result) => {
      if (result.data.wyrtn.statecode === 0) {
        for (let i = 0; i < result.data.wyrtn.datalist.length; i++) {
          if (!_g_algoInfo[result.data.wyrtn.datalist[i].AlgoID]) {
            _g_algoInfo[result.data.wyrtn.datalist[i].AlgoID] = result.data.wyrtn.datalist[i];
          }
        }
        cb(null, _g_algoInfo);
      } else {
        cb(result.data.wyrtn.statemsg, null);
      }
    })
    .catch((error) => {
      cb(error, null);
    });
}

//算法详情
export function getAlgoModuleInfoData(cb) {
  if (Object.keys(_g_algoInfo).length === 0) {
    apiGetModuleInfo(cb);
  } else {
    cb(null, _g_algoInfo);
  }
}

// 获取最新下单状态
export function getAlgoOrderStatus(cb) {
  let reqObj = Object.assign({}, reqTemplate);
  reqObj.wyreq.arguments = {};
  axios
    .post(base_url + "/strategyInfo/strategyAlgoOrderStatusGet", reqObj)
    .then((result) => {
      let orderStatusInfo = result.data.wyrtn.datalist;
      // 组合算法信息
      getAlgoModuleInfoData((err, algoObj) => {
        if (err) {
          cb(err, null);
        } else {
          let flag = true;
          for (let i = 0; i < orderStatusInfo.length; i++) {
            if (!algoObj[orderStatusInfo[i].AlgoID]) {
              flag = false;
              break;
            }
          }

          if (flag) {
            let resList = combineAlgoOrderStatus(orderStatusInfo, algoObj);
            cb(null, resList);
          } else {
            apiGetModuleInfo((error, algoObj) => {
              if (error) {
                cb(error, null);
              } else {
                let resList = combineAlgoOrderStatus(orderStatusInfo, algoObj);
                cb(null, resList);
              }
            });
          }
        }
      });
    })
    .catch((error) => {
      cb(error, null);
    });
}

function combineAlgoOrderStatus(orderStatusInfo, algoObj) {
  let resList = [];
  for (let i = 0; i < orderStatusInfo.length; i++) {
    if (orderStatusInfo[i].AlgoID && algoObj[orderStatusInfo[i].AlgoID]) {
      orderStatusInfo[i].AlgoType = algoObj[orderStatusInfo[i].AlgoID].AlgoName;
    }
    orderStatusInfo[i].Schedule = Number(
      ((Number(orderStatusInfo[i].TradeVol) / Number(orderStatusInfo[i].OrderVol)) * 100).toFixed(4)
    );
    resList.push(orderStatusInfo[i]);
  }

  return resList;
}
