import React, { useState, useEffect, Children } from "react";
import { Transfer } from "@txdfe/at";
import { message, Button, Select } from "antd";
import "@txdfe/at/build/teambition.min.css";
import {
  allAppByTradeHostIDGet,
  tradeHostCPUCfgGet,
  tradeHostCPUDistributionByAppIDGet,
  tradeHostCPUDistributionGet,
  tradeHostCPUDistributionModify,
} from "./post/getData";




function TransferCpu({ tradeHostID, track, trackChange }) {
  const [dataSource, setDataSource] = useState([]);
  const [unusefulArr, setUnusefulArr] = useState([]);
  const [usefulArr, setUsefulArr] = useState([]);
  const [proName, setProName] = useState([]);
  const [proID, setProID] = useState();
  const [AppName, setAppName] = useState();
  const [pickData, setPickData] = useState([]);
  const [tmpDatas, setTmpDatas] = useState([]);
  const [trueCpuUseDatas, setTrueCpuUseDatas] = useState([])


  const getFakeCpusInfo = () => {
    const unuseful = [];
    const useful = [];
    let flag_unuseful = true;
    let flag_useful = true;
    if (tradeHostID !== undefined) {
      tradeHostCPUCfgGet({ TradeHostID: tradeHostID }, (error, res) => {
        console.log(res);
        tradeHostCPUDistributionGet(
          { TradeHostID: tradeHostID },
          (error, res_two) => {
            // 可用
            const startIndexUseful = JSON.parse(res[0].CPUCfgJson).reusable
              .start;
            const endIndexUseful = JSON.parse(res[0].CPUCfgJson).reusable.end;

            for (let i = startIndexUseful; i <= endIndexUseful; i++) {
              for (let j = 0; j < res_two.length; j++) {
                if (Number(res_two[j].CPUID) == i) {
                  useful.push({
                    label: `【可复用】CPU${i}@@${res_two[j].AppName}`,
                    value: `${i}`,
                    disabled: false,
                  });
                  flag_useful = false;
                  break;
                } else {
                  flag_useful = true;
                }
              }
              if (flag_useful) {
                useful.push({
                  label: `【可复用】CPU${i}`,
                  value: `${i}`,
                  disabled: false,
                });
              }
            }
            setUsefulArr(useful);
            // 不可用
            const startIndex = JSON.parse(res[0].CPUCfgJson).unreusable.start;
            const endIndex = JSON.parse(res[0].CPUCfgJson).unreusable.end;

            for (let i = Number(startIndex); i <= Number(endIndex); i++) {
              console.log("object");
              for (let j = 0; j < res_two.length; j++) {
                if (Number(res_two[j].CPUID) == i) {
                  unuseful.push({
                    label: `【不可复用】CPU${i}@@${res_two[j].AppName}`,
                    value: `${i}`,
                    disabled: true,
                  });
                  flag_unuseful = false;
                  break;
                } else {
                  flag_unuseful = true;
                }
              }

              if (flag_unuseful) {
                useful.push({
                  label: `【不可复用】CPU${i}`,
                  value: `${i}`,
                  disabled: false,
                });
              }
            }
            setUnusefulArr(unuseful);

            // 真实的cpu分配状态情况
            setTrueCpuUseDatas(useful.concat(unuseful))


            // tmpUseful  将所有数据的初始disable的设置为true
            const tmpUseful = [...useful.map(item => {
              return Object.assign({}, item)
            })]

            for (let data of tmpUseful) {
              data.disabled = true
            }
            setDataSource(tmpUseful.concat(unuseful));
            // setPickData([]);
            console.log(useful);
          }
        );
      });
      allAppByTradeHostIDGet({ TradeHostID: tradeHostID }, (error, res) => {
        setProName(res);
      });
    }
  }
  const getTrueCpusInfo = () => {
    const unuseful = [];
    const useful = [];
    let flag_unuseful = true;
    let flag_useful = true;
    if (tradeHostID !== undefined) {
      tradeHostCPUCfgGet({ TradeHostID: tradeHostID }, (error, res) => {
        console.log(res);
        tradeHostCPUDistributionGet(
          { TradeHostID: tradeHostID },
          (error, res_two) => {
            // 可用
            const startIndexUseful = JSON.parse(res[0].CPUCfgJson).reusable
              .start;
            const endIndexUseful = JSON.parse(res[0].CPUCfgJson).reusable.end;

            for (let i = startIndexUseful; i <= endIndexUseful; i++) {
              for (let j = 0; j < res_two.length; j++) {
                if (Number(res_two[j].CPUID) == i) {
                  useful.push({
                    label: `【可复用】CPU${i}@@${res_two[j].AppName}`,
                    value: `${i}`,
                    disabled: false,
                  });
                  flag_useful = false;
                  break;
                } else {
                  flag_useful = true;
                }
              }
              if (flag_useful) {
                useful.push({
                  label: `【可复用】CPU${i}`,
                  value: `${i}`,
                  disabled: false,
                });
              }
            }
            setUsefulArr(useful);
            // 不可用
            const startIndex = JSON.parse(res[0].CPUCfgJson).unreusable.start;
            const endIndex = JSON.parse(res[0].CPUCfgJson).unreusable.end;

            for (let i = Number(startIndex); i <= Number(endIndex); i++) {
              console.log("object");
              for (let j = 0; j < res_two.length; j++) {
                if (Number(res_two[j].CPUID) == i) {
                  unuseful.push({
                    label: `【不可复用】CPU${i}@@${res_two[j].AppName}`,
                    value: `${i}`,
                    disabled: true,
                  });
                  flag_unuseful = false;
                  break;
                } else {
                  flag_unuseful = true;
                }
              }

              if (flag_unuseful) {
                useful.push({
                  label: `【不可复用】CPU${i}`,
                  value: `${i}`,
                  disabled: false,
                });
              }
            }
            setUnusefulArr(unuseful);

            setDataSource(useful.concat(unuseful));
            // setPickData([]);
            console.log(useful);
          }
        );
      });
      allAppByTradeHostIDGet({ TradeHostID: tradeHostID }, (error, res) => {
        setProName(res);
      });
    }
  }
  const handleSort = (value) => {
    console.log(value);
    const req = { TradeHostID: tradeHostID };
    console.log(proName);
    console.log(AppName);
    for (let i = 0; i < proName.length; i++) {
      if (AppName === proName[i].AppName) {
        req.AppID = proName[i].AppID;
      }
    }
    tradeHostCPUDistributionByAppIDGet(req, (error, res) => {
      // console.log(dataSource);
      const dt = [];
      for (let data of dataSource) {
        for (let target of res) {
          if (target === data.value) {
            if (data.disabled) {
              data.disabled = false;
              console.log(data);
              dt.push(data);
            }
          }
        }
      }
      setTmpDatas(dt);
      console.log(res);
      console.log(value);
      setPickData(value);
      setTrackDatas(Math.random());
    });
    // setPickData(value);
  };
  const onchange = (e, c, d) => {
    if (!AppName) {
      message.warn("请在右侧选择相应程序");
    } else {
      setPickData(e);
    }
  };

  const [trackDatas, setTrackDatas] = useState(0);
  const [tmpReq, setTmpReq] = useState()
  // 使用真实数据拷贝,跟踪useEffect
  const [trackTrueDatas, setTrackTrueDatas] = useState(0)
  const select = (value) => {
    console.log(value)
    // setAppName(value);
    console.log(tmpDatas);

    const req = { TradeHostID: tradeHostID };
    for (let i = 0; i < proName.length; i++) {
      if (value === proName[i].AppNameWithType) {
        setAppName(proName[i].AppName);
        req.AppID = proName[i].AppID;
        setProID(proName[i].AppID);
      }
    }
    setTmpReq(req)
    //还原真实的cpu使用情况
    // setDataSource(trueCpuUseDatas)
    getTrueCpusInfo()
    setTrackTrueDatas(Math.random())
  };
  useEffect(() => {
    if (trackTrueDatas !== 0) {
      console.log(dataSource)
      tradeHostCPUDistributionByAppIDGet(tmpReq, (error, res) => {
        // console.log(dataSource);
        const dt = [];
        for (let data of dataSource) {
          for (let target of res) {
            if (target === data.value) {
              if (data.disabled) {
                data.disabled = false;
                console.log(data);
                dt.push(data);
              }
            }
          }
        }
        setTmpDatas(dt);
        setPickData(res);
        setTrackDatas(Math.random());
      });
      setTrackDatas(0)
    }
  }, [trackTrueDatas])

  useEffect(() => {
    if (tmpDatas.length !== 0) {
      for (let data of dataSource) {
        for (let target of tmpDatas) {
          if (target.value === data.value) {
            data.disabled = true;
          }
        }
      }
      setDataSource(dataSource);
      console.log(tmpDatas);
    }
  }, [trackDatas]);
  const save = () => {
    const arr = [];
    for (let data of pickData) {
      arr.push(Number(data));
    }
    const req = {
      TradeHostID: tradeHostID,
      AppID: proID,
      AppName: AppName,
      DataArr: arr,
    };
    tradeHostCPUDistributionModify(req, (error, res) => {
      const unuseful = [];
      const useful = [];
      let flag_unuseful = true;
      let flag_useful = true;
      tradeHostCPUCfgGet({ TradeHostID: tradeHostID }, (error, res) => {
        tradeHostCPUDistributionGet(
          { TradeHostID: tradeHostID },
          (error, res_two) => {
            // 可用
            console.log(res_two);
            const startIndexUseful = JSON.parse(res[0].CPUCfgJson).reusable
              .start;
            const endIndexUseful = JSON.parse(res[0].CPUCfgJson).reusable.end;

            for (let i = startIndexUseful; i <= endIndexUseful; i++) {
              console.log(typeof i);
              for (let j = 0; j < res_two.length; j++) {
                if (Number(res_two[j].CPUID) == i) {
                  useful.push({
                    label: `【可复用】CPU${i}@@${res_two[j].AppName}`,
                    value: `${i}`,
                    disabled: false,
                  });
                  flag_useful = false;
                  break;
                } else {
                  flag_useful = true;
                }
              }
              if (flag_useful) {
                useful.push({
                  label: `【可复用】CPU${i}`,
                  value: `${i}`,
                  disabled: false,
                });
              }
            }
            setUsefulArr(useful);
            // 不可用
            const startIndex = JSON.parse(res[0].CPUCfgJson).unreusable.start;
            const endIndex = JSON.parse(res[0].CPUCfgJson).unreusable.end;

            for (let i = Number(startIndex); i <= Number(endIndex); i++) {
              for (let j = 0; j < res_two.length; j++) {
                if (Number(res_two[j].CPUID) === i) {
                  unuseful.push({
                    label: `【不可复用】CPU${i}@@${res_two[j].AppName}`,
                    value: `${i}`,
                    disabled: true,
                  });
                  flag_unuseful = false;
                  break;
                } else {
                  flag_unuseful = true;
                }
              }

              if (flag_unuseful) {
                useful.push({
                  label: `【可复用】CPU${i}`,
                  value: `${i}`,
                  disabled: false,
                });
              }
            }
            setUnusefulArr(unuseful);
            setDataSource(useful.concat(unuseful));
          }
        );
      });
    });
    message.success("保存成功");
  };
  useEffect(() => {
    // setAppName("")
    getFakeCpusInfo()
  }, [track]);

  useEffect(() => {
    console.log(proID);
    console.log(pickData);
    const arr = [];
    for (let data of pickData) {
      arr.push(Number(data));
    }
    console.log(arr);
    console.log(AppName);
    const req = {
      TradeHostID: tradeHostID,
      AppID: proID,
      AppName: AppName,
      DataArr: arr,
    };
    console.log(req);
    // tradeHostCPUDistributionModify(req, (error, res) => {
    //   console.log(res);
    // });
  }, [trackChange]);
  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column' }}>
      <Transfer
        sortable
        // defaultValue={["1"]}
        value={pickData}
        dataSource={dataSource}
        listStyle={{ width: "400px", height: "592px" }}
        onSort={handleSort}
        onChange={onchange}
        titles={[
          `CPU分配情况(请先在右侧选择需要分配CPU核的程序)`,
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Select
              showSearch={true}
              placeholder="请选择需要分配CPU核的程序"
              onSelect={select}
              style={{ width: "350px" }}
              allowClear={true}
            >
              {proName.map(({ AppNameWithType }, index) =>
                Children.toArray(
                  <Select.Option value={AppNameWithType} key={index}>
                    {AppNameWithType}
                  </Select.Option>
                )
              )}
            </Select>


          </div>,
        ]}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <Button type="primary" onClick={save} style={{ width: 100 }}>
          保存
        </Button>
      </div>
    </div>
  );
}

export default TransferCpu;
