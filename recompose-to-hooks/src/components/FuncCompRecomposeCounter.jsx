import React from 'react';
import { compose, withState, withHandlers, lifecycle } from 'recompose';

// ★props に HOCで付与された関数が渡される。
const FuncCompRecomposeCounter = ({ count, name, setName, incrementCount }) => (
    <div>
        <p>Count: {count}</p>
        <button onClick={incrementCount}>Increment</button>
        <p>Name: {name}</p>
        <p><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></p>
    </div>
);

// 1. compose(...functions) -> ComponentEnhancerを返す。
// 2. ComponentEnhancer(HogeComp) -> HogeCompに状態管理用の関数 などを propsで連携する👍
export default compose(
    // ★useStateに該当
    withState('count', 'setCount', 0),
    withState('name', 'setName', "Default name"),
    // withStateで生成したsetXxxxを利用して新たな関数を定義できる。
    withHandlers({
        // propsでsetXxxxを参照できる。
        incrementCount: ({ setCount }) => () => {
            setCount(count => count + 1);
        }
    }),
    // ★useEffectに該当
    lifecycle({
        componentDidMount() {
            // this.props経由で withState, withHandlers で生成した関数を参照
            this.props.setCount(11);
            this.props.incrementCount();
        }
    })

)(FuncCompRecomposeCounter);
