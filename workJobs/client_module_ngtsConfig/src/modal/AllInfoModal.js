import React, { useState, useEffect } from "react";
import { Modal } from "antd";

function AllInfoModal(temp) {
  const [a, setA] = useState("sakura");

  useEffect(() => {
    console.log("object");
    setA("kkk");
  }, [temp]);

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={temp.temp}
        onOk={temp.handleOk}
        onCancel={temp.handleCancel}
      >
        <p>{a}</p>
      </Modal>
    </div>
  );
}

export default AllInfoModal;
