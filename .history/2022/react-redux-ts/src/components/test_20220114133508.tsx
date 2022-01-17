import { useSelector } from "react-redux";
import { State } from "../state";

function Test() {
  const amount = useSelector((state: State) => state.bank);
  return (
    <div>
      <p>here is a number from redux</p>
      <p>{amount}</p>
    </div>
  );
}

export default Test;
