import React from "react";
import { withState } from "recompose";

// 1. withState() で enhancer作成
const enhancer = withState("count", "setCount", 0);

const HomePage = ({ count, setCount }) => {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <p>
        <button onClick={() => setCount(count + 1)}>CountUP</button>
      </p>
      <p>COUNT: {count}</p>
    </div>
  );
};

export default enhancer(HomePage);
