import uuid from "node-uuid";
import axios from "axios";
import { getEncodeData } from "./cryptoCfg";
import {
  decodeHostUserByRsa,
  judgeUserType,
  encryptHostUserByRsa,
} from "./common";
// const base_url = "http://10.42.6.123:30000";
// const base_url = "http://10.42.6.76:41012";
// const base_url = "http://10.42.6.76:41005";
const base_url = "http://localhost:41012";


var adminName = "admin";
var password = "d2FueWFudjU4Nw==";

export var reqTemplate = {
  ClientVersion: "13.0.1",
  wyreq: {
    messageid: 0,
    requestid: 0,
    arguments: {
      adminName: adminName,
      password: password,
      captcha: "laissez_passer",
    },
    tokenID: _tokenID,
    wyuuid: uuid.v1(),
  },
  // tokenID: _tokenID,
};
var _tokenID = "";
var version = "13.1.0";

function getTokenID(callback) {
  axios
    .post(base_url + "/imgVerify", {
      ClientVersion: version,
      wyreq: {
        messageid: 0,
        requestid: 0,
        arguments: {},
      },
    })
    .then((result) => {
      _tokenID = result.data.wyrtn.datalist[0].tokenID;
      // login(version, _tokenID);
      axios
        .post(base_url + "/login", {
          ClientVersion: version,
          wyreq: {
            messageid: 0,
            requestid: 0,
            arguments: {
              adminName: adminName,
              password: password,
              captcha: "laissez_passer",
            },
            tokenID: _tokenID,
          },
        })
        .then((res) => {
          reqTemplate.wyreq.tokenID = _tokenID;
          reqTemplate.tokenID = _tokenID;
          callback(_tokenID);
        });
    })
    .catch((error) => { });
}

