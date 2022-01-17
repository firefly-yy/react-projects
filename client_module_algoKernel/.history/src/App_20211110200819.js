import React, {
  useEffect,
  useState,
  useRef,
  Children,
  useCallback,
} from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
  Table,
  Select,
  Button,
  Form,
  Radio,
  InputNumber,
  Modal,
  Card,
  Progress,
  message,
  Input,
} from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { MenuOutlined } from "@ant-design/icons";
import {
  getInstrumentIDData,
  getStrategyIDData,
  getInvestorIDData,
  strategyAlgoOrder,
  strategyAlgoCancelOrder,
  getAlgoOrderStatus,
  getAlgoModuleInfoData,
} from "./post/getData";

const layout = {
  labelCol: { span: 9 },
  colon: false,
  wrapperCol: { span: 10 },
  size: "small",
};
function App() {
  const [ifShow, setIfShow] = useState(true);
  const cancelAction = () => {
    // cancel deal
  };
  const initColumns = [
    {
      title: "策略ID",
      width: 120,
      dataIndex: "StrategyId",
      key: "1",
      sorter: true,
      name: "策略ID",
      fixed: "left",
    },
    {
      key: "2",
      name: "策略名称",
      title: "策略名称",
      width: 120,
      dataIndex: "StrategyName",
      fixed: "left",
    },
    {
      key: "12",
      name: "股票代码",
      title: "股票代码",
      width: 120,
      dataIndex: "InstrumentID",
    },
    {
      key: "9",
      name: "母单编号",
      title: "母单编号",
      width: 120,
      dataIndex: "SkAlgoOrderRef",
      sorter: true,
    },
    {
      key: "3",
      name: "主机ID",
      title: "主机ID",
      width: 120,
      dataIndex: "tradehostid",
      sorter: true,
    },
    {
      key: "4",
      name: "主机名称",
      title: "主机名称",
      width: 120,
      dataIndex: "TradeHostName",
    },
    {
      key: "5",
      name: "DockerID",
      title: "DockerID",
      width: 120,
      dataIndex: "DockerID",
      sorter: true,
    },

    {
      key: "7",
      name: "TKID",
      title: "TKID",
      width: 120,
      dataIndex: "TKID",
      sorter: true,
    },
    {
      key: "8",
      name: "算法类型",
      title: "算法类型",
      width: 120,
      dataIndex: "AlgoType",
      sorter: true,
    },
    {
      key: "10",
      name: "状态",
      title: "状态",
      width: 100,
      dataIndex: "OrderState",
      sorter: true,
    },
    {
      key: "100",
      name: "进度",
      title: "进度",
      width: 150,
      dataIndex: "Schedule",
      render: (record) => <Progress percent={record} />,
    },
    {
      key: "11",
      name: "母单股数",
      title: "母单股数",
      width: 120,
      dataIndex: "OrderVol",
    },

    // {
    //   key: "13",
    //   name: "母单金额",
    //   title: "母单金额",
    //   width: 120,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "14",
    //   name: "委托金额",
    //   title: "委托金额",
    //   width: 120,
    //   dataIndex: "Test",
    //   sorter: true,
    // },
    // {
    //   key: "15",
    //   name: "成交金额",
    //   title: "成交金额",
    //   width: 120,
    //   dataIndex: "Test",
    //   sorter: true,
    // },
    {
      key: "16",
      name: "委托量",
      title: "委托量",
      width: 120,
      sorter: true,
      dataIndex: "OrderVol",
    },
    {
      key: "17",
      name: "成交量",
      title: "成交量",
      width: 120,
      sorter: true,
      dataIndex: "TradeVol",
    },
    // {
    //   key: "18",
    //   name: "开始时间",
    //   title: "开始时间",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "19",
    //   name: "结束时间",
    //   title: "结束时间",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "20",
    //   name: "策略执行价",
    //   title: "策略执行价",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "21",
    //   name: "市场成交价",
    //   title: "市场成交价",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "22",
    //   name: "下单ID",
    //   title: "下单ID",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "23",
    //   name: "策略提示",
    //   title: "策略提示",
    //   width: 120,
    //   dataIndex: "Test",
    // },
    {
      key: "24",
      name: "方向",
      title: "方向",
      width: 100,
      dataIndex: "Direction",
    },
    // {
    //   key: "25",
    //   name: "市场均价滑点",
    //   title: "市场均价滑点",
    //   width: 150,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
  ];
  const [columns, setColumns] = useState([
    {
      title: "策略ID",
      width: 120,
      dataIndex: "StrategyId",
      key: "1",
      sorter: true,
      name: "策略ID",
      fixed: "left",
    },
    {
      key: "2",
      name: "策略名称",
      title: "策略名称",
      width: 120,
      dataIndex: "StrategyName",
      fixed: "left",
    },
    {
      key: "12",
      name: "股票代码",
      title: "股票代码",
      width: 120,
      dataIndex: "InstrumentID",
    },
    {
      key: "9",
      name: "母单编号",
      title: "母单编号",
      width: 120,
      dataIndex: "SkAlgoOrderRef",
      sorter: true,
    },
    {
      key: "3",
      name: "主机ID",
      title: "主机ID",
      width: 120,
      dataIndex: "tradehostid",
      sorter: true,
    },
    {
      key: "4",
      name: "主机名称",
      title: "主机名称",
      width: 120,
      dataIndex: "TradeHostName",
    },
    {
      key: "5",
      name: "DockerID",
      title: "DockerID",
      width: 120,
      dataIndex: "DockerID",
      sorter: true,
    },

    {
      key: "7",
      name: "TKID",
      title: "TKID",
      width: 120,
      dataIndex: "TKID",
      sorter: true,
    },
    {
      key: "8",
      name: "算法类型",
      title: "算法类型",
      width: 120,
      dataIndex: "AlgoType",
      sorter: true,
    },

    {
      key: "10",
      name: "状态",
      title: "状态",
      width: 100,
      dataIndex: "OrderState",
      sorter: true,
    },
    {
      key: "100",
      name: "进度",
      title: "进度",
      width: 150,
      dataIndex: "Schedule",
      render: (record) => <Progress percent={record} />,
    },
    {
      key: "11",
      name: "母单股数",
      title: "母单股数",
      width: 120,
      dataIndex: "OrderVol",
    },

    // {
    //   key: "13",
    //   name: "母单金额",
    //   title: "母单金额",
    //   width: 120,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "14",
    //   name: "委托金额",
    //   title: "委托金额",
    //   width: 120,
    //   dataIndex: "Test",
    //   sorter: true,
    // },
    // {
    //   key: "15",
    //   name: "成交金额",
    //   title: "成交金额",
    //   width: 120,
    //   dataIndex: "Test",
    //   sorter: true,
    // },
    {
      key: "16",
      name: "委托量",
      title: "委托量",
      width: 120,
      sorter: true,
      dataIndex: "OrderVol",
    },
    {
      key: "17",
      name: "成交量",
      title: "成交量",
      width: 120,
      sorter: true,
      dataIndex: "TradeVol",
    },
    // {
    //   key: "18",
    //   name: "开始时间",
    //   title: "开始时间",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "19",
    //   name: "结束时间",
    //   title: "结束时间",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "20",
    //   name: "策略执行价",
    //   title: "策略执行价",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "21",
    //   name: "市场成交价",
    //   title: "市场成交价",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "22",
    //   name: "下单ID",
    //   title: "下单ID",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "23",
    //   name: "策略提示",
    //   title: "策略提示",
    //   width: 120,
    //   dataIndex: "Test",
    // },
    {
      key: "24",
      name: "方向",
      title: "方向",
      width: 100,
      dataIndex: "Direction",
    },
    // {
    //   key: "25",
    //   name: "市场均价滑点",
    //   title: "市场均价滑点",
    //   width: 150,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
  ]);
  const [data, setData] = useState([]);
  const [motherSingleStock, setMotherSingleStock] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef();

  // just for show modal data
  const [celueID, setCelueID] = useState();
  const [zijinzhanghao, setZijinzhanghao] = useState();
  const [zhengquandaima, setZhengquandaima] = useState();
  const [jiaoyifangxiang, setJiaoyifangxiang] = useState();
  const [kaijinping, setKaijinping] = useState();
  const [startTimeHours, setStartTimeHours] = useState();
  const [startTimeMinutes, setStartTimeMinutes] = useState();
  const [startTimeSeconds, setStartTimeSeconds] = useState();
  const [endTimeHours, setEndTimeHours] = useState();
  const [endTimeMinutes, setEndTimeMinutes] = useState();
  const [endTimeSeconds, setEndTimeSeconds] = useState();
  const [suanfamingcheng, setsuanfamingcheng] = useState();
  // const [jiage,setJiage] = useState()
  // const [switchTwo,setSwitchTwo] = useState()
  // const [switchOne,setSwitchOne] = useState()
  // const [timer,setTimer] = useState()
  const [ifSoon, setIfSoon] = useState();

  /////
  const [flag, setFlag] = useState(0);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    if (flag !== 0) {
      const form = formRef.current;
      const Info = form.getFieldsValue(true);
      console.log(Info);
      setCelueID(Info.strategy_id);
      setZijinzhanghao(Info.investor_id);
      setZhengquandaima(Info.instrument_id);
      if (Info.direction === 0) {
        setJiaoyifangxiang("买");
      } else {
        setJiaoyifangxiang("卖");
      }
      if (Info.offset === 0) {
        setKaijinping("开仓");
      } else if (Info.offset === 1) {
        setKaijinping("平仓");
      } else {
        setKaijinping("平今");
      }
      getAlgoModuleInfoData((error, res) => {
        setsuanfamingcheng(res[Info.algo_id].AlgoName);
      });
      // setJiage(Info.price)
      setStartTime(Info.TradeStartTime);
      setEndTime(Info.TradeEndTime);
      if (Info.switch_ahead === 0) {
        setIfSoon("否");
      } else {
        setIfSoon("是");
      }
    }
  }, [flag]);

  const handleOk = () => {
    setIsVisible(true);
    setFlag(1);
  };

  //////
  const toChinesNum = (num) => {
    let changeNum = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
    ]; //changeNum[0] = "零"
    let unit = ["", "十", "百", "千", "万"];
    num = parseInt(num);
    let getWan = (temp) => {
      let strArr = temp
        .toString()
        .split("")
        .reverse();
      let newNum = "";
      for (var i = 0; i < strArr.length; i++) {
        newNum =
          (i == 0 && strArr[i] == 0
            ? ""
            : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
            ? ""
            : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
          newNum;
      }
      return newNum;
    };
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) noWan = "0" + noWan;
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  };
  const onChange = useCallback((e) => {
    if (e) {
      setMotherSingleStock(toChinesNum(e));
    } else {
      setMotherSingleStock("");
    }
  }, []);

  // dragtable
  const type = "DraggableBodyRow";

  const DraggableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
  }) => {
    const ref = useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: type,
      collect: (monitor) => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName:
            dragIndex < index ? " drop-over-downward" : " drop-over-upward",
        };
      },
      drop: (item) => {
        moveRow(item.index, index);
      },
    });
    const [, drag] = useDrag({
      type,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drop(drag(ref));

    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{ cursor: "move", ...style }}
        {...restProps}
      />
    );
  };

  const columnsForDrag = [
    {
      title: "列名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "拖动",
      width: 60,
      render: () => <MenuOutlined style={{ cursor: "grab", color: "#999" }} />,
    },
  ];

  const [dataForDrag, setDataForDrag] = useState([
    {
      title: "策略ID",
      width: 120,
      dataIndex: "StrategyId",
      key: "1",
      sorter: true,
      name: "策略ID",
    },
    {
      key: "2",
      name: "策略名称",
      title: "策略名称",
      width: 120,
      dataIndex: "StrategyName",
    },
    {
      key: "3",
      name: "主机ID",
      title: "主机ID",
      width: 120,
      dataIndex: "tradehostid",
      sorter: true,
    },
    {
      key: "4",
      name: "主机名称",
      title: "主机名称",
      width: 120,
      dataIndex: "TradeHostName",
    },
    {
      key: "5",
      name: "DockerID",
      title: "DockerID",
      width: 120,
      dataIndex: "DockerID",
      sorter: true,
    },

    {
      key: "7",
      name: "TKID",
      title: "TKID",
      width: 120,
      dataIndex: "TKID",
      sorter: true,
    },
    {
      key: "8",
      name: "算法类型",
      title: "算法类型",
      width: 120,
      dataIndex: "AlgoType",
      sorter: true,
    },
    {
      key: "9",
      name: "母单编号",
      title: "母单编号",
      width: 120,
      dataIndex: "SkAlgoOrderRef",
      sorter: true,
    },
    {
      key: "10",
      name: "状态",
      title: "状态",
      width: 100,
      dataIndex: "OrderState",
      sorter: true,
    },
    {
      key: "100",
      name: "进度",
      title: "进度",
      width: 150,
      dataIndex: "Schedule",
      render: (record) => <Progress percent={record} />,
    },
    {
      key: "11",
      name: "母单股数",
      title: "母单股数",
      width: 120,
      dataIndex: "OrderVol",
    },
    {
      key: "12",
      name: "股票代码",
      title: "股票代码",
      width: 120,
      dataIndex: "InstrumentID",
    },
    // {
    //   key: "13",
    //   name: "母单金额",
    //   title: "母单金额",
    //   width: 120,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "14",
    //   name: "委托金额",
    //   title: "委托金额",
    //   width: 120,
    //   dataIndex: "Test",
    //   sorter: true,
    // },
    // {
    //   key: "15",
    //   name: "成交金额",
    //   title: "成交金额",
    //   width: 120,
    //   dataIndex: "Test",
    //   sorter: true,
    // },
    {
      key: "16",
      name: "委托量",
      title: "委托量",
      width: 120,
      sorter: true,
      dataIndex: "OrderVol",
    },
    {
      key: "17",
      name: "成交量",
      title: "成交量",
      width: 120,
      sorter: true,
      dataIndex: "TradeVol",
    },
    // {
    //   key: "18",
    //   name: "开始时间",
    //   title: "开始时间",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "19",
    //   name: "结束时间",
    //   title: "结束时间",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "20",
    //   name: "策略执行价",
    //   title: "策略执行价",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "21",
    //   name: "市场成交价",
    //   title: "市场成交价",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "22",
    //   name: "下单ID",
    //   title: "下单ID",
    //   width: 120,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
    // {
    //   key: "23",
    //   name: "策略提示",
    //   title: "策略提示",
    //   width: 120,
    //   dataIndex: "Test",
    // },
    {
      key: "24",
      name: "方向",
      title: "方向",
      width: 100,
      dataIndex: "Direction",
    },
    // {
    //   key: "25",
    //   name: "市场均价滑点",
    //   title: "市场均价滑点",
    //   width: 150,
    //   sorter: true,
    //   dataIndex: "Test",
    // },
  ]);

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const [tmpData, setTmpData] = useState([]);
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = dataForDrag[dragIndex];
      const tmpRow = tmpData[dragIndex];
      setDataForDrag(
        update(dataForDrag, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
      // setTmpData(
      //   update(tmpData, {
      //     $splice: [
      //       [dragIndex, 1],
      //       [hoverIndex, 0, tmpRow],
      //     ],
      //   })
      // );
    },
    [dataForDrag]
  );

  // Modal
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const reset = () => {
    setColumns(initColumns);
    setVisible(false);
  };
  function compare(key) {
    return function(value1, value2) {
      var val1 = value1[key];
      var val2 = value2[key];
      return val1 - val2; //降序排列,return val1-val2; -->升序
    };
  }
  const rowSelection = {
    onChange: (e, ee) => {
      ee.sort(compare("key"));
      setTmpData(ee);
    },
  };
  const rowSelectionForTrade = {
    onChange: (e, ee) => {},
  };
  const handleModal = () => {
    if (tmpData.length !== 0) {
      setColumns(tmpData);
    } else {
      setColumns(dataForDrag);
    }
    setVisible(false);
  };

  const hideModal = () => {
    setVisible(false);
  };

  // modal for confirm
  const handleModalConfirm = () => {
    setFlag(0);
    const form = formRef.current;
    const Info = form.getFieldsValue(true);

    if (Info.algo_id === 101) {
      const start = startTime.split(":");
      const end = endTime.split(":");

      if (start.length == 1) {
        console.log("object");
        start.push("00");
      }
      if (end.length == 1) {
        console.log("2");
        end.push("00");
      }
      console.log(start);
      console.log(end);

      const startsec = start[0] * 3600 + start[1] * 60 + Number(start[2]);
      const endsec = end[0] * 3600 + end[1] * 60 + Number(end[2]);
      console.log(startsec);
      console.log(endsec);

      const req = {
        InvestorID: Info.investor_id,
        InstrumentID: Info.instrument_id,
        ExchangeID: exchangeID,
        Direction: Info.direction,
        Offset: Info.offset,
        AlgoID: Info.algo_id,
        StrategyID: Info.strategy_id,
        DockerID: docker_id,
        OrderVol: Info.order_vol,
        tradeHostID: tradeHostID,
        Param: {
          start: startsec,
          end: endsec,
          switch_ahead: Info.switch_ahead,
        },
      };
      strategyAlgoOrder(req, (error, res) => {
        console.log(req);
        if (error) {
          message.error(error);
        } else {
          getAlgoOrderStatus((error, res) => {
            if (error) {
              message.error(error);
            } else {
              setData(res);
              setData(res.reverse());
            }
          });
          message.success("算法下单成功");
          // const obj = {
          //   DockerID: res.datalist[0].RspArguments.DockerID,
          //   SKAlgoOref: res.datalist[0].RspArguments.SKAlgoOref,
          //   StrategyID: res.datalist[0].RspArguments.StrategyID,
          //   tradehostid: res.tradehostid,
          // };
          // setData([...data, obj]);
        }
      });
    } else if (Info.algo_id === 102) {
      const req = {
        InvestorID: Info.investor_id,
        InstrumentID: Info.instrument_id,
        ExchangeID: exchangeID,
        Direction: Info.direction,
        Offset: Info.offset,
        AlgoID: Info.algo_id,
        StrategyID: Info.strategy_id,
        DockerID: docker_id,
        OrderVol: Info.order_vol,
        tradeHostID: tradeHostID,
        Param: {
          price: Info.price,
          switch_limitpend: Info.switch_limitpend,
          switch_singleton: Info.switch_singleton,
          timeout: Info.timeout,
        },
      };
      strategyAlgoOrder(req, (error, res) => {
        console.log(req);
        if (error) {
          message.error(error);
        } else {
          getAlgoOrderStatus((error, res) => {
            if (error) {
              message.error(error);
            } else {
              setData(res);
              setData(res.reverse());
            }
          });
          message.success("算法下单成功");
        }
      });
    }

    setIsVisible(false);
  };
  const hideModalConfirm = () => {
    setIsVisible(false);
    setFlag(0);
  };

  // delete order
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [reqCancel, setReqCancel] = useState({});
  //tmp just for test
  const [mudanbianhao, setMudanbianhao] = useState();

  const doubleClick = (e) => {
    setIsVisibleDelete(true);
    setReqCancel({
      DockerID: e.DockerID,
      tradeHostID: e.tradehostid,
      SKAlgoOref: e.SkAlgoOrderRef,
      StrategyID: e.StrategyId,
    });
    setMudanbianhao(e.SkAlgoOrderRef);
  };
  const handleModalDelete = () => {
    strategyAlgoCancelOrder(reqCancel, (error, res) => {
      if (error) {
        message.error(error);
      } else {
        getAlgoOrderStatus((error, res) => {
          if (error) {
            message.error(error);
          } else {
            setData(res.reverse());
            // setData(res);
          }
        });
        // const arr = [...data];
        // arr.splice(
        //   arr.findIndex((item) => item.SKAlgoOref === reqCancel.SKAlgoOref),
        //   1
        // );
        // setData(arr);
        message.success("算法撤单成功");
      }
    });
    setIsVisibleDelete(false);
  };
  const hideModalDelete = () => {
    setIsVisibleDelete(false);
  };

  //get strategyID && get DockerID
  const [strategy_id, setStrategy_id] = useState([]);
  const [investor_id, setInvestor_id] = useState([]);
  const [docker_id, setDocker_id] = useState();
  const [instrument_id, setInstrument_id] = useState([]);
  const [algo_id, setAlgo_id] = useState([]);
  const [instrumentName, setInstrumentName] = useState();
  const [tradeHostID, setTradeHostID] = useState();
  const [exchangeID, setExchangeID] = useState();
  const [tmpStrategyID, setTmpStrategyID] = useState();

  const [strategyIDTmp, setStrategyIDTmp] = useState();
  const investorGet = useCallback((e) => {
    setTmpStrategyID(e);
  }, []);
  const [showDivOne, setShowDivOne] = useState("none");
  const [showDivTwo, setShowDivTwo] = useState("none");
  const [showDivThree, setShowDivThree] = useState("none");

  const getStrategyID = () => {
    getStrategyIDData((error, res) => {
      if (error) {
        message.error(error);
      } else {
        setStrategy_id(res);
      }
    });
  };

  useEffect(() => {
    for (let i = 0; i < strategy_id.length; i++) {
      if (tmpStrategyID === strategy_id[i].StrategyID) {
        setDocker_id(strategy_id[i].DockerID);
        setTradeHostID(strategy_id[i].TradeHostID);
      }
    }
    const reqobj = {
      StrategyIDArr: [tmpStrategyID],
    };
    if (tmpStrategyID !== undefined) {
      getInvestorIDData(reqobj, (error, res) => {
        if (error) {
          message.error(error);
        } else {
          setInvestor_id(res);
        }
      });
    }
  }, [tmpStrategyID]);
  const [tmpExchangeID, setTmpExchangeID] = useState();
  const getInstrumentName = useCallback((e) => {
    setTmpExchangeID(e);
  }, []);
  const getInstrumentNameReal = () => {
    getInstrumentIDData((error, res) => {
      if (error) {
        message.error(error);
      } else {
        setInstrument_id(res);
      }
    });
  };
  useEffect(() => {
    for (let i = 0; i < instrument_id.length; i++) {
      if (tmpExchangeID === instrument_id[i].InstrumentID) {
        setInstrumentName(instrument_id[i].InstrumentName);
        setExchangeID(instrument_id[i].ExchangeID);
      }
    }
  }, [tmpExchangeID]);
  var dd = [];
  for (let i = 0; i < 300; i++) {
    dd.push({ a: i });
  }
  const [initData, setInitData] = useState([]);
  useEffect(() => {
    getStrategyIDData((error, res) => {
      if (error) {
        message.error(error);
      } else {
        setStrategy_id(res);
      }
    });
    getInstrumentIDData((error, res) => {
      if (error) {
        message.error(error);
      } else {
        setInstrument_id(res);
      }
    });
    getAlgoModuleInfoData((error, res) => {
      if (error) {
        message.error(error);
      } else {
        setAlgo_id(Object.values(res));
      }
    });
    // setData(dd);
    getAlgoOrderStatus((error, res) => {
      if (error) {
        message.error(error);
      } else {
        console.log(res);
        // setData(res);
        setData(res.reverse());
        // setInitData(res);
      }
    });
    const timer = setInterval(() => {
      getAlgoOrderStatus((error, res) => {
        if (error) {
          message.error(error);
        } else {
          setData(res);
        }
      });
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const paginationProps = {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20],
    total: data.length,
    showTotal: (total) => `共${total}条`,
  };
  const inputSearch = (e) => {
    console.log(e.target.value);
    const initData = data;
    const searchData = [];
    for (let i = 0; i < initData.length; i++) {
      if (String(initData[i].StrategyId).indexOf(e.target.value) !== -1) {
        searchData.push(initData[i]);
      } else if (
        String(initData[i].StrategyName).indexOf(e.target.value) !== -1
      ) {
        searchData.push(initData[i]);
      } else if (
        String(initData[i].SkAlgoOrderRef).indexOf(e.target.value) !== -1
      ) {
        searchData.push(initData[i]);
      }
    }
    setData(searchData);
  };
  return (
    <div>
      <div
        className="App"
        style={{
          padding: 0,
          display: "flex",
          overflowY: 100,
          flexDirection: "row",
        }}
      >
        <Card
          style={{
            width: 450,
            minWidth: 450,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {/* <div style={{ maxHeight: 420, overflowY: "auto" }}> */}
          <div>
            <Form
              key={1}
              ref={formRef}
              {...layout}
              layout={"horizontal"}
              onFinish={handleOk}
              labelAlign="right"
              style={{
                // backgroundColor: "red",
                maxHeight: 435,
              }}
            >
              <Form.Item
                label="策略ID"
                shouldUpdate={false}
                name="strategy_id"
                rules={[{ required: true, message: "请选择一个策略" }]}
                style={{ marginBottom: 5 }}
              >
                <Select
                  style={{ width: 210 }}
                  showSearch={true}
                  onChange={investorGet}
                  // onDropdownVisibleChange={getStrategyID}
                >
                  {strategy_id.map(({ StrategyID, StrategyName }, index) =>
                    Children.toArray(
                      <Select.Option value={StrategyID} key={index}>
                        {StrategyID}@{StrategyName}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                label="资金账号"
                name="investor_id"
                shouldUpdate={false}
                rules={[{ required: true, message: "请选择一个资金账号" }]}
                // wrapperCol={{ span: 1 }}
                style={{ marginBottom: 5 }}
              >
                <Select
                  showSearch={true}
                  style={{ width: 210 }}
                  value={investor_id[0]}
                  // onClick={investorGet}
                >
                  {investor_id.map((data, index) =>
                    Children.toArray(
                      <Select.Option value={data} key={index}>
                        {data}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                label="证券代码"
                name="instrument_id"
                shouldUpdate={false}
                rules={[{ required: true, message: "请输入证券代码" }]}
                style={{ marginBottom: 5 }}
              >
                <Select
                  showSearch={true}
                  placeholder=""
                  onChange={getInstrumentName}
                  style={{ width: 210 }}
                  // onDropdownVisibleChange={getInstrumentNameReal}
                >
                  {instrument_id.map(({ InstrumentID }, index) =>
                    Children.toArray(
                      <Select.Option value={InstrumentID} key={index}>
                        {InstrumentID}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>

              {/* <Form.Item
                label="证券名称"
                style={{ marginBottom: 5 }}
                shouldUpdate={false}
              > */}
              {/* {instrumentName} */}
              {/* </Form.Item> */}
              <Form.Item
                shouldUpdate={false}
                label="DockerID"
                name="docker_id"
                style={{ marginBottom: 5 }}
                // labelCol={{ span: 0 }}
                // wrapperCol={{ span: 1 }}
              >
                {/* <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: 240,
                    // marginBottom: 5,
                  }}
                > */}
                {docker_id}
                {/* </p> */}
              </Form.Item>
              <Form.Item
                label="交易所ID"
                shouldUpdate={false}
                name="exchange_id"
                style={{ marginBottom: 5 }}
                // wrapperCol={{ span: 1 }}
                // labelCol={{ span: 0 }}
              >
                {exchangeID}
              </Form.Item>

              <Form.Item
                shouldUpdate={false}
                label="交易方向"
                name="direction"
                rules={[{ required: true }]}
                initialValue={0}
                style={{ marginBottom: 5 }}
                // wrapperCol={{ span: 2 }}
              >
                <Radio.Group
                  name={1}
                  defaultValue={0}
                  style={{ display: "flex" }}
                >
                  <Radio
                    name={1}
                    value={0}
                    style={{ color: "#FF8C00", fontSize: 13 }}
                  >
                    买入
                  </Radio>
                  <Radio
                    name={1}
                    value={1}
                    style={{ color: "#1E90FF", fontSize: 13 }}
                  >
                    卖出
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                shouldUpdate={false}
                label="开平今"
                name="offset"
                rules={[{ required: true }]}
                initialValue={0}
                style={{ marginBottom: 5 }}
              >
                <Radio.Group
                  name={1}
                  defaultValue={0}
                  style={{ display: "flex" }}
                >
                  <Radio
                    name={1}
                    value={0}
                    style={{ color: "#FF8C00", fontSize: 13 }}
                  >
                    开仓
                  </Radio>
                  <Radio
                    name={1}
                    value={1}
                    style={{ color: "#1E90FF", fontSize: 13 }}
                  >
                    平仓
                  </Radio>
                  <Radio
                    name={1}
                    value={2}
                    style={{ color: "#FF69B4", fontSize: 13 }}
                  >
                    平今
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                shouldUpdate={false}
                label="母单股数(股)"
                name="order_vol"
                rules={[{ required: true, message: "请输入母单股数" }]}
                style={{ marginBottom: 5 }}
              >
                <InputNumber
                  min={0}
                  max={100000000000}
                  step={10}
                  onChange={onChange}
                  style={{ width: 210 }}
                />
              </Form.Item>
              <Form.Item
                shouldUpdate={false}
                label="母单股数(股)"
                name="TradePrice"
                style={{ marginBottom: 5 }}
                // labelCol={{ span: 0 }}
              >
                {/* <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: 240,
                    marginBottom: 5,
                  }}
                > */}
                {motherSingleStock}
                {/* </p> */}
              </Form.Item>
              <Form.Item
                shouldUpdate={false}
                label="算法名称"
                name="algo_id"
                rules={[{ required: true, message: "请选择一个算法" }]}
                // wrapperCol={{ span: 1 }}
                style={{ marginBottom: 5 }}
              >
                <Select
                  showSearch={true}
                  placeholder=""
                  style={{ width: 210 }}
                  onSelect={(value) => {
                    if (value === 101) {
                      setShowDivOne("block");
                      setShowDivTwo("none");
                      setShowDivThree("none");
                    } else if (value === 102) {
                      setShowDivOne("none");
                      setShowDivTwo("block");
                      setShowDivThree("none");
                    } else if (value === 103) {
                      setShowDivOne("none");
                      setShowDivTwo("none");
                      setShowDivThree("block");
                    }
                    console.log(value);
                  }}
                  // onDropdownVisibleChange={getAlgoModuleInfo}
                >
                  {algo_id.map(({ AlgoID, AlgoName }, index) =>
                    Children.toArray(
                      <Select.Option value={AlgoID} key={index}>
                        {AlgoID}@{AlgoName}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
              {/* <FormItem style={{ display: "block" }}> */}
              <div style={{ display: `${showDivOne}` }}>
                <Form.Item
                  shouldUpdate={false}
                  label="开始时间"
                  name="TradeStartTime"
                  style={{ marginBottom: 7 }}
                >
                  <Input
                    type="time"
                    step="1"
                    style={{ width: 120 }}
                    format={"HH:mm:ss"}
                  />
                  {/* <TimePicker.RangePicker
                  format={"HH:mm:ss"}
                  style={{ width: 210 }}
                /> */}
                </Form.Item>
                <Form.Item
                  shouldUpdate={false}
                  label="结束时间"
                  name="TradeEndTime"
                  style={{ marginBottom: 7 }}
                >
                  <Input
                    type="time"
                    step="1"
                    style={{ width: 120 }}
                    format={"HH:mm:ss"}
                  />
                  {/* <TimePicker.RangePicker
                  format={"HH:mm:ss"}
                  style={{ width: 210 }}
                /> */}
                </Form.Item>
                <Form.Item
                  shouldUpdate={false}
                  label="尽快成交"
                  initialValue={1}
                  name="switch_ahead"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group defaultValue={1} style={{ display: "flex" }}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div style={{ display: `${showDivTwo}` }}>
                <Form.Item
                  shouldUpdate={false}
                  label="价格"
                  name="price"
                  style={{ marginBottom: 7 }}
                >
                  <InputNumber
                    min={0}
                    max={100000000000}
                    step={0.0001}
                    // onChange={onChange}
                    style={{ width: 210 }}
                  />
                </Form.Item>
                <Form.Item
                  shouldUpdate={false}
                  label="switch_limitpend"
                  initialValue={1}
                  name="switch_limitpend"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group defaultValue={1} style={{ display: "flex" }}>
                    <Radio value={1}>1</Radio>
                    <Radio value={0}>0</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  shouldUpdate={false}
                  label="switch_singleton"
                  initialValue={1}
                  name="switch_singleton"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group defaultValue={1} style={{ display: "flex" }}>
                    <Radio value={1}>1</Radio>
                    <Radio value={0}>0</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  shouldUpdate={false}
                  label=" 超时(毫秒)"
                  name="timeout"
                  style={{ marginBottom: 7 }}
                >
                  <InputNumber
                    min={0}
                    max={100000000000}
                    step={1}
                    // onChange={onChange}
                    style={{ width: 210 }}
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onFinish={handleOk}
                  style={{
                    width: 300,
                    backgroundColor: "#FF8C00",
                    borderRadius: 5,
                    borderColor: "#FF8C00",
                    marginLeft: 40,
                    marginTop: 10,
                  }}
                >
                  交易
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
      <div style={{ padding: 0, marginTop: -8 }}>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            height: 481,
          }}
        >
          <div style={{ marginTop: -9 }}>
            <Button type="primary" style={{ width: 100 }} onClick={showModal}>
              筛选列
            </Button>
            {/* <Input
              style={{ width: 280, marginLeft: 30 }}
              placeholder="搜索（策略ID、策略名称、母单编号）"
              onChange={inputSearch}
            /> */}
            {/* <Button
              disabled={true}
              style={{ marginLeft: 30 }}
              disabled={ifShow}
              onClick={cancelAction}
            >
              批量撤单
            </Button> */}

            <Table
              onRow={(record) => {
                return {
                  onDoubleClick: () => doubleClick(record),
                  onMouseEnter: () => {
                    console.log("object");
                  },
                  onMouseLeave: () => {},
                };
              }}
              scroll={false}
              columns={columns}
              size={"small"}
              pagination={paginationProps}
              bordered={true}
              // onChange={tableChange}
              dataSource={data}
              rowSelection={rowSelectionForTrade}
              scroll={{ x: 2000, y: "calc(100vh - 610px)" }}
              // scroll={{ x: "100vw", y: 300 }}
              style={{
                width: 2100,
              }}
            />
          </div>
        </Card>
      </div>
      <Modal
        visible={visible}
        title="设置"
        onOk={handleModal}
        onCancel={hideModal}
        footer={[
          <Button key="back" onClick={reset} style={{ marginRight: 250 }}>
            重置
          </Button>,
          <Button key="submit" type="primary" onClick={handleModal}>
            确定
          </Button>,
          <Button onClick={hideModal}>取消</Button>,
        ]}
      >
        <DndProvider backend={HTML5Backend}>
          <Table
            pagination={false}
            columns={columnsForDrag}
            dataSource={dataForDrag}
            scroll={{ y: "calc(70vh - 350px)" }}
            components={components}
            onRow={(record, index) => ({
              index,
              moveRow,
            })}
            rowSelection={rowSelection}
          />
        </DndProvider>
      </Modal>
      <Modal
        visible={isVisible}
        title="请核对您的母单委托,无误点击[确定]"
        onOk={handleModalConfirm}
        forceRender={true}
        bodyStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        width={500}
        onCancel={hideModalConfirm}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalConfirm}>
            确定
          </Button>,
          <Button onClick={hideModalConfirm}>取消</Button>,
        ]}
      >
        <Form
          key={2}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 5 }}
          layout={"horizontal"}
          labelAlign="right"
          style={{
            // backgroundColor: "red",
            // maxHeight: 500,
            marginLeft: 90,
          }}
        >
          <Form.Item
            label="策略ID"
            style={{ marginBottom: 5 }}
            // wrapperCol={{ span: 1 }}
            // labelCol={{ span: 0 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {celueID}
            </p>
          </Form.Item>
          <Form.Item label="资金账号" style={{ marginBottom: 5 }}>
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {zijinzhanghao}
            </p>
          </Form.Item>
          <Form.Item
            label="DockerID"
            name="docker_id"
            style={{ marginBottom: 5 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {docker_id}
            </p>
          </Form.Item>
          <Form.Item
            label="证券代码"
            style={{ marginBottom: 5 }}
            // wrapperCol={{ span: 1 }}
            // labelCol={{ span: 0 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {zhengquandaima}
            </p>
          </Form.Item>
          {/* <Form.Item
            label="证券名称"
            style={{ marginBottom: 5 }}
            // wrapperCol={{ span: 1 }}
            // labelCol={{ span: 0 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {instrumentName}
            </p>
          </Form.Item> */}
          <Form.Item
            label="算法名称"
            style={{ marginBottom: 5 }}
            // wrapperCol={{ span: 1 }}
            // labelCol={{ span: 0 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {suanfamingcheng}
            </p>
          </Form.Item>
          <Form.Item
            label="交易方向"
            style={{ marginBottom: 5 }}
            // wrapperCol={{ span: 1 }}
            // labelCol={{ span: 0 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {jiaoyifangxiang}
            </p>
          </Form.Item>
          <Form.Item
            label="开平今"
            style={{ marginBottom: 5 }}
            // wrapperCol={{ span: 1 }}
            // labelCol={{ span: 0 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {kaijinping}
            </p>
          </Form.Item>
          <Form.Item
            label="母单数量"
            style={{ marginBottom: 5 }}
            // wrapperCol={{ span: 1 }}
            // labelCol={{ span: 0 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {motherSingleStock}
            </p>
          </Form.Item>
          {/* <Form.Item
            label="开始时间"
            name="TradePrice"
            style={{ marginBottom: 5 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {startTime}
            </p>
          </Form.Item>
          <Form.Item
            label="结束时间"
            style={{ marginBottom: 5 }}
            // wrapperCol={{ span: 1 }}
            // labelCol={{ span: 0 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {endTime}
            </p>
          </Form.Item>
          <Form.Item
            label="尽快成交"
            style={{ marginBottom: 5 }}
            // wrapperCol={{ span: 1 }}
            // labelCol={{ span: 0 }}
          >
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                width: 240,
                marginBottom: 5,
                fontWeight: "bold",
                color: "red",
              }}
            >
              {ifSoon}
            </p>
          </Form.Item> */}
        </Form>
      </Modal>
      <Modal
        visible={isVisibleDelete}
        title="交易撤单"
        onOk={handleModalDelete}
        bodyStyle={{
          display: "flex",
          justifyContent: "center",
        }}
        width={500}
        onCancel={hideModalDelete}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalDelete}>
            是
          </Button>,
          <Button onClick={hideModalDelete}>否</Button>,
        ]}
      >
        是否撤回母单编号为{mudanbianhao}的单子？
      </Modal>
    </div>
  );
}

export default App;
