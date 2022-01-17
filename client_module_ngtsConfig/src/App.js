import React, { useState, useEffect, useRef, Children, memo } from "react";
import "./App.css";
import "antd/dist/antd.css";
import MonacoEditor from "react-monaco-editor";
import {
  Table,
  Card,
  Space,
  Button,
  Input,
  Modal,
  Form,
  Select,
  Radio,
  Switch,
  Transfer,
  message,
  Alert
} from "antd";
import TransferCpu from "./TransferCpu";
import {
  findTKAllCfgJSON,
  addTradeHost,
  getAllHostInfo,
  updateTradeHost,
  getHostCPUConfInfo,
  qryStrategyInfo,
  switchAutoStartStates,
  switchAvailableState,
  getTradeHostBriefInfo,
  addTradeKernel,
  getTradeKernel,
  addDocker,
  getAgentCfg,
  getConfigFile_marketkernel,
  updateAgentVersion,
  getDockerInfo,
  findSKAllCfgJSON,
  getCPUDispatch,
  addCPUDispatch,
  getHostUserInfo,
  addHostUser,
  modifySKCfgByModel,
  modifyTKCfgByModel,
  updateTradeLoginCfg,
  tradeHostCPUCfgGet,
  tradeHostCPUCfgChange,
  installedNgtsInfoGet,
  // tradeHostCPUDistributionModify,
  modifyHostUser,
  allHostAppVersionGet,
  algoDockerAdd,
  algoDockerGet,
  algoDockerModify,
  algoDockerCfgModify,
  getAlgoJson,
  updateAlgoArg,
  addAlgoInfo,
  updateAlgoInfo,
  algoAndAKIsAvailableModify,
  configuredTKGet,
  marketKernelCfgAdd,
  marketKernelCfgGet,
  marketKernelCfgModify,
  marketAPICfgAdd,
  marketAPICfgModify,
  marketKernelAdd,
  marketModify
} from "./post/getData";
import { getDecodeData } from "./post/cryptoCfg";

const option = {
  lineNumbers: false,
};
let jsonValueTK;
let jsonValueSK;
let jsonValueAK;
let jsonValueMK;