//新增主机
export function addTradeHost(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = {
        HostName: reqObj.hostName,
        IPV4Addr: reqObj.address,
        IsAvailable: reqObj.ifOpen,
        SSHPort: getEncodeData(String(reqObj.port)),
        HostType: reqObj.HostType,
      };
      axios
        .post(base_url + "/tradeHost/addTradeHost", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = {
      HostName: reqObj.hostName,
      IPV4Addr: reqObj.address,
      IsAvailable: reqObj.ifOpen,
      SSHPort: getEncodeData(String(reqObj.port)),
      HostType: reqObj.HostType,
    };
    axios
      .post(base_url + "/tradeHost/addTradeHost", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

// 获取主机信息;
export function getAllHostInfo(callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      axios
        .post(base_url + "/tradeHost/qryTradeHost", rtnReqArgs)
        .then((res) => {
          console.log(res.data.wyrtn.datalist);
          callback(null, res.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    axios
      .post(base_url + "/tradeHost/qryTradeHost", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function getTradeKernel(callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      axios
        .post(base_url + "/tradeKernel/qryTradeKernel", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    axios
      .post(base_url + "/tradeKernel/qryTradeKernel", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function configuredTKGet(callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      axios
        .post(base_url + "/tradeKernel/configuredTKGet", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    axios
      .post(base_url + "/tradeKernel/configuredTKGet", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function addTradeKernel(
  TradeHostID,
  TradekernelName,
  Version,
  IsAvailable,
  callback
) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = {
        TradeHostID: TradeHostID,
        TradekernelName: TradekernelName,
        Version: Version,
        IsAvailable: IsAvailable,
      };
      axios
        .post(base_url + "/tradeKernel/addTradeKernel", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = {
      TradeHostID: TradeHostID,
      TradekernelName: TradekernelName,
      Version: Version,
      IsAvailable: IsAvailable,
    };
    axios
      .post(base_url + "/tradeKernel/addTradeKernel", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

// 查看TK Json
export function findTKAllCfgJSON(paramObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = paramObj;
      var target_url = base_url + "/tradeKernel/findTKAllCfgJSON";
      axios
        .post(target_url, rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = paramObj;
    var target_url = base_url + "/tradeKernel/findTKAllCfgJSON";
    axios
      .post(target_url, rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function updateTradeHost(formItem, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = {
        TradeHostID: formItem.tradeHostID,
        HostName: formItem.hostName,
        IPV4Addr: formItem.address,
        IsAvailable: formItem.ifOpen,
        SSHPort: getEncodeData(String(formItem.port)),
        HostType: formItem.HostType,
      };
      axios
        .post(base_url + "/tradeHost/upTradeHost", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = {
      TradeHostID: formItem.tradeHostID,
      HostName: formItem.hostName,
      IPV4Addr: formItem.address,
      IsAvailable: formItem.ifOpen,
      SSHPort: getEncodeData(String(formItem.port)),
      HostType: formItem.HostType,
    };
    axios
      .post(base_url + "/tradeHost/upTradeHost", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

// 获取主机CPU信息
export function getHostCPUConfInfo(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/getTradeHostCPUConf", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err.toString(), null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/getTradeHostCPUConf", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err.toString(), null);
      });
  }
}

// 修改主机CPU信息

//查询策略信息
export function qryStrategyInfo(callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      axios
        .post(base_url + "/strategyInfo/qryStrategyInfo", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    axios
      .post(base_url + "/strategyInfo/qryStrategyInfo", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

//修改策略自启动
export function switchAutoStartStates(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/strategyInfo/switchAutoStartStates", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/strategyInfo/switchAutoStartStates", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

// 切换启用状态
export function switchAvailableState(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/common/switchAvailableState", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((error) => {
          callback(error, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/common/switchAvailableState", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((error) => {
        callback(error, null);
      });
  }
}

export function getTradeHostBriefInfo(callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      axios
        .post(base_url + "/tradeHost/getTradeHostBriefInfo", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    axios
      .post(base_url + "/tradeHost/getTradeHostBriefInfo", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function addDocker(
  TradeKernelID,
  DockerName,
  Version,
  IsAvailable,
  callback
) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = {
        TradeKernelID: TradeKernelID,
        DockerName: DockerName,
        Version: Version,
        IsAvailable: IsAvailable,
      };
      axios
        .post(base_url + "/docker/addDocker", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => { });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = {
      TradeKernelID: TradeKernelID,
      DockerName: DockerName,
      Version: Version,
      IsAvailable: IsAvailable,
    };
    axios
      .post(base_url + "/docker/addDocker", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => { });
  }
}

//查询数据库agent参数
export function getAgentCfg(paramObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = paramObj;

      var target_url = base_url + "/manageVersion/binapp/qryAgentCfg";
      axios
        .post(target_url, rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = paramObj;

    var target_url = base_url + "/manageVersion/binapp/qryAgentCfg";
    axios
      .post(target_url, rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

// 获取行情参数
export function getConfigFile_marketkernel(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = {
        // "type":type,
        FileName: reqObj.FileName,
        ProjectName: reqObj.ProjectName,
        AppName: reqObj.AppName,
        // "AppInfo":reqObj.AppInfo,
        VersionNum: reqObj.VersionNumber,
        TradeHostID: reqObj.TradeHostID,
      };
      axios
        .post(base_url + "/common/getConfigFile_conf", rtnReqArgs, {
          timeout: 2 * 60 * 1000,
        })
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = {
      // "type":type,
      FileName: reqObj.FileName,
      ProjectName: reqObj.ProjectName,
      AppName: reqObj.AppName,
      // "AppInfo":reqObj.AppInfo,
      VersionNum: reqObj.VersionNumber,
      TradeHostID: reqObj.TradeHostID,
    };
    axios
      .post(base_url + "/common/getConfigFile_conf", rtnReqArgs, {
        timeout: 2 * 60 * 1000,
      })
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

// 更新数据库HostAgent版本
export function updateAgentVersion(paramObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = paramObj;

      var target_url = base_url + "/manageVersion/binapp/updateAgentCfgByModel";
      axios
        .post(target_url, rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = paramObj;

    var target_url = base_url + "/manageVersion/binapp/updateAgentCfgByModel";
    axios
      .post(target_url, rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function getDockerInfo(callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      axios
        .post(base_url + "/docker/qryDocker", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    axios
      .post(base_url + "/docker/qryDocker", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function findSKAllCfgJSON(paramObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = paramObj;
      var target_url = base_url + "/docker/findSKAllCfgJSON";
      axios
        .post(target_url, rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = paramObj;
    var target_url = base_url + "/docker/findSKAllCfgJSON";
    axios
      .post(target_url, rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

// if (!_tokenID) {
//   getTokenID((data) => {
//     reqTemplate.tokenID = _tokenID;
//   });
// } else {
//   reqTemplate.tokenID = _tokenID;
// }

//cpu调度接口
export function getCPUDispatch(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      console.log(reqObj);
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/getTradeHostCPUDispatch", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err.toString(), null);
        });
    });
  } else {
    console.log(reqObj);
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/getTradeHostCPUDispatch", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err.toString(), null);
      });
  }
}
// 增加cpu调度
export function addCPUDispatch(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/modifyTradeHostCPUDispatch", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err.toString(), null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/modifyTradeHostCPUDispatch", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err.toString(), null);
      });
  }
}

//查询主机用户
export function getHostUserInfo(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/findHostUserByHostID", rtnReqArgs)
        .then((response) => {
          let hostUserArr = [];
          for (let i = 0; i < response.data.wyrtn.datalist.length; i++) {
            let UserTypeArr =
              response.data.wyrtn.datalist[i].UserType.split(",");
            response.data.wyrtn.datalist[i].UserType =
              judgeUserType(UserTypeArr);
            hostUserArr.push(
              decodeHostUserByRsa(response.data.wyrtn.datalist[i])
            );
          }
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err.toString(), null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/findHostUserByHostID", rtnReqArgs)
      .then((response) => {
        let hostUserArr = [];
        for (let i = 0; i < response.data.wyrtn.datalist.length; i++) {
          let UserTypeArr = response.data.wyrtn.datalist[i].UserType.split(",");
          response.data.wyrtn.datalist[i].UserType = judgeUserType(UserTypeArr);
          hostUserArr.push(
            decodeHostUserByRsa(response.data.wyrtn.datalist[i])
          );
        }
        callback(null, hostUserArr);
      })
      .catch((err) => {
        callback(err.toString(), null);
      });
  }
}

//新增主机用户
export function addHostUser(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      const req = encryptHostUserByRsa(reqObj);
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = req;
      axios
        .post(base_url + "/tradeHost/addHostUser", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err.toString(), null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    const req = encryptHostUserByRsa(reqObj);
    console.log(req);
    rtnReqArgs.wyreq.arguments = req;
    axios
      .post(base_url + "/tradeHost/addHostUser", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err.toString(), null);
      });
  }
}

//修改主机用户
// export function modifyHostUser(reqObj, callback) {
//   let rtnReqArgs = reqArgsTemplate();
//   rtnReqArgs.wyreq.arguments= encryptHostUserByRsa(reqObj);
//   wylog_decorate(wylog_level.DEBUG,rtnReqArgs.wyreq.wyuuid,fileName,"modifyHostUser $$","请求修改主机用户")
//   axios.post(baseURL + '/tradeHost/modifyHostUser', rtnReqArgs).then((response) => {
//     if (response.data.wyrtn.statecode != 0) {
//       wylog_decorate(wylog_level.ERROR,rtnReqArgs.wyreq.wyuuid,fileName,"modifyHostUser failed$$","请求修改主机用户失败","错误ID: "+response.data.wyrtn.statecode,response.data.wyrtn.statemsg)
//       if (response.data.wyrtn.statecode == -1001) {
//         alert("客户端版本过低，自动刷新页面!!!");
//         window.location.reload()
//       } else {
//         callback(response.data.wyrtn.statemsg, null);
//       }
//     } else {
//       // callback(null,response.data.wyrtn.datalist)
//       getHostUserInfo(reqObj, callback)
//     }
//   }).catch((err) => {
//     wylog_decorate(wylog_level.ERROR,rtnReqArgs.wyreq.wyuuid,fileName,"modifyHostUser exception$$","请求修改主机用户异常","错误ID: -20154",err.toString())
//     callback(err.toString(),null)
//   })
// }
export function modifyTKCfgByModel(paramObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = paramObj;
      axios
        .post(base_url + "/tradeKernel/modifyTKCfg", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err.toString(), null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = paramObj;
    axios
      .post(base_url + "/tradeKernel/modifyTKCfg", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err.toString(), null);
      });
  }
}

export function modifySKCfgByModel(paramObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = paramObj;
      axios
        .post(base_url + "/docker/modifySKCfg", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err.toString(), null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = paramObj;
    axios
      .post(base_url + "/docker/modifySKCfg", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err.toString(), null);
      });
  }
}

export function updateTradeLoginCfg(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/investorTradeKernel/modifyTradeLoginCfg", rtnReqArgs)
        .then((response) => {
          callback(null, response.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err.toString(), null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/investorTradeKernel/modifyTradeLoginCfg", rtnReqArgs)
      .then((response) => {
        callback(null, response.data.wyrtn.datalist);
      })
      .catch((err) => {
        callback(err.toString(), null);
      });
  }
}

export function tradeHostCPUCfgGet(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      console.log("object");
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/tradeHostCPUCfgGet", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/tradeHostCPUCfgGet", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function tradeHostCPUCfgChange(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      console.log("object");
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/tradeHostCPUCfgModify", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/tradeHostCPUCfgModify", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function tradeHostCPUDistributionGet(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/tradeHostCPUDistributionGet", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/tradeHostCPUDistributionGet", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function allAppByTradeHostIDGet(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/allAppByTradeHostIDGet", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/allAppByTradeHostIDGet", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function tradeHostCPUDistributionByAppIDGet(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(
          base_url + "/tradeHost/tradeHostCPUDistributionByAppIDGet",
          rtnReqArgs
        )
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(
        base_url + "/tradeHost/tradeHostCPUDistributionByAppIDGet",
        rtnReqArgs
      )
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function tradeHostCPUDistributionModify(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(
          base_url + "/tradeHost/tradeHostCPUDistributionModify",
          rtnReqArgs
        )
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/tradeHostCPUDistributionModify", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function installedNgtsInfoGet(callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = {};
      axios
        .post(base_url + "/ngtsDeploy/installedNgtsInfoGet", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = {};
    axios
      .post(base_url + "/ngtsDeploy/installedNgtsInfoGet", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

/// new here
export function findHostUserByHostID(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/findHostUserByHostID", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/findHostUserByHostID", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function modifyHostUser(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/tradeHost/modifyHostUser", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/tradeHost/modifyHostUser", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}
export function allHostAppVersionGet(callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);

      rtnReqArgs.wyreq.arguments = {
        ProjectName: "cmsagent",
        AppName: "cmsagent",
      };
      axios
        .post(
          base_url + "/manageVersion/binapp/allHostAppVersionGet",
          rtnReqArgs
        )
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = {};
    axios
      .post(base_url + "/manageVersion/binapp/allHostAppVersionGet", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}



//=------------------------------
export function algoDockerAdd(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/algoDocker/algoDockerAdd", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/algoDocker/algoDockerAdd", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function algoDockerGet(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/algoDocker/algoDockerGet", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/algoDocker/algoDockerGet", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function algoDockerModify(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/algoDocker/algoDockerModify", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/algoDocker/algoDockerModify", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function algoDockerCfgModify(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/algoDocker/algoDockerCfgModify", rtnReqArgs)
        .then((res) => {
          callback(null, res.data.wyrtn.datalist);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;
    axios
      .post(base_url + "/algoDocker/algoDockerCfgModify", rtnReqArgs)
      .then((res) => {
        callback(null, res.data.wyrtn.datalist);
      });
  }
}

export function getAlgoJson(callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = {};
      axios
        .post(base_url + "/algoModule/algoModuleArgGet", rtnReqArgs)
        .then((res) => {
          console.log(res.data.wyrtn.datalist);
          callback(null, res.data.wyrtn.datalist);
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = {};
    axios
      .post(base_url + "/algoModule/algoModuleArgGet", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function updateAlgoArg(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.toenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj;
      axios
        .post(base_url + "/algoModule/algoModuleArgModify", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj;

    axios
      .post(base_url + "/algoModule/algoModuleArgModify", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function addAlgoInfo(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/algoModule/algoModuleInfoAdd", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj

    axios
      .post(base_url + "/algoModule/algoModuleInfoAdd", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function updateAlgoInfo(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/algoModule/algoModuleInfoModify", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj
    axios
      .post(base_url + "/algoModule/algoModuleInfoModify", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

export function algoAndAKIsAvailableModify(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/algoModule/algoAndAKIsAvailableModify", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj
    axios
      .post(base_url + "/algoModule/algoAndAKIsAvailableModify", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

//新增MK
export function marketKernelAdd(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/marketKernel/MKAdd", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj
    axios
      .post(base_url + "/marketKernel/MKAdd", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}


//新增MK配置
export function marketKernelCfgAdd(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/marketKernel/MKCfgAdd", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj
    axios
      .post(base_url + "/marketKernel/MKCfgAdd", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

//查看MK
export function marketKernelCfgGet(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/marketKernel/MKCfgJSONByHostIDGet", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj
    axios
      .post(base_url + "/marketKernel/MKCfgJSONByHostIDGet", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

//修改MK参数
export function marketKernelCfgModify(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/marketKernel/MKCfgModify", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj
    axios
      .post(base_url + "/marketKernel/MKCfgModify", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}


//增加MK API配置
export function marketAPICfgAdd(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/marketKernel/MKAPICfgAdd", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj
    axios
      .post(base_url + "/marketKernel/MKAPICfgAdd", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

//修改MK API配置
export function marketAPICfgModify(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/marketKernel/MKAPICfgModify", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj
    axios
      .post(base_url + "/marketKernel/MKAPICfgModify", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

//修改MK
export function marketModify(reqObj, callback) {
  if (!_tokenID) {
    getTokenID((data) => {
      reqTemplate.tokenID = _tokenID;
      let rtnReqArgs = Object.assign({}, reqTemplate);
      rtnReqArgs.wyreq.arguments = reqObj
      axios
        .post(base_url + "/marketKernel/MKModify", rtnReqArgs)
        .then((res) => {
          if (res.data.wyrtn.statecode !== 0) {
            callback(res.data.wyrtn.statemsg, null)
          } else {
            callback(null, res.data.wyrtn.datalist);
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    });
  } else {
    reqTemplate.tokenID = _tokenID;
    let rtnReqArgs = Object.assign({}, reqTemplate);
    rtnReqArgs.wyreq.arguments = reqObj
    axios
      .post(base_url + "/marketKernel/MKModify", rtnReqArgs)
      .then((res) => {
        if (res.data.wyrtn.statecode !== 0) {
          callback(res.data.wyrtn.statemsg, null)
        } else {
          callback(null, res.data.wyrtn.datalist);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}
