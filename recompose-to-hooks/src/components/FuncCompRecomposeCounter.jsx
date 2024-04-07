import React from 'react';
import PropTypes from "prop-types";
import { compose, withState, withHandlers, lifecycle, setPropTypes } from 'recompose';

const FuncCompRecomposeCounter = ({
    // HOCで付与されたprops
    count, name, setName, incrementCount
}) => (
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
            // this.props経由で withState, withHandlers で生成した関数 や 親コンポーネントから渡したpropsを参照
            this.props.setCount(this.props.defaultCount);
            this.props.incrementCount();
        }
    }),
    // prop-typesパッケージ で型チェック。
    // - 定義した型に違反している場合は、BrowserのコンソールにWarningメッセージが出るのみ。
    // - ★HOCだけでなく 親コンポーネントから渡すpropsの定義もここでできるってことか。
    setPropTypes({
        // countは「number」型である「必須」である。
        count: PropTypes.number.isRequired,
    }),

)(FuncCompRecomposeCounter);