function App() {
  const [mkJson, setMkJson] = useState()
  const [akJson, setAkJson] = useState()
  // 配置详情的table data
  const [configData, setConfigData] = useState([])
  // diff 清空transfer modal
  const [clearSelect, setClearSelect] = useState(true)
  const [oldName, setOldName] = useState();
  const [trackChange, setTrackChange] = useState(1);
  const [tmpSK, setTmpSK] = useState();
  const [tmpTK, setTmpTK] = useState();
  const [tmpAK, setTmpAK] = useState();
  const [ifSelect, setIfSelect] = useState(false);
  // 穿梭框
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [reqForSwitch, setReqForSwitch] = useState({});
  const [selectHost, setSelectHost] = useState([]);
  const [akArg, setAkArg] = useState([])
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys);
    const arr = [];
    const req = { StrategiesArr: arr };
    for (let i = 0; i < moveKeys.length; i++) {
      arr.push({
        StrategyID: moveKeys[i],
        IsAutoStart: 1,
      });
    }
    setReqForSwitch(req);
    setTargetKeys(nextTargetKeys);
  };
  const [selectFlag, setSelectFlag] = useState(0)
  const changeSelect = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys);
    console.log(selectedRows);
    setSelectHost(selectedRows);
    // setSelectFlag(Math.random())
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      changeSelect(selectedRowKeys, selectedRows);
    },
  };
  const [mockData, setMockData] = useState([]);

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log("sourceSelectedKeys:", sourceSelectedKeys);
    console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const [hostInfo, setHostInfo] = useState([]);
  const [tkInfo, setTkInfo] = useState([]);
  const [tkAllInfo, setTkAllInfo] = useState([]);
  const [skInfo, setSkInfo] = useState([]);
  const [CPUCount, setCPUCount] = useState("");
  const [CPUFreq, setCPUFreq] = useState("");

  const [reusableStart, setReusableStart] = useState("");
  const [reusableEnd, setReusableEnd] = useState("");
  const [unreusableStart, setUnreusableStart] = useState("");
  const [unreusableEnd, setUnreusableEnd] = useState("");
  const [useVersion, setUseVersion] = useState([]);

  const [tradeHostID, setTradeHostID] = useState();
  const [showAddUser, setShowAddUser] = useState(false);
  const [showChangeUser, setShowChangeUser] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleTK, setIsModalVisibleTK] = useState(false);
  const [isModalVisibleSK, setIsModalVisibleSK] = useState(false);
  const [isModalVisibleAK, setIsModalVisibleAK] = useState(false);
  const [isModalVisibleMK, setIsModalVisibleMK] = useState(false)
  const [isModalVisibleAddMK, setIsModalVisibleAddMK] = useState(false);
  const [isModalVisibleHost, setIsModalVisibleHost] = useState(false);
  const [isModalVisibleAddTK, setIsModalVisibleAddTK] = useState(false);
  const [changeProInfo, setChangeProInfo] = useState(false);
  const [addProInfo, setAddProInfo] = useState(false);
  const [isModalVisibleAddSK, setIsModalVisibleAddSK] = useState(false);
  const [isModalVisibleAddAK, setIsModalVisibleAddAK] = useState(false);
  const [isModalVisibleCPU, setIsModalVisibleCPU] = useState(false);
  const [isModalVisibleOpen, setIsModalVisibleOpen] = useState(false);
  const [isModalVisibleAgent, setIsModalVisibleAgent] = useState(false);
  const [ifShowCPU, setIfShowCPU] = useState(false);
  const [ifShowUser, setIfShowUser] = useState(false);
  const [isModalVisibleConfirmAgent, setIsModalVisibleConfirmAgent] =
    useState(false);
  const [isModalVisibleQuotation, setIsModalVisibleQuotation] = useState(false);
  const [isModalVisibleChangeHost, setIsModalVisibleChangeHost] =
    useState(false);
  const [json, setJson] = useState(`{
	"tradekernelID": 101,
	"tradekernelName": "zj2TradeKernel1",
	"version": "1.2.12.738",
	"memory_dir_path": "/home/wyngts/running/shm",
	"trade_api_dir_path": "/home/wyngts/running/tradeapilib",
	"log_level": "DEBUG",
	"log_file_path": "/home/wyngts/running/logs",
	"cores": [
		"4",
		"3",
		"5"
	],
	"self_trade": 4,
	"cancel_times": 490,
	"big_cancel_times": 45,
	"CFFEX_cancel": 390,
	"exCfgJson": {
		"is_speed_mode": false,
		"MarketSession": {
			"ExecAccountID": "10302633",
			"MarketSessionID": [
				2,
				3,
				4,
				5,
				6,
				7,
				8
			],
			"ProductID": "fu",
			"GroupCount": 3,
			"MaxFlowControl": 5
		}
	},
	"trade_account": [
		{
			"api_name": "rempl",
			"api_version": "2.0.0.9",
			"investor_id": "10302633",
			"front_addr": "192.60.10.86:20000",
			"password": "517545",
			"extra_api_conf": {
				"instrument_json": "/home/wyngts/release/const_parameters/instrument.json",
				"query_addr": "192.60.10.85:20001",
				"front_addr": "192.60.10.86:20000",
				"local_ip": "192.60.10.167",
				"trade_udp_port": 19999,
				"appid": "client_wanyan_1.0",
				"authcode": "e6tu552lh",
				"shm_flow": true,
				"shm_path": "/home/wyngts/running/shm"
			},
			"autoffset": [],
			"cancel_ignore": []
		},
		{
			"api_name": null,
			"api_version": null,
			"investor_id": "11808806",
			"front_addr": null,
			"password": null,
			"extra_api_conf": null,
			"autoffset": [],
			"cancel_ignore": []
		}
	]
}`);
  const addHostForm = useRef();
  const addTKForm = useRef();
  const addSKForm = useRef();
  const addAKForm = useRef();
  const addMKForm = useRef();
  const changeHostInfoForm = useRef();
  const changeCPUInfoForm = useRef();
  const addCPUInfoForm = useRef();
  const CPUInfo = useRef();


  const mkAllModify = (tradeHostID, reqObjTmp, preReqObj) => {
    const reqMkModify = {
      TradeHostID: tradeHostID,
      PreTradeHostID: tradeHostID,
      Version: reqObjTmp.version,
      PreVersion: preReqObj.version,
      MarketKernelName: reqObjTmp.market_kernel_name,
      PreMarketKernelName: preReqObj.market_kernel_name,
      LogLevel: reqObjTmp.log_level,
      LogFilePath: reqObjTmp.log_file_path,
      MemoryDirPath: reqObjTmp.memory_dir_path,
      MarketLibPath: reqObjTmp.market_lib_path,
      cfgJson: JSON.stringify(reqObjTmp.cfg_json),
      IsAvailable: reqObjTmp.is_available
    }
    if (reqObjTmp.version !== preReqObj.version) {
      message.warn('无法修改版本号')
    } else {
      marketKernelCfgModify(reqMkModify, (err, res) => {
        if (!err) {
          console.log(res)
          let keyAvailable = true;
          // 判断api中的key是否正确
          console.log(reqObjTmp.md_apis)
          for (let data of reqObjTmp.md_apis) {
            if (data['mk_api_name'] === undefined || data['is_available'] === undefined || data['api_version'] === undefined || data['mk_api_lib_name'] === undefined || data['mk_feature'] === undefined || data['is_sub_all'] === undefined || data['api_cfg_json'] === undefined || data['api_sub_json'] === undefined) {
              keyAvailable = false
            }
          }

          console.log(keyAvailable)
          // 如果api中的key的值正确，进行接口调用修改数据库数据
          // 修改mk的名称和mk的可用状态
          const req = {
            TradeHostID: tradeHostID,
            MarketKernelName: reqObjTmp.market_kernel_name,
            IsAvailable: reqObjTmp.is_available
          }
          marketModify(req, (err, res) => {

            if (!err) {
              if (keyAvailable) {

                // 进行新增MK api
                if (reqObjTmp.md_apis.length !== preReqObj.md_apis.length) {
                  const req = []
                  for (let data of reqObjTmp.md_apis) {
                    req.push({
                      MarketKernelName: reqObjTmp.market_kernel_name,
                      Version: reqObjTmp.version,
                      MarketApiName: data.mk_api_name,
                      MarketApiVersion: data.api_version,
                      MarketApiLibName: data.mk_api_lib_name,
                      IsAvailable: data.is_available,
                      MarketFeature: data.mk_feature,
                      IsSubAll: data.is_sub_all,
                      ApiCfgJson: data.api_cfg_json,
                      ApiSubJson: data.api_sub_json
                    })
                  }
                  marketAPICfgAdd(req, (err, res) => {
                    if (!err) {
                      marketKernelCfgGet({ TradeHostID: tradeHostID }, (err, res) => {
                        console.log(res)
                        let obj = {}
                        let tmpJson;
                        let keyObj;
                        MKS.length = 0
                        for (let data of res) {
                          delete data['trade_host_id']
                          tmpJson = JSON.stringify(data, null, '\t')
                          // 全部的数据
                          obj.mkJson = tmpJson
                          // 额外添加字段,用于判断是否修改的元数据
                          keyObj = JSON.parse(tmpJson)
                          setPreReqObj(Object.assign({}, JSON.parse(tmpJson)))
                          obj.mkName = keyObj.market_kernel_name

                          obj.tradeHostID = tradeHostID
                          MKS.push(obj)
                          obj = {}
                          console.log(obj)
                          console.log(tmpJson)
                          setMKS([...MKS])
                        }

                      })
                      message.success('保存成功')
                    } else {
                      message.warn('md_apis字段存在重复添加情况')
                    }
                  })
                }
                // 进行修改MK api 
                if (reqObjTmp.md_apis.length === preReqObj.md_apis.length) {
                  const req = []
                  for (let data of reqObjTmp.md_apis) {
                    req.push({
                      MarketKernelName: reqObjTmp.market_kernel_name,
                      Version: reqObjTmp.version,
                      MarketApiName: data.mk_api_name,
                      MarketApiVersion: data.api_version,
                      MarketApiLibName: data.mk_api_lib_name,
                      IsAvailable: data.is_available,
                      MarketFeature: data.mk_feature,
                      IsSubAll: data.is_sub_all,
                      ApiCfgJson: data.api_cfg_json,
                      ApiSubJson: data.api_sub_json
                    })
                  }
                  marketAPICfgModify(req, (err, res) => {
                    if (!err) {
                      marketKernelCfgGet({ TradeHostID: tradeHostID }, (err, res) => {
                        console.log(res)
                        let obj = {}
                        let tmpJson;
                        let keyObj;
                        MKS.length = 0
                        for (let data of res) {
                          delete data['trade_host_id']
                          tmpJson = JSON.stringify(data, null, '\t')
                          // 全部的数据
                          obj.mkJson = tmpJson
                          // 额外添加字段,用于判断是否修改的元数据
                          keyObj = JSON.parse(tmpJson)
                          setPreReqObj(Object.assign({}, JSON.parse(tmpJson)))
                          obj.mkName = keyObj.market_kernel_name

                          obj.tradeHostID = tradeHostID
                          MKS.push(obj)
                          obj = {}
                          console.log(obj)
                          console.log(tmpJson)
                          setMKS([...MKS])
                        }

                      })
                      message.success('保存成功')
                    } else {
                      message.warn(err)
                    }
                  })
                }
              } else {
                if (reqObjTmp.md_apis.length !== 0) {
                  message.warn('md_apis中的key错误，请检查')
                }
              }
            } else {
              message.warn(err)
            }
          })
          // setPreReqObj(reqObjTmp)
          // setMkJson(JSON.stringify(reqObjTmp, null, '\t'))
        } else {
          message.warn(err)
        }
      })
    }

  }
  const mkCfgModify = (tradeHostID, reqObjTmp, preReqObj) => {
    if (reqObjTmp.market_kernel_name !== preReqObj.market_kernel_name || reqObjTmp.version !== preReqObj.version || reqObjTmp.log_level !== preReqObj.log_level || reqObjTmp.log_file_path !== preReqObj.log_file_path || reqObjTmp.memory_dir_path !== preReqObj.memory_dir_path || reqObjTmp.market_lib_path !== preReqObj.market_lib_path || reqObjTmp.is_available !== preReqObj.is_available || JSON.stringify(reqObjTmp.cfg_json) !== JSON.stringify(preReqObj.cfg_json)) {
      const req = {
        TradeHostID: tradeHostID,
        PreTradeHostID: tradeHostID,
        Version: reqObjTmp.version,
        PreVersion: preReqObj.version,
        MarketKernelName: reqObjTmp.market_kernel_name,
        PreMarketKernelName: preReqObj.market_kernel_name,
        LogLevel: reqObjTmp.log_level,
        LogFilePath: reqObjTmp.log_file_path,
        MemoryDirPath: reqObjTmp.memory_dir_path,
        MarketLibPath: reqObjTmp.market_lib_path,
        cfgJson: JSON.stringify(reqObjTmp.cfg_json),
        IsAvailable: reqObjTmp.is_available
      }
      marketKernelCfgModify(req, (err, res) => {
        if (!err) {
          console.log(res)
          marketKernelCfgGet({ TradeHostID: tradeHostID }, (err, res) => {
            console.log(res)
            let obj = {}
            let tmpJson;
            let keyObj;
            MKS.length = 0
            for (let data of res) {
              delete data['trade_host_id']
              tmpJson = JSON.stringify(data, null, '\t')
              // 全部的数据
              obj.mkJson = tmpJson
              setMkJson(tmpJson)
              // 额外添加字段,用于判断是否修改的元数据
              keyObj = JSON.parse(tmpJson)
              setPreReqObj(Object.assign({}, JSON.parse(tmpJson)))
              obj.mkName = keyObj.market_kernel_name

              obj.tradeHostID = tradeHostID
              MKS.push(obj)
              obj = {}
              console.log(obj)
              console.log(tmpJson)
              setMKS([...MKS])
            }

          })
          message.success('保存成功')
          setPreReqObj(reqObjTmp)
          setMkJson(JSON.stringify(reqObjTmp, null, '\t'))
        } else {
          message.warn(err)
        }
      })
    }
  }
  const mkApiCfgModify = (reqObjTmp, preReqObj) => {
    let keyAvailable = true;
    for (let data of reqObjTmp.md_apis) {
      if (data['mk_api_name'] === undefined || data['is_available'] === undefined || data['api_version'] === undefined || data['mk_api_lib_name'] === undefined || data['mk_feature'] === undefined || data['is_sub_all'] === undefined || data['api_cfg_json'] === undefined || data['api_sub_json'] === undefined) {
        keyAvailable = false
      }
    }
    console.log(keyAvailable)
    if (keyAvailable) {
      // 进行新增MK api
      if (!(reqObjTmp.market_kernel_name !== preReqObj.market_kernel_name || reqObjTmp.version !== preReqObj.version || reqObjTmp.log_level !== preReqObj.log_level || reqObjTmp.log_file_path !== preReqObj.log_file_path || reqObjTmp.memory_dir_path !== preReqObj.memory_dir_path || reqObjTmp.market_lib_path !== preReqObj.market_lib_path || reqObjTmp.is_available !== preReqObj.is_available || JSON.stringify(reqObjTmp.cfg_json) !== JSON.stringify(preReqObj.cfg_json)) && reqObjTmp.md_apis.length !== preReqObj.md_apis.length) {
        const req = []
        for (let data of reqObjTmp.md_apis) {
          req.push({
            MarketKernelName: reqObjTmp.market_kernel_name,
            Version: reqObjTmp.version,
            MarketApiName: data.mk_api_name,
            MarketApiVersion: data.api_version,
            MarketApiLibName: data.mk_api_lib_name,
            IsAvailable: data.is_available,
            MarketFeature: data.mk_feature,
            IsSubAll: data.is_sub_all,
            ApiCfgJson: data.api_cfg_json,
            ApiSubJson: data.api_sub_json
          })
        }
        marketAPICfgAdd(req, (err, res) => {
          if (!err) {
            console.log('objec1111111t')
            message.success('保存成功')
          } else {
            console.log(err)
            message.warn(err)
          }
        })
      }
      // 进行修改MK api 
      if (!(reqObjTmp.market_kernel_name !== preReqObj.market_kernel_name || reqObjTmp.version !== preReqObj.version || reqObjTmp.log_level !== preReqObj.log_level || reqObjTmp.log_file_path !== preReqObj.log_file_path || reqObjTmp.memory_dir_path !== preReqObj.memory_dir_path || reqObjTmp.market_lib_path !== preReqObj.market_lib_path || reqObjTmp.is_available !== preReqObj.is_available || JSON.stringify(reqObjTmp.cfg_json) !== JSON.stringify(preReqObj.cfg_json)) && reqObjTmp.md_apis.length === preReqObj.md_apis.length) {
        const req = []
        for (let data of reqObjTmp.md_apis) {
          req.push({
            MarketKernelName: reqObjTmp.market_kernel_name,
            Version: reqObjTmp.version,
            MarketApiName: data.mk_api_name,
            MarketApiVersion: data.api_version,
            MarketApiLibName: data.mk_api_lib_name,
            IsAvailable: data.is_available,
            MarketFeature: data.mk_feature,
            IsSubAll: data.is_sub_all,
            ApiCfgJson: data.api_cfg_json,
            ApiSubJson: data.api_sub_json
          })
        }
        marketAPICfgModify(req, (err, res) => {
          if (!err) {
            message.success('保存成功')
          } else {
            message.warn(err)
          }
        })
      }
    } else {
      if (reqObjTmp.md_apis.length !== 0) {
        message.warn('md_apis中的key错误，请检查')
      }
    }
  }
  const [cpuTrack, setCpuTrack] = useState(0);
  const changeCPUInfo = () => {
    setCpuTrack(1);
  };
  useEffect(() => {
    if (cpuTrack === 1) {
      console.log("object");
      const form = CPUInfo.current;
      const Info = form.getFieldsValue(true);
      console.log(Info);
      console.log(tradeHostID);
    }
  }, [cpuTrack]);
  const ifSwitch = (record) => {
    console.log(record);
    const record_isAvailable = record.IsAvailable === 0 ? 1 : 0;
    console.log(record_isAvailable);
    const req = {
      IsAvailable: record_isAvailable,
      TableName: "t_TradeHost",
      columnArgs: { HostName: record.HostName },
    };
    switchAvailableState(req, (error, res) => {
      if (!error) {
        message.success("修改状态成功");
        getAllHostInfo((error, res) => {
          const tmpDatas = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].HostType === "0") {
              res[i].HostType = "交易主机";
            } else {
              res[i].HostType = "本地主机";
            }
            const tmpData = {
              key: i,
              TradeHostID: res[i].TradeHostID,
              HostName: res[i].HostName,
              IPV4Addr: res[i].IPV4Addr,
              HostType: res[i].HostType,
              IsAvailable: res[i].IsAvailable,
            };
            tmpDatas.push(tmpData);
          }
          const result = uniqueFun(tmpDatas, "TradeHostID");
          setData(result);
        });
      } else {
        message.error(error);
      }
    });
  };
  const columns = [
    {
      title: "主机ID",
      dataIndex: "TradeHostID",
      key: "hostID",
    },
    {
      title: "主机名称",
      dataIndex: "HostName",
      key: "hostName",
    },
    {
      title: "IPV4地址",
      dataIndex: "IPV4Addr",
      key: "address",
    },
    {
      title: "主机类型",
      dataIndex: "HostType",
      key: "hostType",
    },
    {
      title: "是否启用",
      dataIndex: "IsAvailable",
      key: "ifOpen",
      render: (text, record) => (
        <Switch
          checkedChildren="是"
          unCheckedChildren="否"
          checked={record.IsAvailable === 0 ? false : true}
          onClick={() => {
            ifSwitch(record);
          }}
        />
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) =>
        record.HostType === "本地主机" ? (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                showHostInfo(record);
              }}
            >
              修改
            </Button>
            <Button
              type="primary"
              onClick={() => {
                showCPUProgram(record);
              }}
            >
              CPU程序调度配置
            </Button>
            <Button
              type="primary"
              onClick={() => {
                showUser(record);
              }}
            >
              主机用户配置
            </Button>
          </Space>
        ) : (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                showHostInfo(record);
              }}
            >
              修改
            </Button>
            {/* <Button
              type="primary"
              onClick={() => {
                showQuotation(record);
              }}
            >
              行情参数
            </Button> */}
            <Button
              type="primary"
              onClick={() => {
                showAgent(record);
              }}
            >
              agent参数
            </Button>
            <Button
              type="primary"
              onClick={() => {
                showCPUInfo(record);
              }}
            >
              CPU配置
            </Button>
            <Button
              type="primary"
              onClick={() => {
                showOpen(record);
              }}
            >
              自启动
            </Button>
            {/* <Button type="primary" onClick={showModal}>
              NGTS部署
            </Button> */}
            <Button
              type="primary"
              onClick={() => {
                showCPUProgram(record);
              }}
            >
              CPU程序调度配置
            </Button>
            <Button
              type="primary"
              onClick={() => {
                showUser(record);
              }}
            >
              主机用户配置
            </Button>
            <Button
              type="primary"
              onClick={() => {
                showModal(record);
              }}
            >
              配置详情
            </Button>
          </Space>
        ),
    },
  ];

  // 配置详情的table
  const configColumns = [
    {
      title: "主机ID",
      dataIndex: "TradeHostID",
      key: "hostID",
    },
    {
      title: "主机名称",
      dataIndex: "HostName",
      key: "hostName",
    },
    {
      title: "IPV4地址",
      dataIndex: "IPV4Addr",
      key: "address",
    },
    {
      title: "主机类型",
      dataIndex: "HostType",
      key: "hostType",
    },
    {
      title: "TK ID",
      dataIndex: "tkID",
      key: "tkID"
    },
    {
      title: "TK名称",
      dataIndex: "tkName",
      "key": "tkName"
    }
  ]
  const CPUcolumns = [
    {
      title: "程序ID",
      dataIndex: "AppID",
      key: "AppID",
    },
    {
      title: "程序名称",
      dataIndex: "AppName",
      key: "AppName",
    },
    {
      title: "线程任务ID",
      dataIndex: "ThreadID",
      key: "ThreadID",
    },
    {
      title: "CPUID",
      dataIndex: "CPUID",
      key: "CPUID",
    },
    {
      title: "操作",
      dataIdex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            changeCPU(record);
          }}
        >
          修改
        </Button>
      ),
    },
  ];
  const userColumns = [
    {
      title: "用户名",
      dataIndex: "UserName",
      key: "UserName",
    },
    {
      title: "用户主目录",
      dataIndex: "UserHomeDir",
      key: "UserHomeDir",
    },
    {
      title: "用户类型",
      dataIndex: "UserType",
      key: "UserType",
    },
    {
      title: "操作",
      dataIdex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            ifShowChangeUser(record);
          }}
        >
          修改
        </Button>
      ),
    },
  ];
  const [userData, setUserData] = useState([]);
  const [CPUData, setCPUData] = useState([]);
  const [data, setData] = useState([]);
  const [initData, setInitData] = useState([]);
  const [TKJSON, setTKJSON] = useState();
  const [SKJSON, setSKJSON] = useState();
  const [AKJSON, setAKJSON] = useState()
  const [MKJSON, setMKJSON] = useState()
  const [agentJson, setAgentJson] = useState();

  const inputSearch = (e) => {
    const searchData = [];
    for (let i = 0; i < initData.length; i++) {
      if (String(initData[i].TradeHostID).indexOf(e.target.value) !== -1) {
        searchData.push(initData[i]);
      } else if (initData[i].HostName.indexOf(e.target.value) !== -1) {
        searchData.push(initData[i]);
      } else if (initData[i].IPV4Addr.indexOf(e.target.value) !== -1) {
        searchData.push(initData[i]);
      } else if (initData[i].HostType.indexOf(e.target.value) !== -1) {
        searchData.push(initData[i]);
      }
    }
    setData(searchData);
  };

  ///////////// modal operation ///////////////////
  const [SKS, setSKS] = useState([]);
  const [TKS, setTKS] = useState([]);
  const [AKS, setAKS] = useState([]);
  const [MKS, setMKS] = useState([])
  const [preReqObj, setPreReqObj] = useState()
  const showModal = (record) => {
    console.log(record);
    for (let sk of skInfo) {
      if (sk.TradeHostID === record.TradeHostID) {
        console.log(sk);
        findSKAllCfgJSON({ DockerID: sk.DockerID }, (err, res) => {
          console.log("object");
          sk.skJson = JSON.stringify(res[0], null, "\t");
          sk.flag = false;
          SKS.push(sk);
          console.log(SKS);
          setSKS([...SKS]);
        });
      }
    }
    for (let tk of tkAllInfo) {
      if (tk.TradeHostID === record.TradeHostID) {
        console.log(tk);
        configData.length = 0
        findTKAllCfgJSON({ TradeKernelID: tk.TradeKernelID }, (err, res) => {
          tk.tkJson = JSON.stringify(res[0], null, "\t");
          tk.flag = false;
          TKS.push(tk);
          console.log(res[0])
          record.tkID = res[0].tradekernelID
          record.tkName = res[0].tradekernelName
          configData.push(record)
          console.log(configData)
          setConfigData(configData)

          console.log(TKS);
          setTKS([...TKS]);
          // setTKJSON(JSON.stringify(res[0], null, "\t"));
        });
      }
    }
    setTradeHostID(record.TradeHostID)
    algoDockerGet({ TradeHostID: record.TradeHostID }, (err, res) => {
      console.log(res)
      let obj = {}
      let tmpJson;
      for (let data of res) {
        tmpJson = JSON.stringify(data, null, '\t')
        obj.akJson = tmpJson
        obj.flag = false
        obj.akID = JSON.parse(tmpJson).algoDockerID
        obj.akName = JSON.parse(tmpJson).algoDockerName
        obj.version = JSON.parse(tmpJson).version
        obj.load_algos = JSON.parse(tmpJson).load_algos
        obj.is_available = JSON.parse(tmpJson).is_available
        console.log(obj.load_algos)
        AKS.push(obj)
        obj = {}
        setAKS([...AKS])
      }
      console.log(res)
      console.log(AKS)
    })

    marketKernelCfgGet({ TradeHostID: record.TradeHostID }, (err, res) => {
      console.log(res)
      let obj = {}
      let tmpJson;
      let keyObj;
      for (let data of res) {
        delete data['trade_host_id']
        tmpJson = JSON.stringify(data, null, '\t')
        // 全部的数据
        obj.mkJson = tmpJson
        // setMkJson(tmpJson)
        // 额外添加字段,用于判断是否修改的元数据
        keyObj = JSON.parse(tmpJson)
        setPreReqObj(Object.assign({}, JSON.parse(tmpJson)))
        obj.mkName = keyObj.market_kernel_name

        obj.tradeHostID = record.TradeHostID
        MKS.push(obj)
        obj = {}
        console.log(obj)
        console.log(tmpJson)
        console.log(MKS)
        setMKS([...MKS])
      }

    })

    setIsModalVisible(true);
  };

  const handleOk = () => {
    setSKS([]);
    setAKS([]);
    setTKS([]);
    setMKS([])
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setTKS([]);
    setAKS([]);
    setSKS([]);
    setMKS([])
    setIsModalVisible(false);
  };

  const [tkCard, setTkCard] = useState([]);
  const showModalTK = () => {
    // for (let host of selectHost) {
    //   const tmp = {};
    //   for (let tk of tkAllInfo) {
    //     if (tk.TradeHostID === host.TradeHostID) {
    //       findTKAllCfgJSON({ TradeKernelID: tk.TradeKernelID }, (err, res) => {
    //         tmp.TKJson = JSON.stringify(res[0], null, "\t");
    //         tmp.tkID = tk.TradeKernelID;
    //         tmp.tkName = tk.TradekernelName;
    //         tmp.HostName = host.HostName;
    //         tmp.TradeHostID = host.TradeHostID;
    //         host.TKJson = JSON.stringify(res[0], null, "\t");
    //         host.tkID = tk.TradeKernelID;
    //         host.tkName = tk.TradekernelName;
    //         console.log(host);
    //         setTkCard((tkCard) => [...tkCard, tmp]);
    //         setTKJSON(JSON.stringify(res[0], null, "\t"));
    //       });
    //     }
    //   }
    // }
    if (selectHost.length === 0) {
      message.warn("请先勾选需要查看的主机")
    } else {
      for (let host of selectHost) {
        host.tk = [];
        for (let tk of tkAllInfo) {
          if (tk.TradeHostID === host.TradeHostID) {
            const tmpTK = {};
            tmpTK.tkID = tk.TradeKernelID;
            tmpTK.tkName = tk.TradekernelName;
            findTKAllCfgJSON({ TradeKernelID: tk.TradeKernelID }, (err, res) => {
              tmpTK.tkJson = JSON.stringify(res[0], null, "\t");
              host.tk.push(tmpTK);
              setTKJSON(JSON.stringify(res[0], null, "\t"));
              setIsModalVisibleTK(true);
            });
          }
        }
      }
    }

  };

  const handleOkTK = () => {
    // setTkCard([]);
    setIsModalVisibleTK(false);
  };

  const handleCancelTK = () => {
    // setTkCard([]);
    setIsModalVisibleTK(false);
  };
  const showModalSK = () => {
    if (selectHost.length === 0) {
      message.warn("请先勾选需要查看的主机")
    } else {
      for (let host of selectHost) {
        host.sk = [];
        for (let sk of skInfo) {
          if (sk.TradeHostID === host.TradeHostID) {
            const tmpSK = {};
            tmpSK.skID = sk.DockerID;
            tmpSK.skName = sk.DockerName;
            findSKAllCfgJSON({ DockerID: sk.DockerID }, (err, res) => {
              tmpSK.skJson = JSON.stringify(res[0], null, "\t");
              host.sk.push(tmpSK);
              setSKJSON(JSON.stringify(res[0], null, "\t"));
            });
          }
        }
      }
      setIsModalVisibleSK(true);
    }

  };

  const handleOkSK = () => {
    setIsModalVisibleSK(false);
  };

  const handleCancelSK = () => {
    setIsModalVisibleSK(false);
  };

  // ak 获取延迟导致渲染慢，---尝试用useState解决
  const showModalAK = () => {
    if (selectHost.length === 0) {
      message.warn('请先勾选需要查看的主机')
    } else {
      for (let host of selectHost) {
        // host.sk = [];
        host.ak = [];
        algoDockerGet({ TradeHostID: host.TradeHostID }, (err, res) => {
          for (let ak of res) {
            const tmpAK = {}
            tmpAK.akID = ak.algoDockerID
            tmpAK.akName = ak.algoDockerName
            tmpAK.akJson = JSON.stringify(ak, null, '\t')
            // console.log(tmpAK)
            host.ak.push(tmpAK)
            setAKJSON(JSON.stringify(ak, null, '\t'))
            // setSelectHost((item) => [...item, host])
            // setAk((ak) => [...ak, tmpAK])
          }
        })
      }
      setIsModalVisibleAK(true);
    }

  };

  const handleOkAK = () => {
    setIsModalVisibleAK(false);
  };

  const handleCancelAK = () => {
    setIsModalVisibleAK(false);
  };

  const showModalMK = () => {
    if (selectHost.length === 0) {
      message.warn("请先勾选需要查看的主机")
    } else {

      for (let host of selectHost) {
        host.mk = [];
        marketKernelCfgGet({ TradeHostID: host.TradeHostID }, (err, res) => {
          console.log(res)
          for (let mk of res) {
            if (mk.trade_host_id === host.TradeHostID) {
              const tmpMK = {}
              tmpMK.mkName = mk.market_kernel_name
              tmpMK.mkJson = JSON.stringify(res[0], null, '\t')
              host.mk.push(tmpMK)
              setMKJSON(JSON.stringify(res[0], null, "\t"))
            }
          }
          setIsModalVisibleMK(true)
        })
      }
    }
  }

  const handleOkMK = () => {
    setIsModalVisibleMK(false)

  }
  const handleCancelMK = () => {
    setIsModalVisibleMK(false)

  }
  ////////////////////////////////////////////Host//////////////////////
  const showModalHost = () => {
    setIsModalVisibleHost(true);
  };

  const handleOkHost = () => {
    const form = addHostForm.current;
    const Info = form.getFieldsValue(true);
    // console.log(form.validateFields());
    console.log(Info);
    form
      .validateFields()
      .then((res) => {
        addTradeHost(Info, (error, res) => {
          getAllHostInfo((error, res) => {
            const tmpDatas = [];
            for (let i = 0; i < res.length; i++) {
              if (res[i].HostType === "1") {
                res[i].HostType = "本地主机";
              } else {
                res[i].HostType = "交易主机";
              }
              const tmpData = {
                key: i,
                TradeHostID: res[i].TradeHostID,
                HostName: res[i].HostName,
                IPV4Addr: res[i].IPV4Addr,
                SSHPort: res[i].SSHPort,
                HostType: res[i].HostType,
                IsAvailable: res[i].IsAvailable,
              };
              tmpDatas.push(tmpData);
            }
            const result = uniqueFun(tmpDatas, "TradeHostID");
            setData(result);
          });
        });
        setIsModalVisibleHost(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCancelHost = () => {
    setIsModalVisibleHost(false);
  };
  /////////////////////////////////////////////////////TK////////////////////
  const showTk = () => {
    getTradeHostBriefInfo((error, res) => {
      console.log(res);
      const usefullInfo = [];
      for (let i = 0; i < res.length; i++) {
        if (res[i].HostType === "0") {
          usefullInfo.push(res[i]);
        }
      }
      setHostInfo(usefullInfo);
    });
    setIsModalVisibleAddTK(true);
  };
  const addTk = () => {
    const TKform = addTKForm.current;
    const TKInfo = TKform.getFieldsValue(true);
    // console.log(form.validateFields());
    TKform.validateFields()
      .then((res) => {
        for (let i = 0; i < hostInfo.length; i++) {
          if (TKInfo.tradeHostName === hostInfo[i].HostName) {
            addTradeKernel(
              hostInfo[i].TradeHostID,
              TKInfo.TKName,
              "1.0.0",
              String(TKInfo.ifOpen),
              (error, res) => {
                if (!error) {
                  configuredTKGet((error, res) => {
                    const usefulTK = [];
                    for (let i = 0; i < res.length; i++) {
                      if (res[i].IsAvailable === 1) {
                        usefulTK.push(res[i]);
                      }
                    }
                    setTkInfo(usefulTK);
                    setTkAllInfo(res);
                  });
                  message.success("增加TK成功");
                } else {
                  message.error(error);
                }
              }
            );
            setIsModalVisibleAddTK(false);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const cancelTK = () => {
    setIsModalVisibleAddTK(false);
  };
  ///////////////////////////////////SK/////////////////////////
  const showSK = () => {
    setIsModalVisibleAddSK(true);
  };
  const addSk = () => {
    const SKform = addSKForm.current;
    const SKInfo = SKform.getFieldsValue(true);
    // console.log(form.validateFields());
    SKform.validateFields()
      .then((res) => {
        for (let i = 0; i < tkInfo.length; i++) {
          if (SKInfo.inWhichTK === tkInfo[i].TradekernelName) {
            addDocker(
              tkInfo[i].TradeKernelID,
              SKInfo.SKName,
              "1.0.0",
              String(SKInfo.ifOpen),
              (error, res) => {
                if (!error) {
                  getDockerInfo((error, res) => {
                    setSkInfo(res);
                  });
                  message.success("增加SK成功");
                  setSelectFlag(Math.random())

                } else {
                  message.error(error);
                }
              }
            );
            setIsModalVisibleAddSK(false);

          }
        }
      })
      .catch((err) => console.log(err));
  };
  const cancelSK = () => {
    setIsModalVisibleAddSK(false);
  };
  /////////////////////////////////////////////////AK///////////////////
  const showAK = () => {

    setIsModalVisibleAddAK(true);
  };
  const addAk = () => {
    const AKform = addAKForm.current;
    const AKInfo = AKform.getFieldsValue(true);

    AKform.validateFields()
      .then((res) => {
        for (let i = 0; i < tkInfo.length; i++) {
          if (AKInfo.inWhichTK === tkInfo[i].TradekernelName) {
            const req = {
              Version: "1.0.0",
              TradeKernelID: tkInfo[i].TradeKernelID,
              AlgoDockerName: AKInfo.AKName,
              IsAvailable: String(AKInfo.ifOpen),
            }
            algoDockerAdd(
              req,
              (error, res) => {
                if (!error) {
                  // getDockerInfo((error, res) => {
                  //   setSkInfo(res);
                  // });
                  message.success("增加AK成功");
                  setSelectFlag(Math.random())
                } else {
                  message.error(error);
                }
              }
            );
            setIsModalVisibleAddAK(false);
          }
        }
      })
      .catch((err) => console.log(err));
    // AKform.validateFields()
    //   .then((res) => {
    //     console.log(AKInfo)
    //     setIsModalVisibleAddAK(false);
    //   })
    //   .catch((err) => console.log(err));
  };
  const cancelAK = () => {
    setIsModalVisibleAddAK(false);
  };

  ////////////////////////////////////////////////////MK///////////////////////
  const showMK = () => {
    setIsModalVisibleAddMK(true)

  }
  const addMK = () => {
    const MKform = addMKForm.current;
    const MKInfo = MKform.getFieldsValue(true);
    console.log(MKInfo)
    MKform.validateFields()
      .then((res) => {

        for (let i = 0; i < hostInfo.length; i++) {
          if (MKInfo.inWhichMK === hostInfo[i].HostName) {
            console.log(hostInfo[i].TradeHostID)
            const req = {
              TradeHostID: hostInfo[i].TradeHostID,
              Version: null,
              MarketKernelName: MKInfo.MKName,
              IsAvailable: MKInfo.ifOpen
            }
            marketKernelAdd(req, (err, res) => {
              if (!err) {
                message.success('新增MK成功')
                setIsModalVisibleAddMK(false);
              } else {
                message.warn('该主机已存在MK')
                // message.warn(err)
              }
            })
          }
        }
      })
      .catch((err) => console.log(err));
  }
  const cancelMK = () => {
    setIsModalVisibleAddMK(false)
  }

  ///////////////////////////////////////////////修改主机配置////////////////

  const showHostInfo = (record) => {
    const form = changeHostInfoForm.current;
    const Info = form.getFieldsValue(true);
    let tmpType;
    if (record.HostType === "交易主机") {
      tmpType = 0;
    } else {
      tmpType = 1;
    }
    form.setFieldsValue({
      hostName: record.HostName,
      address: record.IPV4Addr,
      port: getDecodeData(record.SSHPort),
      HostType: tmpType,
      ifOpen: record.IsAvailable,
    });

    setTradeHostID(record.TradeHostID);
    setIsModalVisibleChangeHost(true);
  };
  const changeHostInfo = () => {
    const form = changeHostInfoForm.current;
    const Info = form.getFieldsValue(true);
    Info.tradeHostID = tradeHostID;
    // console.log(form.validateFields());
    form
      .validateFields()
      .then((res) => {
        updateTradeHost(Info, (error, res) => {
          // if(error) {

          // } else {}
          getAllHostInfo((error, res) => {
            if (error) {
              console.log(error);
            } else {
              const tmpDatas = [];
              for (let i = 0; i < res.length; i++) {
                if (res[i].HostType === "1") {
                  res[i].HostType = "本地主机";
                } else {
                  res[i].HostType = "交易主机";
                }
                const tmpData = {
                  key: i,
                  TradeHostID: res[i].TradeHostID,
                  HostName: res[i].HostName,
                  IPV4Addr: res[i].IPV4Addr,
                  HostType: res[i].HostType,
                  SSHPort: res[i].SSHPort,
                  IsAvailable: res[i].IsAvailable,
                };
                tmpDatas.push(tmpData);
              }
              const result = uniqueFun(tmpDatas, "TradeHostID");
              setData(result);
            }
          });
        });
        setIsModalVisibleChangeHost(false);
      })
      .catch((err) => console.log(err));
  };
  const cancelChangeHostInfo = () => {
    setIsModalVisibleChangeHost(false);
  };
  /////////////////////////////////////////////CPU 信息////////////////////////
  const [flag, setFlag] = useState(0);
  const showCPUInfo = (record) => {
    setTradeHostID(record.TradeHostID);
    setFlag(1);
    setIsModalVisibleCPU(true);
  };
  useEffect(() => {
    if (flag !== 0) {
      tradeHostCPUCfgGet({ TradeHostID: tradeHostID }, (error, res) => {
        if (res.length !== 0) {
          const form = CPUInfo.current;
          form.setFieldsValue({
            CPUNumbers: res[0].CPUCount,
            CPUSpeed: res[0].CPUFreq,
            availableStart: JSON.parse(res[0].CPUCfgJson).reusable.start,
            availableEnd: JSON.parse(res[0].CPUCfgJson).reusable.end,
            unavailableStart: JSON.parse(res[0].CPUCfgJson).unreusable.start,
            unavailableEnd: JSON.parse(res[0].CPUCfgJson).unreusable.end,
          });
          // setCPUCount(res[0].CPUCount);
          // setCPUFreq(res[0].CPUFreq);
          // setReusableStart(JSON.parse(res[0].CPUCfgJson).reusable.start);
          // setReusableEnd(JSON.parse(res[0].CPUCfgJson).reusable.end);
          // setUnreusableStart(JSON.parse(res[0].CPUCfgJson).unreusable.start);
          // setUnreusableEnd(JSON.parse(res[0].CPUCfgJson).unreusable.end);
        } else {
          setCPUFreq("");
          setCPUCount("");
        }
      });

      // getHostCPUConfInfo({ TradeHostID: tradeHostID }, (error, res) => {
      //   if (res.length !== 0) {
      //     console.log(res[0]);
      //     setCPUCount(res[0].CPUCount);
      //     setCPUFreq(res[0].CPUFreq);
      //   } else {
      //     setCPUFreq("");
      //     setCPUCount("");
      //   }
      // });
    }
  }, [flag]);

  const handleOKCPUInfo = () => {
    const form = CPUInfo.current;
    const Info = form.getFieldsValue(true);
    const req = {
      TradeHostID: tradeHostID,
      CPUCfgJson: { reusable: {}, unreusable: {} },
    };
    if (Info.CPUNumbers !== undefined) {
      req.CPUCount = Info.CPUNumbers;
    } else {
      req.CPUCount = CPUCount;
    }
    if (Info.CPUSpeed !== undefined) {
      req.CPUFreq = Info.CPUSpeed;
    } else {
      req.CPUFreq = CPUFreq;
    }
    if (Info.availableStart !== undefined) {
      req.CPUCfgJson.reusable.start = Info.availableStart;
    } else {
      req.CPUCfgJson.reusable.start = reusableStart;
    }
    if (Info.availableEnd !== undefined) {
      req.CPUCfgJson.reusable.end = Info.availableEnd;
    } else {
      req.CPUCfgJson.reusable.end = reusableEnd;
    }
    if (Info.unavailableStart !== undefined) {
      req.CPUCfgJson.unreusable.start = Info.unavailableStart;
    } else {
      req.CPUCfgJson.unreusable.start = unreusableStart;
    }
    if (Info.unavailableEnd !== undefined) {
      req.CPUCfgJson.unreusable.end = Info.unavailableEnd;
    } else {
      req.CPUCfgJson.unreusable.end = unreusableEnd;
    }
    req.CPUCfgJson = JSON.stringify(req.CPUCfgJson);
    tradeHostCPUCfgChange(req, (error, res) => { });
    // setCPUCount(100);
    setFlag(0);
    setCpuTrack(0);
    setIsModalVisibleCPU(false);
  };
  const cancelCPUInfo = () => {
    setFlag(0);
    setCpuTrack(0);
    setIsModalVisibleCPU(false);
  };
  /////////////////////////////////自启动//////////////////////////////////////
  const [flagTwo, setFlagTwo] = useState(0);
  const showOpen = (record) => {
    const tmpMockData = [];
    qryStrategyInfo((error, res) => {
      for (let i = 0; i < res.length; i++) {
        if (
          res[i].TradeHostID === record.TradeHostID &&
          res[i].IsAvailable === 1
        ) {
          tmpMockData.push({
            key: res[i].StrategyID,
            title: `${res[i].StrategyID}@@${res[i].StrategyName}`,
            IsAvailable: res[i].IsAvailable,
            IsAutoStart: res[i].IsAutoStart,
          });
        }
      }
      setMockData(tmpMockData);
      setFlagTwo(1);
    });
    setIsModalVisibleOpen(true);
  };
  useEffect(() => {
    if (flagTwo !== 0) {
      const initialTargetKeys = mockData
        .filter((item) => item.IsAutoStart === 1)
        .map((item) => item.key);
      setTargetKeys(initialTargetKeys);
    }
  }, [flagTwo]);
  const handleOKOpen = () => {
    switchAutoStartStates(reqForSwitch, (error, res) => {
      if (!error) {
        message.success("修改成功");
      } else {
        message.error(error);
      }
    });

    setIsModalVisibleOpen(false);
    setFlagTwo(0);
  };
  const cancelOpen = () => {
    setIsModalVisibleOpen(false);
    setFlagTwo(0);
  };
  ////////////////////////////////agent/////////////////////////////////////
  const changeInfo = () => { };
  const [tmpId, setTmpId] = useState();
  const showAgent = (record) => {
    let agentVersion;
    setTmpId(record.TradeHostID);
    for (let version of useVersion) {
      if (version.TradeHostID === record.TradeHostID) {
        agentVersion = version.AgentVersion;
      }
    }
    const req = {
      AgentVersion: agentVersion,
      AppName: "cmsagent",
      ProjectName: "cmsagent",
      TradeHostID: record.TradeHostID,
      VersionNumber: agentVersion,
    };
    getAgentCfg(req, (error, res) => {
      if (res && res[0].length !== 0) {
        const newRes = {
          TradeHostID: res[0].TradeHostID,
          AgentVersion: res[0].AgentVersion,
          CMSSerIPAddr: res[0].CMSSerIPAddr,
          CMSSerIPIsAvaiable: res[0].CMSSerIPIsAvaiable,
          CPUID: res[0].CPUID,
          LogFilePath: res[0].LogFilePath,
          LogLevel: res[0].LogLevel,
          MemFileTypes: JSON.parse(res[0].MemFileTypes),
          MemoryDir: res[0].MemoryDir,
          RedMemIsAvaiable: res[0].RedMemIsAvaiable,
          RedMemType: res[0].RedMemType,
          RevCmdFromRedisCfgJson: JSON.parse(res[0].RevCmdFromRedisCfgJson),
          RevCmdFromRedisIsAvaiable: res[0].RevCmdFromRedisIsAvaiable,
          SendMemToKafkaCfgJson: JSON.parse(res[0].SendMemToKafkaCfgJson),
          SendMemToKafkaIsAvaiable: res[0].SendMemToKafkaIsAvaiable,
          SendMemToRedisCfgJson: JSON.parse(res[0].SendMemToRedisCfgJson),
          SendMemToRedisIsAvaiable: res[0].SendMemToRedisIsAvaiable,
          WriteMemAddr: res[0].WriteMemAddr,
          WriteMemIsAvaiable: res[0].WriteMemIsAvaiable,
        };
        setAgentJson(JSON.stringify(newRes, null, "\t"));
      } else {
        setAgentJson(JSON.stringify({}));

        //// here
        //         setAgentJson(`{
        // 	"TradeHostID": ${record.TradeHostID},
        // 	"AgentVersion": "${agentVersion}",
        // 	"CMSSerIPAddr": "",
        // 	"CMSSerIPIsAvaiable": 0,
        // 	"CPUID": -1,
        // 	"LogFilePath": "/home/wyngts/running/logs/cmsagent.log",
        // 	"LogLevel": "DEBUG",
        // 	"MemFileTypes": {
        // 		"skreq_": 1,
        // 		"tkrtn_": 1
        // 	},
        // 	"MemoryDir": "/home/wyngts/running/shm",
        // 	"RedMemIsAvaiable": 1,
        // 	"RedMemType": 1,
        // 	"RevCmdFromRedisCfgJson": {
        // 		"RedisSerIP": "0.0.0.0",
        // 		"RedisSerPort": 6379,
        // 		"ReqCommandKey": "REQ_COMMAND",
        // 		"RspCommandKey": "RSP_COMMAND",
        // 		"ExpireTime": "19:30",
        // 		"PipleMaxLen": 500
        // 	},
        // 	"RevCmdFromRedisIsAvaiable": 1,
        // 	"SendMemToKafkaCfgJson": {
        // 		"TopTic": "SEND_MEMORY",
        // 		"CfgParameters": {
        // 			"bootstrap.servers": "127.0.0.1:9092"
        // 		}
        // 	},
        // 	"SendMemToKafkaIsAvaiable": 1,
        // 	"SendMemToRedisCfgJson": {
        // 		"RedisSerIP": "0.0.0.0",
        // 		"RedisSerPort": 6379,
        // 		"SendMemoryKey": "SEND_MEMORY",
        // 		"ExpireTime": "19:30",
        // 		"PipleMaxLen": 5000
        // 	},
        // 	"SendMemToRedisIsAvaiable": 1,
        // 	"WriteMemAddr": "ipc:///home/wyngts/running/cmsagent/agent.ipc",
        // 	"WriteMemIsAvaiable": 1
        // }`);
      }
    });
    setIsModalVisibleAgent(true);
  };
  const handleOkAgent = () => {
    setIsModalVisibleConfirmAgent(true);
  };
  const handleCancelAgent = () => {
    setIsModalVisibleAgent(false);
  };
  const handleOkConfirmAgent = () => {
    const tmpJson = JSON.parse(agentJson);

    const updateAgentReq = {
      AgentCfg: {
        AgentVersion: tmpJson.AgentVersion,
        CMSSerIPAddr: tmpJson.CMSSerIPAddr,
        CMSSerIPIsAvaiable: tmpJson.CMSSerIPIsAvaiable,
        CPUID: tmpJson.CPUID,
        LogFilePath: tmpJson.LogFilePath,
        LogLevel: tmpJson.LogLevel,
        MemFileTypes: JSON.stringify(tmpJson.MemFileTypes),
        MemoryDir: tmpJson.MemoryDir,
        RedMemIsAvaiable: tmpJson.RedMemIsAvaiable,
        RedMemType: tmpJson.RedMemType,
        RevCmdFromRedisCfgJson: JSON.stringify(
          tmpJson.RevCmdFromRedisCfgJson,
          null,
          "\t"
        ),
        RevCmdFromRedisIsAvaiable: tmpJson.RevCmdFromRedisIsAvaiable,
        SendMemToKafkaCfgJson: JSON.stringify(
          tmpJson.SendMemToKafkaCfgJson,
          null,
          "\t"
        ),
        SendMemToKafkaIsAvaiable: tmpJson.SendMemToKafkaIsAvaiable,
        SendMemToRedisCfgJson: JSON.stringify(
          tmpJson.SendMemToRedisCfgJson,
          null,
          "\t"
        ),
        SendMemToRedisIsAvaiable: tmpJson.SendMemToRedisIsAvaiable,
        TradeHostID: tmpJson.TradeHostID,
        WriteMemAddr: tmpJson.WriteMemAddr,
        WriteMemIsAvaiable: tmpJson.WriteMemIsAvaiable,
      },
      AppName: "cmsagent",
      ProjectName: "cmsagent",
      TradeHostID: tmpId,
      VersionNumber: tmpJson.AgentVersion,
    };
    updateAgentVersion(updateAgentReq, (error, res) => {
      if (!error) {
        message.success("修改成功");
      }
    });
    setIsModalVisibleAgent(false);
    setIsModalVisibleConfirmAgent(false);
  };
  const handleCancelConfirmAgent = () => {
    setIsModalVisibleConfirmAgent(false);
  };

  ////////////////////////行情参数/////////////////////////////
  const showQuotation = (record) => {
    const req = {
      AppName: "marketkernel",
      FileName: "5.json",
      ProjectName: "marketkernel",
      TradeHostId: record.TradeHostID,
      VersionNum: "1.2.0.270",
    };
    getConfigFile_marketkernel(req, (res, error) => { });
    setIsModalVisibleQuotation(true);
  };
  const handleOkQuotation = () => {
    setIsModalVisibleQuotation(false);
  };
  const handleCancelQuotation = () => {
    setIsModalVisibleQuotation(false);
  };
  const [tracks, setTracks] = useState();
  ////////////////////////新增CPU程序调度/////////////////////////////
  const showAddCPUProgram = () => {
    setAddProInfo(true);
  };
  const handleOkAddProgram = () => {
    const form = addCPUInfoForm.current;
    const Info = form.getFieldsValue(true);
    for (let sk of skInfo) {
      if (Info.APPName === sk.DockerID) {
        const req = {
          AppID: sk.DockerID,
          AppName: sk.DockerName,
          CPUID: Info.CPUID,
          ThreadID: Info.APPID,
          TradeHostID: CPUData[0].TradeHostID,
        };
        form.validateFields().then((res) => {
          addCPUDispatch(req, (error, res) => {
            getCPUDispatch(
              { TradeHostID: CPUData[0].TradeHostID },
              (err, res) => {
                setCPUData(res);
              }
            );
            message.success("添加成功");
          });
          setAddProInfo(false);
        });
      }
    }
    setTracks(Math.random());
    // setAddProInfo(false);
  };
  const handleCancelAddProgram = () => {
    setAddProInfo(false);
  };
  ////////////////////////修改CPU程序调度/////////////////////////////
  const changeCPU = (record) => {
    getDockerInfo((error, res) => {
      setSkInfo(res);
    });
    setChangeProInfo(true);
  };
  const showCPUProgram = (record) => {
    setTracks(Math.random());
    setTradeHostID(record.TradeHostID);
    getCPUDispatch({ TradeHostID: record.TradeHostID }, (err, res) => {
      setCPUData(res);
    });
    setIfShowCPU(true);
    setClearSelect(true)
  };
  const handleOkProgram = () => {
    setTrackChange(Math.random());
    setIfShowCPU(false);
  };
  const handleCancelProgram = () => {
    setClearSelect(false)
    setIfShowCPU(false);
  };

  const handleOkCProgram = () => {
    const form = changeCPUInfoForm.current;
    const Info = form.getFieldsValue(true);
    for (let sk of skInfo) {
      if (Info.APPName === sk.DockerID) {
        const req = {
          AppID: sk.DockerID,
          AppName: sk.DockerName,
          CPUID: Info.CPUID,
          ThreadID: Info.APPID,
          TradeHostID: CPUData[0].TradeHostID,
        };
        form.validateFields().then((res) => {
          addCPUDispatch(req, (error, res) => {
            getCPUDispatch(
              { TradeHostID: CPUData[0].TradeHostID },
              (err, res) => {
                setCPUData(res);
              }
            );
            message.success("修改成功");
          });
          setAddProInfo(false);
        });
      }
    }
    setChangeProInfo(false);
  };
  const handleCancelCProgram = () => {
    setChangeProInfo(false);
  };
  /////////////////////////////主机用户配置///////////////////////
  const showUser = (record) => {
    setTradeHostID(record.TradeHostID);

    getHostUserInfo({ TradeHostID: record.TradeHostID }, (err, res) => {
      setUserData(res);
    });
    setIfShowUser(true);
  };
  const handleOkUser = () => {
    setIfShowUser(false);
  };
  const handleCancelUser = () => {
    setIfShowUser(false);
  };
  /////////////////////////////新增主机用户///////////////////////
  const addUserForm = useRef();
  const handleAddUser = () => {
    const form = addUserForm.current;
    const Info = form.getFieldsValue(true);
    const req = {
      TradeHostID: userData[0].TradeHostID,
      UserName: Info.userName,
      UserPwd: Info.password,
      UserHomeDir: Info.userHomeDir,
      IsAvailable: Info.ifOpen,
      UserType: Info.userType,
    };
    if (Info.password !== Info.confirmPassword) {
      message.error("两次输入的密码不一致");
    } else {
      form.validateFields().then((res) => {
        addHostUser(req, (error, res) => {
          if (error) {
            message.error(error);
          } else {
            getHostUserInfo(
              { TradeHostID: userData[0].TradeHostID },
              (err, res) => {
                console.log(res);
                setUserData(res);
              }
            );
            message.success("添加主机用户成功");
          }
        });
        setAddProInfo(false);
      });

      setShowAddUser(false);
    }
  };
  const handleCancelAddUser = () => {
    setShowAddUser(false);
  };

  /////////////////////////修改主机用户/////////////////
  const userChangeForm = useRef();
  const ifShowChangeUser = (record) => {
    const form = userChangeForm.current;
    const Info = form.getFieldsValue(true);
    let tmp;
    if (record.UserType[0] === "root用户") {
      tmp = 0;
    }
    if (record.UserType[0] === "ngts用户") {
      tmp = 1;
    }
    if (record.UserType[0] === "交易用户") {
      tmp = 2;
    }
    if (record.UserType[0] === "开发用户") {
      tmp = 4;
    }
    setOldName(record.UserName);
    form.setFieldsValue({
      userName: record.UserName,
      password: record.UserPwd,
      confirmPassword: record.UserPwd,
      userHomeDir: record.UserHomeDir,
      ifOpen: record.IsAvailable,
      userType: tmp,
    });
    setShowChangeUser(true);
  };
  const handleChangeUser = () => {
    const form = userChangeForm.current;
    const Info = form.getFieldsValue(true);
    let tmpOldUserName;
    if (Info.userName !== oldName) {
      tmpOldUserName = oldName;
    } else {
      tmpOldUserName = Info.userName;
    }
    const req = {
      IsAvailable: String(Info.ifOpen),
      UserName: Info.userName,
      UserType: String(Info.userType),
      UserPwd: Info.password,
      UserHomeDir: Info.userHomeDir,
      TradeHostID: tradeHostID,
      OldUserName: tmpOldUserName,
    };

    modifyHostUser(req, (error, res) => {
      if (!error) {
        getHostUserInfo({ TradeHostID: tradeHostID }, (err, res) => {
          console.log(res);
          setUserData(res);
          message.success("修改成功");
        });
      } else {
        message.error(error);
      }
    });
    setShowChangeUser(false);
  };
  const handleCancelChangeUser = () => {
    setShowChangeUser(false);
  };

  function uniqueFun(arr, type) {
    const res = new Map();
    return arr.filter((a) => !res.has(a[type]) && res.set(a[type], 1));
  }
  /////////////////////////
  useEffect(() => {
    getAllHostInfo((error, res) => {
      // getTradeHostBriefInfo((error, res) => {
      const tmpDatas = [];
      for (let i = 0; i < res.length; i++) {
        if (res[i].HostType === "1") {
          res[i].HostType = "本地主机";
        } else {
          res[i].HostType = "交易主机";
        }
        const tmpData = {
          key: i,
          TradeHostID: res[i].TradeHostID,
          HostName: res[i].HostName,
          IPV4Addr: res[i].IPV4Addr,
          HostType: res[i].HostType,
          IsAvailable: res[i].IsAvailable,
          SSHPort: res[i].SSHPort,
        };
        tmpDatas.push(tmpData);
      }
      const result = uniqueFun(tmpDatas, "TradeHostID");
      setData(result);
      setInitData(result);
    });
    getTradeHostBriefInfo((error, res) => {
      const usefullInfo = [];
      for (let i = 0; i < res.length; i++) {
        if (res[i].HostType === "0") {
          usefullInfo.push(res[i]);
        }
      }
      setHostInfo(usefullInfo);
    });
    configuredTKGet((error, res) => {
      const usefulTK = [];
      for (let i = 0; i < res.length; i++) {
        if (res[i].IsAvailable === 1) {
          usefulTK.push(res[i]);
        }
      }
      setTkInfo(usefulTK);
      setTkAllInfo(res);
    });
    getDockerInfo((error, res) => {
      setSkInfo(res);
    });
    allHostAppVersionGet((error, res) => {
      setUseVersion(res);
    });
    getAlgoJson((err, res) => {
      setAkArg(res)
    })

    configuredTKGet((err, res) => {
      console.log(res)
    })
  }, []);
  const changeTK = (e, TradekernelName) => {
    for (let tk of tkAllInfo) {
      if (TradekernelName === tk.TradekernelName) {
        tk.flag = true;
      }
    }
    jsonValueTK = e;
    // setTKS([...TKS]);
    // setTmpTK(e);
  };
  const changeSK = (e) => {
    jsonValueSK = e;
  };
  // 筛选查看的配置项
  const [akFlag, setAkFlag] = useState(true)
  const [skFlag, setSkFlag] = useState(false)
  const [mkFlag, setMkFlag] = useState(false)
  const [tkFlag, setTkFlag] = useState(false)
  // 设置对应主机名称的主机id
  const [visibleHostID, setVisibleHostID] = useState()
  const [ifVisibleHostId, setIfVisibleHostID] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <div>
          <Button type="primary" onClick={showModalHost}>
            新增主机
          </Button>
          <Input
            placeholder="输入查找内容..."
            onChange={inputSearch}
            style={{ width: 250, marginLeft: 30 }}
          />
        </div>
        <div>
          <Button type="primary" onClick={showTk}>
            新增TK
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={showSK}>
            新增SK
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={showAK}>
            新增AK
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={showMK}>
            新增MK
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={showModalTK} disabled={ifSelect}>
            批量查看TK配置
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={showModalSK}
            disabled={ifSelect}
          >
            批量查看SK配置
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={showModalAK}
            disabled={ifSelect}
          >
            批量查看AK配置
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={showModalMK}
            disabled={ifSelect}
          >
            批量查看MK配置
          </Button>

        </div>
        {/* <div>
          <Button type="primary" onClick={showModalTK}>
            批量关闭SK
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={showModalSK}
          >
            批量关闭TK
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }}>
            批量关闭AK
          </Button>
        </div> */}
      </div>
      <Table
        bordered={true}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      // pagination={false}
      />
      {/* --------------------------------------agent参数 modal----------------------------------------- */}
      <Modal
        title="agent参数"
        visible={isModalVisibleAgent}
        onOk={handleOkAgent}
        onCancel={handleCancelAgent}
        width={30000}
        style={{
          top: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        footer={[
          <Button onClick={handleCancelAgent}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkAgent}>
            确定
          </Button>,
        ]}
      >

        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* <Button type="primary">关闭</Button> */}
              </div>
              <MonacoEditor
                width="667"
                height="700"
                language="json"
                theme="vs-light"
                value={agentJson}
                onChange={(e) => {
                  setAgentJson(e);
                }}
                style={{ marginBottom: 50 }}
                options={option}
              />
              {/* <Editor
                height="75vh"
                width="700px"
                defaultLanguage="json"
                onChange={(e) => {
                  setAgentJson(e);
                }}
                value={agentJson}
                // defaultValue={agentJson}
              /> */}
            </div>
          </div>
        </Card>
      </Modal>

      {/* --------------------------------------agent修改确认 modal----------------------------------------- */}
      <Modal
        title="提示"
        visible={isModalVisibleConfirmAgent}
        onOk={handleOkConfirmAgent}
        onCancel={handleCancelConfirmAgent}
        width={600}
        style={{
          top: 300,
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "center",
          // // alignItems: "center",
        }}
        footer={[
          <Button onClick={handleCancelConfirmAgent}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkConfirmAgent}>
            确定
          </Button>,
        ]}
      >
        <Alert
          message="此操作将配置cmsagent参数, 是否继续?"
          type="warning"
          showIcon
        />
      </Modal>
      {/* --------------------------------------行情参数 modal----------------------------------------- */}
      <Modal
        title="TK配置"
        visible={isModalVisibleQuotation}
        onOk={handleOkQuotation}
        onCancel={handleCancelQuotation}
        width={30000}
        style={{
          top: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        footer={[
          <Button onClick={handleOkQuotation}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleCancelQuotation}>
            确定
          </Button>,
        ]}
      >
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 300,
                }}
              >
                <h3 style={{ background: "#6495ed" }}>TKID:101 TK名称：adsa</h3>
                {/* <Button type="primary">关闭</Button> */}
              </div>
              <MonacoEditor
                width="500"
                height="500"
                language="json"
                theme="vs-light"
                value={json}
                onChange={(e) => {
                  console.log(e);
                }}
                style={{ marginBottom: 50 }}
                options={option}
              />
            </div>
          </div>
        </Card>
      </Modal>
      {/* --------------------------------------自启动 modal----------------------------------------- */}
      <Modal
        title="设置自启动"
        visible={isModalVisibleOpen}
        onOk={handleOKOpen}
        onCancel={cancelOpen}
        width={630}
        footer={[
          <Button onClick={cancelOpen}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOKOpen}>
            确定
          </Button>,
        ]}
      >
        <Transfer
          showSearch
          operations={["添加", "删除"]}
          dataSource={mockData}
          titles={["备选项", "自启动"]}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          pagination
          render={(item) => item.title}
        />
      </Modal>
      {/* --------------------------------------CPU配置 modal----------------------------------------- */}
      <Modal
        title="CPU配置"
        visible={isModalVisibleCPU}
        onOk={handleOKCPUInfo}
        onCancel={cancelCPUInfo}
        forceRender={true}
        footer={[
          <Button onClick={cancelCPUInfo}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOKCPUInfo}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={CPUInfo}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          onChange={changeCPUInfo}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item colon={false} label="主机核心数量" name="CPUNumbers">
            <Input
              id="myInput"
              style={{ width: 217 }}
            // defaultValue={CPUCount}
            // key={CPUCount}
            // value={CPUCount}
            />
          </Form.Item>

          <Form.Item
            colon={false}
            label="主机核心频率"
            name="CPUSpeed"
            defaultValue={CPUFreq}
          >
            <Input
              id="myInput"
              style={{ width: 217 }}
            // defaultValue={CPUFreq}
            // key={CPUFreq}
            // value={CPUFreq}
            />
          </Form.Item>
          <Form.Item
            colon={false}
            label="可复用CPU核数范围"
            // name="CPUAvailable"
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name="availableStart"
              style={{ display: "inline-block" }}
            >
              <Input
                id="myInput"
                style={{ width: "100px" }}
              // defaultValue={reusableStart}
              // key={reusableStart}
              // value={reusableStart}
              />
            </Form.Item>
            <Form.Item
              name="availableEnd"
              style={{ width: "100px", display: "inline-block" }}
            >
              <Input
                id="myInput"
              // defaultValue={reusableEnd}
              // value={reusableEnd}
              // key={reusableEnd}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            colon={false}
            label="不可复用CPU核数范围"
          // name="CPUUnavailable"
          >
            <Form.Item
              name="unavailableStart"
              style={{ display: "inline-block" }}
            >
              <Input
                id="myInput"
                style={{ width: "100px" }}
              // defaultValue={unreusableStart}
              // value={unreusableStart}
              // key={unreusableStart}
              />
            </Form.Item>
            <Form.Item
              name="unavailableEnd"
              style={{ display: "inline-block" }}
            >
              <Input
                id="myInput"
                style={{ width: "100px" }}
              // defaultValue={unreusableEnd}
              // value={unreusableEnd}
              // key={unreusableEnd}
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------修改主机配置 modal----------------------------------------- */}
      <Modal
        title="修改主机配置"
        visible={isModalVisibleChangeHost}
        onOk={cancelChangeHostInfo}
        onCancel={cancelChangeHostInfo}
        forceRender={true}
        footer={[
          <Button onClick={cancelChangeHostInfo}>取消</Button>,
          <Button key="submit" type="primary" onClick={changeHostInfo}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={changeHostInfoForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="主机名称"
            name="hostName"
            rules={[
              {
                required: true,
                message: "请输入主机名称",
              },
            ]}
          >
            <Input placeholder="请输入主机名称" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="IPV4地址"
            name="address"
            rules={[
              {
                required: true,
                message: "请输入IPV4地址",
              },
            ]}
          >
            <Input placeholder="请输入IPV4地址" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="ssh端口"
            name="port"
            rules={[
              {
                required: true,
                message: "请输入ssh端口",
              },
            ]}
          >
            <Input placeholder="请输入ssh端口" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="主机类型"
            name="HostType"
            // valuePropName="checked"
            initialValue={0}
          >
            <Radio.Group defaultValue={0} style={{ display: "flex" }}>
              <Radio value={0}>交易主机</Radio>
              <Radio value={1}>本地主机</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            colon={false}
            label="是否启用"
            name="ifOpen"
            initialValue={1}
          >
            <Radio.Group defaultValue={1} style={{ display: "flex" }}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      {/* --------------------------------------新增MK modal----------------------------------------- */}
      <Modal
        title="新增MK配置"
        visible={isModalVisibleAddMK}
        onOk={addMK}
        onCancel={cancelMK}
        forceRender={true}
        footer={[
          <Button onClick={cancelMK}>取消</Button>,
          <Button key="submit" type="primary" onClick={addMK}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={addMKForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="交易主机名称"
            name="inWhichMK"
            rules={[
              {
                required: true,
                message: "请选择交易主机名称",
              },
            ]}
          >
            <Select
              showSearch={true}
              placeholder="请选择"
              onChange={(e) => {
                console.log(hostInfo)
                for (let host of hostInfo) {
                  if (host.HostName === e) {
                    setVisibleHostID(host.TradeHostID)
                    setIfVisibleHostID(true)
                  }
                }
              }}
            // onDropdownVisibleChange={() => { console.log('objec----t') }}
            >
              {hostInfo.map(({ HostName }, index) =>
                Children.toArray(
                  <Select.Option value={HostName} key={index}>
                    {HostName}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item
            colon={false}
            label="主机ID"
            name="hostID"
            style={{ marginTop: -20 }}
          >
            {ifVisibleHostId ? `${visibleHostID}` : "---"}
          </Form.Item>
          <Form.Item
            colon={false}
            label="MK名称"
            name="MKName"
            rules={[
              {
                required: true,
                message: "请输入MK名称",
              },
            ]}
          >
            <Input placeholder="请输入MK名称" />
          </Form.Item>

          {/* <Form.Item
            colon={false}
            label="MK版本"
            name="MKVersion"
            rules={[
              {
                required: true,
                message: "请输入MK版本",
              },
            ]}
          >
            <Input placeholder="请输入MK版本" />
          </Form.Item> */}
          <Form.Item
            colon={false}
            label="是否启用"
            name="ifOpen"
            initialValue={1}
          >
            <Radio.Group defaultValue={1} style={{ display: "flex" }}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------新增AK modal----------------------------------------- */}
      <Modal
        title="新增AK配置"
        visible={isModalVisibleAddAK}
        onOk={addAk}
        onCancel={cancelAK}
        forceRender={true}
        footer={[
          <Button onClick={cancelAK}>取消</Button>,
          <Button key="submit" type="primary" onClick={addAk}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={addAKForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="所属的TK名称"
            name="inWhichTK"
            rules={[
              {
                required: true,
                message: "请选择所属的TK名称",
              },
            ]}
          >
            <Select
              showSearch={true}
              placeholder="请选择"
            // onChange={getInstrumentName}
            // onDropdownVisibleChange={getInstrumentNameReal}
            >
              {tkInfo.map(({ TradekernelName }, index) =>
                Children.toArray(
                  <Select.Option value={TradekernelName} key={index}>
                    {TradekernelName}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item
            colon={false}
            label="AK名称"
            name="AKName"
            rules={[
              {
                required: true,
                message: "请输入AK名称",
              },
            ]}
          >
            <Input placeholder="请输入SK名称" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="是否启用"
            name="ifOpen"
            initialValue={1}
          >
            <Radio.Group defaultValue={1} style={{ display: "flex" }}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------新增SK modal----------------------------------------- */}
      <Modal
        title="新增SK配置"
        visible={isModalVisibleAddSK}
        onOk={addSk}
        onCancel={cancelSK}
        forceRender={true}
        footer={[
          <Button onClick={cancelSK}>取消</Button>,
          <Button key="submit" type="primary" onClick={addSk}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={addSKForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="所属的TK名称"
            name="inWhichTK"
            rules={[
              {
                required: true,
                message: "请选择所属的TK名称",
              },
            ]}
          >
            <Select
              showSearch={true}
              placeholder="请选择"
            // onChange={getInstrumentName}
            // onDropdownVisibleChange={getInstrumentNameReal}
            >
              {tkInfo.map(({ TradekernelName }, index) =>
                Children.toArray(
                  <Select.Option value={TradekernelName} key={index}>
                    {TradekernelName}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item
            colon={false}
            label="SK名称"
            name="SKName"
            rules={[
              {
                required: true,
                message: "请输入SK名称",
              },
            ]}
          >
            <Input placeholder="请输入SK名称" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="是否启用"
            name="ifOpen"
            initialValue={1}
          >
            <Radio.Group defaultValue={1} style={{ display: "flex" }}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------新增TK modal----------------------------------------- */}
      <Modal
        title="新增TK配置"
        visible={isModalVisibleAddTK}
        onOk={addTk}
        onCancel={cancelTK}
        forceRender={true}
        footer={[
          <Button onClick={cancelTK}>取消</Button>,
          <Button key="submit" type="primary" onClick={addTk}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={addTKForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="交易主机名称"
            name="tradeHostName"
            rules={[
              {
                required: true,
                message: "请选择交易主机名称",
              },
            ]}
          >
            <Select
              showSearch={true}
              placeholder="请选择"
            // onChange={getInstrumentName}
            // onDropdownVisibleChange={getInstrumentNameReal}
            >
              {hostInfo.map(({ HostName }, index) =>
                Children.toArray(
                  <Select.Option value={HostName} key={index}>
                    {HostName}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item
            colon={false}
            label="TK名称"
            name="TKName"
            rules={[
              {
                required: true,
                message: "请输入TK名称",
              },
            ]}
          >
            <Input placeholder="请输入TK名称" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="是否启用"
            name="ifOpen"
            initialValue={1}
          >
            <Radio.Group defaultValue={1} style={{ display: "flex" }}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------新增主机modal----------------------------------------- */}
      <Modal
        title="新增主机配置"
        visible={isModalVisibleHost}
        onOk={handleOkHost}
        onCancel={handleCancelHost}
        forceRender={true}
        footer={[
          <Button onClick={handleCancelHost}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkHost}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={addHostForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="主机名称"
            name="hostName"
            rules={[
              {
                required: true,
                message: "请输入主机名称",
              },
            ]}
          >
            <Input placeholder="请输入主机名称" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="IPV4地址"
            name="address"
            rules={[
              {
                required: true,
                message: "请输入IPV4地址",
              },
            ]}
          >
            <Input placeholder="请输入IPV4地址" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="ssh端口"
            name="port"
            rules={[
              {
                required: true,
                message: "请输入ssh端口",
              },
            ]}
          >
            <Input placeholder="请输入ssh端口" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="主机类型"
            name="HostType"
            initialValue={0}
          // valuePropName="checked"
          >
            <Radio.Group defaultValue={0} style={{ display: "flex" }}>
              <Radio value={0}>交易主机</Radio>
              <Radio value={1}>本地主机</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            colon={false}
            label="是否启用"
            name="ifOpen"
            initialValue={1}
          >
            <Radio.Group defaultValue={1} style={{ display: "flex" }}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------批量查看SK配置modal----------------------------------------- */}
      <Modal
        title="SK配置"
        visible={isModalVisibleSK}
        onOk={handleOkSK}
        onCancel={handleCancelSK}
        width={30000}
        style={{
          top: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        footer={[
          <Button onClick={handleCancelSK}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkSK}>
            确定
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {selectHost.map(({ TradeHostID, HostName, sk }) => {
            return (
              <Card>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h2>主机ID: {TradeHostID}</h2>
                  <h2 style={{ marginLeft: 20 }}>主机名称: {HostName}</h2>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {sk &&
                    sk.map(({ skID, skName, skJson }) =>
                      Children.toArray(
                        <Card>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <h3 style={{ background: "orange" }}>
                              id: {skID} 名称：{skName}
                            </h3>
                            <MonacoEditor
                              width="500"
                              height="500"
                              language="json"
                              theme="vs-light"
                              value={skJson}
                              onChange={(e) => {
                                console.log(e);
                              }}
                              style={{ marginBottom: 50 }}
                              options={option}
                            />
                          </div>
                        </Card>
                      )
                    )}
                </div>
              </Card>
            );
          })}
        </div>
      </Modal>
      {/* --------------------------------------批量查看TK配置modal----------------------------------------- */}
      <Modal
        title="TK配置"
        visible={isModalVisibleTK}
        onOk={handleOkTK}
        onCancel={handleCancelTK}
        width={window.innerWidth}
        style={{
          top: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: 'wrap'
        }}
        footer={[
          <Button onClick={handleCancelTK}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkTK}>
            确定
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 10,
          }}
        >
          {selectHost.map(({ HostName, TradeHostID, tk }) => {
            return (
              <Card>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {tk &&
                      tk.map(({ tkID, tkName, tkJson }) =>
                        Children.toArray(
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 300,
                              }}
                            >
                              <h3 style={{ background: "tomato" }}>
                                主机ID:{TradeHostID} , 主机名称: {HostName}
                                <br />
                                TKID:{tkID} , TK名称：{tkName}
                              </h3>
                            </div>
                            <MonacoEditor
                              width="500"
                              height="500"
                              language="json"
                              theme="vs-light"
                              value={tkJson}
                              onChange={(e) => {
                                console.log(e);
                              }}
                              style={{ marginBottom: 50 }}
                              options={option}
                            />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Modal>
      {/* --------------------------------------批量查看AK配置modal----------------------------------------- */}
      <Modal
        title="AK配置"
        visible={isModalVisibleAK}
        onOk={handleOkAK}
        onCancel={handleCancelAK}
        width={30000}
        style={{
          top: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        footer={[
          <Button onClick={handleCancelAK}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkAK}>
            确定
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {selectHost.map(({ TradeHostID, HostName, ak }) => {
            return (
              <Card>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h2>主机ID: {TradeHostID} </h2>
                  <h2 style={{ marginLeft: 20 }}>主机名称: {HostName}</h2>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {ak &&
                    ak.map(({ akID, akName, akJson }) =>
                      Children.toArray(
                        <Card>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <h3 style={{ background: "#6495ed" }}>
                              id: {akID} 名称：{akName}
                            </h3>
                            <MonacoEditor
                              width="500"
                              height="500"
                              language="json"
                              theme="vs-light"
                              value={akJson}
                              onChange={(e) => {
                                console.log(e);
                              }}
                              style={{ marginBottom: 50 }}
                              options={option}
                            />
                          </div>
                        </Card>
                      )
                    )}
                </div>
              </Card>
            );
          })}
        </div>

      </Modal>
      {/* --------------------------------------批量查看MK配置modal----------------------------------------- */}
      <Modal
        title="MK配置"
        visible={isModalVisibleMK}
        onOk={handleOkMK}
        onCancel={handleCancelMK}
        width={30000}
        style={{
          top: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        footer={[
          <Button onClick={handleCancelMK}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkMK}>
            确定
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {selectHost.map(({ HostName, TradeHostID, mk }) => {

            return (
              <Card>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {mk &&
                      mk.map(({ mkName, mkJson }) =>
                        Children.toArray(
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 300,
                              }}
                            >
                              <h3 style={{ background: "#FF69B4" }}>
                                主机ID:{TradeHostID} , 主机名称: {HostName} MK名称：{mkName}
                              </h3>
                            </div>
                            <MonacoEditor
                              width="500"
                              height="500"
                              language="json"
                              theme="vs-light"
                              value={mkJson}
                              onChange={(e) => {
                                console.log(e);
                              }}
                              style={{ marginBottom: 50 }}
                              options={option}
                            />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </Modal>
      {/* --------------------------------------CPU程序调度配置modal----------------------------------------- */}
      <Modal
        title="CPU程序调度配置"
        visible={ifShowCPU}
        onOk={handleOkProgram}
        onCancel={handleCancelProgram}
        width={1200}
        zIndex={999}
        forceRender={true}
        style={{
          top: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        footer={
          null
          //   [
          //   <Button onClick={handleCancelProgram}>取消</Button>,
          //   <Button key="submit" type="primary" onClick={handleOkProgram}>
          //     确定
          //   </Button>,
          // ]
        }
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* <Button
            type="primary"
            style={{ width: 180, marginBottom: 10 }}
            onClick={showAddCPUProgram}
          >
            新增CPUDispatch
          </Button> */}
          {/* <Table dataSource={CPUData} columns={CPUcolumns} /> */}
          {
            clearSelect &&
            <TransferCpu
              tradeHostID={tradeHostID}
              track={tracks}
              trackChange={trackChange}
            />
          }
        </div>
      </Modal>
      {/* --------------------------------------新增CPU程序调度modal----------------------------------------- */}
      <Modal
        title="新增CPU程序调度项"
        visible={addProInfo}
        onOk={handleOkAddProgram}
        onCancel={handleCancelAddProgram}
        zIndex={1000}
        forceRender={true}
        // style={{ borderRadius: 50 }}
        footer={[
          <Button onClick={handleCancelAddProgram}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkAddProgram}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={addCPUInfoForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="程序名称"
            name="APPName"
            rules={[
              {
                required: true,
                message: "请选择一个程序",
              },
            ]}
          >
            <Select
              showSearch={true}
              placeholder="请选择"
            // onChange={getInstrumentName}
            // onDropdownVisibleChange={getInstrumentNameReal}
            >
              {skInfo.map(({ DockerID, DockerName }, index) =>
                Children.toArray(
                  <Select.Option value={DockerID} key={index}>
                    {DockerID}@{DockerName}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item
            colon={false}
            label="线程任务ID"
            name="APPID"
            rules={[
              {
                required: true,
                message: "请输入线程任务ID",
              },
            ]}
          >
            <Input placeholder="请输入线程任务名称" />
          </Form.Item>
          <Form.Item
            colon={false}
            label="CPUID"
            name="CPUID"
            rules={[
              {
                required: true,
                message: "请输入CPUID",
              },
            ]}
          >
            <Input placeholder="请输入CPUID" />
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------修改CPU程序调度modal----------------------------------------- */}
      <Modal
        title="修改CPU程序调度项"
        visible={changeProInfo}
        onOk={handleOkCProgram}
        onCancel={handleCancelCProgram}
        zIndex={1000}
        forceRender={true}
        // style={{ borderRadius: 50 }}
        footer={[
          <Button onClick={handleCancelCProgram}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkCProgram}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={changeCPUInfoForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="程序名称"
            name="APPName"
            rules={[
              {
                required: true,
                message: "请选择一个程序",
              },
            ]}
          >
            <Select
              showSearch={true}
              placeholder="请选择"
            // onChange={getInstrumentName}
            // onDropdownVisibleChange={getInstrumentNameReal}
            >
              {skInfo.map(({ DockerID, DockerName }, index) =>
                Children.toArray(
                  <Select.Option value={DockerID} key={index}>
                    {DockerID}@{DockerName}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item
            colon={false}
            label="线程任务ID"
            name="APPID"
            rules={[
              {
                required: true,
                message: "请输入线程任务ID",
              },
            ]}
          >
            <Input placeholder="请输入线程任务名称" />
          </Form.Item>
          <Form.Item
            colon={false}
            label="CPUID"
            name="CPUID"
            rules={[
              {
                required: true,
                message: "请输入CPUID",
              },
            ]}
          >
            <Input placeholder="请输入CPUID" />
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------主机用户modal----------------------------------------- */}
      <Modal
        title="主机用户配置"
        visible={ifShowUser}
        onOk={handleOkUser}
        onCancel={handleCancelUser}
        width={30000}
        zIndex={999}
        style={{
          top: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        footer={[
          <Button onClick={handleCancelUser}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOkUser}>
            确定
          </Button>,
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            type="primary"
            style={{ width: 120, marginBottom: 10 }}
            onClick={() => {
              setShowAddUser(true);
            }}
          >
            新增主机用户
          </Button>
          <Table dataSource={userData} columns={userColumns} />
        </div>
      </Modal>
      {/* --------------------------------------新增主机用户modal----------------------------------------- */}
      <Modal
        title="新增主机用户"
        visible={showAddUser}
        onOk={handleAddUser}
        onCancel={handleCancelAddUser}
        forceRender={true}
        footer={[
          <Button onClick={handleCancelAddUser}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleAddUser}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={addUserForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="用户名"
            name="userName"
            rules={[
              {
                required: true,
                message: "请输入用户名称",
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input placeholder="请输入密码" type="password" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="确认密码"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "请再次确认密码",
              },
            ]}
          >
            <Input placeholder="请再次确认密码" type="password" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="用户主目录"
            name="userHomeDir"
            rules={[
              {
                required: true,
                message: "请输入用户主目录",
              },
            ]}
          >
            <Input placeholder="请输入用户主目录" />
          </Form.Item>
          <Form.Item
            colon={false}
            label="用户类型"
            name="userType"
            initialValue={1}
          >
            <Radio.Group
              defaultValue={1}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Radio value={0}>root</Radio>
              <Radio value={1}>ngts</Radio>
              <Radio value={2}>交易</Radio>
              <Radio value={4}>开发</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            colon={false}
            label="是否启用"
            name="ifOpen"
            initialValue={1}
          >
            <Radio.Group defaultValue={1} style={{ display: "flex" }}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      {/* --------------------------------------修改主机用户modal----------------------------------------- */}
      <Modal
        title="修改主机用户"
        visible={showChangeUser}
        onOk={handleChangeUser}
        onCancel={handleCancelChangeUser}
        forceRender={true}
        footer={[
          <Button onClick={handleCancelChangeUser}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleChangeUser}>
            确定
          </Button>,
        ]}
      >
        <Form
          ref={userChangeForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          // onFinish={handleOkHost}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            colon={false}
            label="用户名"
            name="userName"
            rules={[
              {
                required: true,
                message: "请输入用户名称",
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input placeholder="请输入密码" type="password" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="确认密码"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "请再次确认密码",
              },
            ]}
          >
            <Input placeholder="请再次确认密码" type="password" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="用户主目录"
            name="userHomeDir"
            rules={[
              {
                required: true,
                message: "请输入用户主目录",
              },
            ]}
          >
            <Input placeholder="请输入用户主目录" />
          </Form.Item>
          <Form.Item colon={false} label="用户类型" name="userType">
            <Radio.Group style={{ display: "flex", flexDirection: "row" }}>
              <Radio value={0}>root</Radio>
              <Radio value={1}>ngts</Radio>
              <Radio value={2}>交易</Radio>
              <Radio value={4}>开发</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item colon={false} label="是否启用" name="ifOpen">
            <Radio.Group defaultValue={1} style={{ display: "flex" }}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* --------------------------------------配置详情modal----------------------------------------- */}
      <Modal
        title="配置详情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1800}
        style={{
          top: 20,
          height: 300
          // width: 1800,
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "space-around",
        }}
        footer={[

          <Button key="submit" type="primary" onClick={handleOk}>
            关闭
          </Button>,
        ]}
      >

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <h3 style={{ fontWeight: 'bold' }}>主机信息</h3>
          <Table
            bordered={true}
            columns={configColumns}
            dataSource={data}
            pagination={false}

          />
          <div style={{ display: 'flex', marginTop: 20, }}>
            <Button onClick={() => {
              setAkFlag(true)
              setSkFlag(false)
              setMkFlag(false)
              setTkFlag(false)
            }}>AK配置</Button>
            <Button onClick={() => {
              setSkFlag(true)
              setAkFlag(false)
              setMkFlag(false)
              setTkFlag(false)
            }}>SK配置</Button>
            <Button onClick={() => {
              setMkFlag(true)
              setSkFlag(false)
              setAkFlag(false)
              setTkFlag(false)
            }}>MK配置</Button>
            <Button onClick={() => {
              setTkFlag(true)
              setSkFlag(false)
              setMkFlag(false)
              setAkFlag(false)
            }}>TK配置</Button>
          </div>
          {skFlag && <Card>
            <h2>SK</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {SKS &&
                SKS.map(({ DockerID, DockerName, skJson, flag, Version }) =>
                  Children.toArray(
                    <Card>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3 style={{ background: "orange" }}>
                          id: {DockerID} 名称：{DockerName}
                        </h3>
                        {!flag && (
                          <div>
                            <Button
                              type="primary"
                              onClick={() => {
                                console.log(tmpSK);
                                let reqObjTmp;
                                if (jsonValueSK === undefined) {
                                  message.warn('未进行任何修改')
                                } else {
                                  try {
                                    console.log(jsonValueSK);
                                    // reqObjTmp = JSON.parse(tmpSK);
                                    reqObjTmp = JSON.parse(jsonValueSK);
                                  } catch {
                                    message.error("JSON 格式出错，请检查");
                                  }
                                  console.log(reqObjTmp);
                                  if (reqObjTmp.version !== Version) {
                                    message.error(
                                      "当前Version信息无法修改，请重新修改信息"
                                    );
                                  } else if (DockerID !== reqObjTmp.dockerID) {
                                    message.error(
                                      "当前DokcerID信息无法修改，请重新修改信息"
                                    );
                                  } else if (reqObjTmp.log_level === "null") {
                                    message.error("log_level不能为空");
                                  } else if (reqObjTmp.log_file_path === "null") {
                                    message.error("log_file_path不能为空");
                                  } else if (
                                    reqObjTmp.strategy_lib_path === "null"
                                  ) {
                                    message.error("strategy_lib_path不能为空");
                                  } else if (
                                    reqObjTmp.archive_dir_path === "null"
                                  ) {
                                    message.error("archive_dir_path不能为空");
                                  } else {
                                    let reqObj = {
                                      AppName: "strategykernel",
                                      ProjectName: "strategykernel",
                                      ArchiveDirPath: reqObjTmp.archive_dir_path,
                                      DockerID: reqObjTmp.dockerID,
                                      cfgJson: JSON.stringify(
                                        reqObjTmp.exCfgJson
                                      ),
                                      LogFilePath: reqObjTmp.log_file_path,
                                      LogLevel: reqObjTmp.log_level,
                                      StrategyLibDirPath:
                                        reqObjTmp.strategy_lib_path,
                                      Version: reqObjTmp.version,
                                    };
                                    let reqArgs = {
                                      DockerCfg: {},
                                    };
                                    reqArgs.DockerCfg = Object.assign(
                                      reqArgs.DockerCfg,
                                      reqObj
                                    );
                                    for (let sk of skInfo) {
                                      if (sk.DockerID === reqObj.DockerID) {
                                        reqArgs.TradeHostID = sk.TradeHostID;
                                      }
                                    }
                                    reqArgs.DockerArr = [reqObj.DockerID];
                                    reqArgs.VersionNumber = reqObj.Version;
                                    reqArgs.ProjectName = "strategykernel";
                                    reqArgs.AppName = "strategykernel";
                                    modifySKCfgByModel(reqArgs, (error, res) => {
                                      if (error) {
                                        message.error("修改出错");
                                      } else {
                                        message.success("修改成功");
                                      }
                                    });
                                  }
                                }
                                jsonValueSK = undefined
                              }}
                            >
                              保存
                            </Button>{" "}
                            <Button
                              onClick={() => {

                                setSKS([...SKS]);
                              }}
                            >
                              {" "}
                              撤回
                            </Button>
                          </div>
                        )}
                        <MonacoEditor
                          width="500"
                          height="500"
                          language="json"
                          theme="vs-light"
                          value={skJson}
                          onChange={(e) => {
                            changeSK(e);
                          }}
                          style={{ marginBottom: 50 }}
                        />
                      </div>
                    </Card>
                  )
                )}
            </div>
          </Card>}
          {tkFlag && <Card
            style={{
              // height: 600,
              display: "flex",
              justifyContent: "flex-start",
              // alignItems: "center",
              // background: "#6495ED",
            }}
          >
            <h2>TK</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {TKS &&
                TKS.map(
                  ({
                    TradeKernelID,
                    TradekernelName,
                    tkJson,
                    Version,
                    flag,
                  }) => {
                    return (
                      <Card>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {" "}
                            <h3 style={{ background: "tomato" }}>
                              id: {TradeKernelID} 名称：{TradekernelName}
                            </h3>
                          </div>

                          {!flag && (
                            <div>
                              <Button
                                type="primary"
                                onClick={() => {
                                  console.log(tmpTK);
                                  let reqObjTmp;
                                  if (jsonValueTK === undefined) {
                                    message.warn('未进行任何修改')
                                  } else {
                                    try {
                                      // reqObjTmp = JSON.parse(tmpTK);
                                      reqObjTmp = JSON.parse(jsonValueTK);
                                    } catch {
                                      message.error("JSON 格式出错，请检查");
                                    }
                                    console.log(reqObjTmp);
                                    if (reqObjTmp.version !== Version) {
                                      message.error(
                                        "当前Version信息无法修改，请重新修改信息"
                                      );
                                      // } else if (
                                      //   TradeKernelID !== reqObjTmp.tradekernelID
                                      // ) {
                                      //   message.error(
                                      //     "当前tradekernelID信息无法修改，请重新修改信息"
                                      //   );
                                      // } else if (reqObjTmp.log_level === "null") {
                                      //   message.error("log_level不能为空");
                                      // } else if (
                                      //   reqObjTmp.log_file_path === "null"
                                      // ) {
                                      //   message.error("log_file_path不能为空");
                                    } else {
                                      let reqObj = {
                                        AppName: "tradekernel",
                                        ProjectName: "tradekernel",
                                        TradeKernelID: reqObjTmp.tradekernelID,
                                        MemoryDirPath: reqObjTmp.memory_dir_path,
                                        ExCfgJson: JSON.stringify(
                                          reqObjTmp.exCfgJson
                                        ),
                                        TradeApiDirPath:
                                          reqObjTmp.trade_api_dir_path,
                                        LogLevel: reqObjTmp.log_level,
                                        LogFilePath: reqObjTmp.log_file_path,
                                        Version: reqObjTmp.version,
                                        SelfTrade: reqObjTmp.self_trade,
                                        CancelTimes: reqObjTmp.cancel_times,
                                        BigCancelTimes:
                                          reqObjTmp.big_cancel_times,
                                        CFFEXCancel: reqObjTmp.CFFEX_cancel,
                                      };
                                      let reqArgs = {
                                        TradeKernelCfg: {},
                                      };
                                      reqArgs.TradeKernelCfg = Object.assign(
                                        reqArgs.TradeKernelCfg,
                                        reqObj
                                      );
                                      for (let tk of tkAllInfo) {
                                        if (
                                          tk.TradeKernelID ===
                                          reqObj.TradeKernelID
                                        ) {
                                          reqArgs.TradeHostID = tk.TradeHostID;
                                        }
                                      }
                                      reqArgs.TradeKernelArr = [
                                        reqObj.TradeKernelID,
                                      ];
                                      reqArgs.VersionNumber = reqObj.Version;
                                      reqArgs.ProjectName = "tradekernel";
                                      reqArgs.AppName = "tradekernel";
                                      console.log(reqArgs);
                                      const reqAccount = {
                                        InvestorID:
                                          reqObjTmp.trade_account[0].investor_id,
                                        TradeKernelID: TradeKernelID,
                                        CounterTradeFrontID:
                                          reqObjTmp.trade_account[0]
                                            .counter_trade_front_id,
                                        TradePassword:
                                          reqObjTmp.trade_account[0].password,
                                        TradeApiName:
                                          reqObjTmp.trade_account[0].api_name,
                                        TradeApiVersion:
                                          reqObjTmp.trade_account[0].api_version,
                                        TradeApiConfig: JSON.stringify(
                                          reqObjTmp.trade_account[0]
                                            .extra_api_conf
                                        ),
                                        Autoffset:
                                          reqObjTmp.trade_account[0].autoffset,
                                        IgnoreSize:
                                          reqObjTmp.trade_account[0]
                                            .cancel_ignore,
                                        IsAvailable: "1",
                                      };
                                      reqAccount.CfgUnionKey =
                                        reqAccount.InvestorID +
                                        "_" +
                                        reqAccount.CounterTradeFrontID +
                                        "_" +
                                        reqAccount.TradeApiName +
                                        "_" +
                                        reqAccount.TradeApiVersion;
                                      modifyTKCfgByModel(
                                        reqArgs,
                                        (error, res) => {
                                          if (error) {
                                            message.error("修改出错");
                                          } else {
                                            updateTradeLoginCfg(
                                              reqAccount,
                                              (error, res) => {
                                                if (error) {
                                                  message.error("修改出错");
                                                }
                                              }
                                            );
                                            message.success("修改成功");
                                          }
                                        }
                                      );
                                    }
                                  }
                                  jsonValueTK = undefined
                                }}
                              >
                                保存
                              </Button>{" "}
                              <Button
                                onClick={() => {

                                  setTKS([...TKS]);
                                }}
                              >
                                {" "}
                                撤回
                              </Button>
                            </div>
                          )}

                          <MonacoEditor
                            width="500"
                            height="500"
                            language="json"
                            theme="vs-light"
                            value={tkJson}
                            onChange={(e) => {
                              changeTK(e, TradekernelName);
                            }}
                            style={{ marginBottom: 50 }}
                          />
                        </div>
                      </Card>
                    );
                  }
                )}
            </div>
          </Card>}
          {akFlag && <Card
          >
            <h2>AK</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {AKS && AKS.map(({ akID, akName, akJson, version, load_algos, is_available }) => Children.toArray(
                <Card>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ background: "#6495ed" }}>
                      id: {akID} 名称：{akName}
                    </h3>
                    {(
                      <div>
                        <Button
                          type="primary"
                          onClick={() => {
                            let reqObjTmp;
                            if (jsonValueAK === undefined) {
                              message.warn('未进行任何修改')
                              return;
                            } else {
                              try {
                                reqObjTmp = JSON.parse(jsonValueAK)
                              } catch (err) {
                                message.error('json格式出错')
                                return;
                              }
                              if (reqObjTmp.algoDockerName !== akName) {
                                const req = {
                                  AlgoDockerID: reqObjTmp.algoDockerID,
                                  Version: reqObjTmp.version,
                                  AlgoDockerName: reqObjTmp.algoDockerName
                                }
                                algoDockerModify(req, (err, res) => {
                                  // message.success('保存成功')
                                })
                              }

                              if (reqObjTmp.version !== version) {
                                const req = {
                                  AlgoDockerID: reqObjTmp.algoDockerID,
                                  Version: reqObjTmp.version,
                                  AlgoDockerName: reqObjTmp.algoDockerName
                                }
                                const req_arg = {
                                  AlgoDockerID: reqObjTmp.algoDockerID,
                                  Version: reqObjTmp.version,
                                  LogLevel: reqObjTmp.log_level,
                                  LogFilePath: reqObjTmp.log_file_path,
                                  AlgoModuleDirPath: reqObjTmp.algo_module_path,
                                  cfgJson: JSON.stringify(reqObjTmp.exCfgJson)
                                }
                                algoDockerModify(req, (err, res) => {
                                  if (!err) {

                                    algoDockerCfgModify(req_arg, (err, res) => {
                                      // message.success('保存成功')
                                    })
                                  } else {
                                    message.warn(err)
                                  }
                                })
                              }
                              //修改isAvailable
                              if (reqObjTmp.is_available !== is_available) {
                                const tmpValue = JSON.stringify(reqObjTmp.load_algos)
                                const values = JSON.parse(tmpValue)
                                const algo_id_arr = []
                                for (let value of values) {
                                  algo_id_arr.push(value.algo_id)
                                }
                                const req = {
                                  AlgoDockerID: reqObjTmp.algoDockerID,
                                  IsAvailable: reqObjTmp.is_available,
                                  AlgoID: algo_id_arr
                                }
                                algoAndAKIsAvailableModify(req, (err, res) => {
                                  if (!err) {
                                    // message.success('保存成功')
                                  } else {
                                    message.warn(err)
                                  }
                                })
                              }


                              ///  修改algo—arg
                              if (reqObjTmp.version === version && reqObjTmp.algoDockerName === akName && JSON.stringify(reqObjTmp.load_algos) === JSON.stringify(load_algos) && reqObjTmp.is_available === is_available) {
                                const req_arg = {
                                  AlgoDockerID: reqObjTmp.algoDockerID,
                                  Version: reqObjTmp.version,
                                  LogLevel: reqObjTmp.log_level,
                                  LogFilePath: reqObjTmp.log_file_path,
                                  AlgoModuleDirPath: reqObjTmp.algo_module_path,
                                  cfgJson: JSON.stringify(reqObjTmp.exCfgJson),
                                }

                                algoDockerCfgModify(req_arg, (err, res) => {
                                  if (!err) {
                                    // message.success('保存成功')
                                  } else {
                                    message.warn(err)
                                  }
                                })
                              }

                              console.log(reqObjTmp.load_algos)
                              console.log(load_algos)
                              let keyFlag = true
                              for (let data of reqObjTmp.load_algos) {
                                if (data['algo_id'] === undefined || data['algo_name'] === undefined || data['algo_lib_name'] === undefined || data['algo_lib_version'] === undefined || data['is_auto_start'] === undefined || data['algo_arg'] === undefined) {
                                  keyFlag = false
                                  message.warn('load_algos中存在key书写错误的情况')
                                }
                              }
                              if (keyFlag) {
                                // 修改algo-module 
                                // if (JSON.stringify(reqObjTmp.load_algos) !== JSON.stringify(load_algos) && reqObjTmp.load_algos.length !== 0 && load_algos.length === reqObjTmp.load_algos.length) {
                                if (load_algos.length === reqObjTmp.load_algos.length) {
                                  const tmpValue = JSON.stringify(reqObjTmp.load_algos)
                                  const values = JSON.parse(tmpValue)
                                  let flag = true
                                  let i = 0
                                  for (let value of values) {
                                    if (i < values.length) {
                                      let flag_two = false

                                      for (let data of akArg) {
                                        const tmpValue = JSON.stringify(value.algo_arg)
                                        const tmpAlgoInitArgJson = data.AlgoInitArgJson
                                        if (value.algo_id === data.AlgoID && value.algo_lib_version === data.AlgoLibVersion && JSON.stringify(JSON.parse(tmpValue)) === JSON.stringify(JSON.parse(tmpAlgoInitArgJson))) {
                                          i++;
                                          flag_two = true
                                          break;
                                        }
                                      }
                                      if (!flag_two) {
                                        flag = false
                                        break;
                                      }
                                    } else {
                                      break
                                    }
                                  }

                                  if (flag) {
                                    const req = []
                                    for (let value of values) {
                                      req.push(
                                        {
                                          AlgoID: value.algo_id,
                                          AlgoLibVersion: value.algo_lib_version,
                                          AlgoInitArgJson: JSON.stringify(value.algo_arg),
                                          AlgoDockerID: reqObjTmp.algoDockerID,
                                          AlgoLibName: value.algo_lib_name,
                                          AlgoName: value.algo_name,
                                          IsAutoStart: value.is_auto_start,
                                          IsAvailable: reqObjTmp.is_available
                                        }
                                      )
                                    }
                                    updateAlgoInfo(req, (error, res) => {
                                      if (!error) {
                                        message.success('保存成功')
                                      } else {
                                        message.warn(error)
                                      }
                                    })
                                  } else {
                                    message.warn('保存失败，algo_id或algo_lib_version或algo_arg未能实现匹配')
                                  }
                                  console.log(akArg)
                                }
                                //新增algo-module
                                if (load_algos.length !== reqObjTmp.load_algos.length) {
                                  // if (JSON.stringify(reqObjTmp.load_algos) !== JSON.stringify(load_algos) && reqObjTmp.load_algos.length !== 0 && load_algos.length !== reqObjTmp.load_algos.length) {

                                  const tmpValue = JSON.stringify(reqObjTmp.load_algos)
                                  const values = JSON.parse(tmpValue)
                                  let flag = true
                                  let i = 0;
                                  for (let value of values) {
                                    if (i < values.length) {
                                      let flag_two = false
                                      for (let data of akArg) {
                                        const tmpValue = JSON.stringify(value.algo_arg)
                                        const tmpAlgoInitArgJson = data.AlgoInitArgJson

                                        const changedValue = JSON.stringify(JSON.parse(tmpValue))
                                        const dbValue = JSON.stringify(JSON.parse(tmpAlgoInitArgJson))
                                        if (value.algo_id === data.AlgoID && value.algo_lib_version === data.AlgoLibVersion && changedValue === dbValue) {
                                          console.log('2')
                                          i++;
                                          flag_two = true
                                          break;
                                        }
                                      }
                                      if (!flag_two) {
                                        flag = false
                                        break;
                                      }
                                    } else {
                                      break;
                                    }
                                  }

                                  if (flag) {
                                    const req = []
                                    for (let value of values) {
                                      req.push(
                                        {
                                          AlgoID: value.algo_id,
                                          AlgoLibVersion: value.algo_lib_version,
                                          AlgoInitArgJson: JSON.stringify(value.algo_arg),
                                          AlgoDockerID: reqObjTmp.algoDockerID,
                                          AlgoLibName: value.algo_lib_name,
                                          AlgoName: value.algo_name,
                                          IsAutoStart: value.is_auto_start,
                                          IsAvailable: reqObjTmp.is_available
                                        }
                                      )

                                    }
                                    console.log(req)
                                    addAlgoInfo(req, (error, res) => {
                                      if (!error) {
                                        console.log(res)
                                        message.success('保存成功')
                                      } else {
                                        message.warn(error)
                                      }
                                    })
                                  } else {
                                    message.warn('保存失败，algo_id和algo_lib_version未能实现匹配')
                                  }
                                  console.log(akArg)
                                }
                              }

                            }

                            // jsonValueAK = undefined
                          }}
                        >
                          保存
                        </Button>{" "}
                        <Button
                          onClick={() => {
                            algoDockerGet({ TradeHostID: tradeHostID }, (err, res) => {
                              console.log(res)
                              let obj = {}
                              let tmpJson;
                              AKS.length = 0
                              for (let data of res) {
                                tmpJson = JSON.stringify(data, null, '\t')
                                obj.akJson = tmpJson
                                obj.flag = false
                                obj.akID = JSON.parse(tmpJson).algoDockerID
                                obj.akName = JSON.parse(tmpJson).algoDockerName
                                obj.version = JSON.parse(tmpJson).version
                                obj.load_algos = JSON.parse(tmpJson).load_algos
                                obj.is_available = JSON.parse(tmpJson).is_available
                                console.log(obj.load_algos)
                                AKS.push(obj)
                                obj = {}
                                console.log(AKS)
                                setAKS([...AKS])
                              }
                              console.log(res)
                              console.log(AKS)
                            })

                          }}
                        >
                          {" "}
                          撤回
                        </Button>
                      </div>
                    )}
                    <MonacoEditor
                      width="500"
                      height="500"
                      language="json"
                      theme="vs-light"
                      value={akJson}
                      onChange={(e) => {
                        console.log(e)
                        jsonValueAK = e
                      }}
                      style={{ marginBottom: 50 }}
                    />
                  </div>
                </Card>
              ))}

            </div>
          </Card>}
          {mkFlag && <Card
          >
            <h2>MK</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {MKS && MKS.map(({ mkName, mkJson, tradeHostID }) => Children.toArray(
                <Card>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ background: "#FF69B4" }}>
                      名称：{mkName}
                    </h3>
                    {(
                      <div>
                        <Button
                          type="primary"
                          onClick={() => {
                            let reqObjTmp
                            // let preReqObj = JSON.parse(mkJson)
                            if (jsonValueMK === undefined) {
                              message.warn('未进行任何修改')
                              return;
                            } else {
                              try {
                                reqObjTmp = JSON.parse(jsonValueMK)
                              } catch (err) {
                                message.error('json格式出错')
                                return;
                              }
                              //同时修改mk参数和mkapi
                              mkAllModify(tradeHostID, reqObjTmp, preReqObj);
                              // if (JSON.stringify(reqObjTmp.md_apis) !== JSON.stringify(preReqObj.md_apis) && reqObjTmp.market_kernel_name !== preReqObj.market_kernel_name || reqObjTmp.version !== preReqObj.version || reqObjTmp.log_level !== preReqObj.log_level || reqObjTmp.log_file_path !== preReqObj.log_file_path || reqObjTmp.memory_dir_path !== preReqObj.memory_dir_path || reqObjTmp.market_lib_path !== preReqObj.market_lib_path || reqObjTmp.is_available !== preReqObj.is_available || JSON.stringify(reqObjTmp.cfg_json) !== JSON.stringify(preReqObj.cfg_json)) {
                              //   console.log('objec=====t')
                              // } else {
                              //   console.log('objec--------t')
                              //   //@todo
                              //   // 进行修改MK且格式正确
                              //   mkCfgModify(tradeHostID, reqObjTmp, preReqObj)
                              //   // 修改 mk api
                              //   mkApiCfgModify(reqObjTmp, preReqObj)

                              // }

                            }
                          }
                          }
                        >
                          保存
                        </Button>{" "}
                        <Button
                          onClick={() => {
                            marketKernelCfgGet({ TradeHostID: tradeHostID }, (err, res) => {
                              console.log(res)
                              let obj = {}
                              let tmpJson;
                              let keyObj;
                              MKS.length = 0
                              for (let data of res) {
                                delete data['trade_host_id']
                                tmpJson = JSON.stringify(data, null, '\t')
                                // 全部的数据
                                obj.mkJson = tmpJson
                                // setMkJson(tmpJson)
                                // 额外添加字段,用于判断是否修改的元数据
                                keyObj = JSON.parse(tmpJson)
                                setPreReqObj(Object.assign({}, JSON.parse(tmpJson)))
                                obj.mkName = keyObj.market_kernel_name

                                obj.tradeHostID = tradeHostID
                                MKS.push(obj)
                                obj = {}
                                console.log(obj)
                                console.log(tmpJson)
                                setMKS([...MKS])
                              }

                            })
                          }}
                        >
                          {" "}
                          撤回
                        </Button>
                      </div>
                    )}
                    <MonacoEditor
                      width="500"
                      height="500"
                      language="json"
                      theme="vs-light"
                      value={mkJson}
                      onChange={(e) => {
                        console.log(e)
                        jsonValueMK = e
                      }}
                      style={{ marginBottom: 50 }}
                    />
                  </div>
                </Card>
              ))}

            </div>
          </Card>}

        </div>
      </Modal>
    </div >
  );
}

export default App;
