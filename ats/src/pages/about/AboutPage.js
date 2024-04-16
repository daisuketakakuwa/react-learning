import React from "react";
import { compose, lifecycle, mapProps, withHandlers, withStateHandlers } from "recompose";

const initialState = {
  name: "unknown",
  age: 99,
  isInvalid: false,
};

// ★HOCの順番が重要、前のHOCからpropsを受け取って次のHOCは処理を行う。
const enhancer = compose(
  // stateを定義＆更新するためのHOC
  withStateHandlers(
    // arg1 stateオブジェクトの初期値を定義　初期状態を示す①オブジェクト②オブジェクトを返す関数
    () => initialState,
    // arg2 stateオブジェクトを更新する関数
    {
      setName: (state) => (name) => ({ ...state, name }),
      setAge: (state) => (age) => ({ ...state, age }),
      setIsInvalid: (state) => () => ({ ...state, isInvalid }),
      resetAll: (state) => () => ({ ...initialState }),
    }
  ),
  // 単純に関数を定義するHOC ※propsで↑のstateHandler定義の関数を使ってもOK
  withHandlers({
    mountHello: () => () => {
      alert("hello");
    },
    unmountHello: () => () => {
      alert("see ya then");
    },
  }),
  // propsの変換/追加。Javaのmap関数的な役割。
  mapProps((props) => ({
    ...props,
    // 10文字以上だったら切り捨て
    name: props.name.substring(0, 10),
  })),
  // useEffectに該当。
  lifecycle({
    componentDidMount() {
      this.props.mountHello();
    },
    // props, state が変更された場合に動作
    componentDidUpdate() {
      console.log("state/props changed");
    },
    componentWillUnmount() {
      this.props.unmountHello();
    },
  })
);

const AboutPage = (props) => {
  const { name, age, isInvalid, setName, setAge, resetAll } = props;
  return (
    <div>
      <h1>About Page</h1>
      <p>
        NAME: <input value={name} onChange={(e) => setName(e.target.value)} />
      </p>
      <p>
        AGE: <input value={age} onChange={(e) => setAge(e.target.value)} />
      </p>
      <p>
        <button onClick={resetAll}>Reset all values</button>
      </p>
      <br />
      <p>Confirmation</p>
      <p>・NAME: {name}</p>
      <p>・AGE: {age}</p>
      <br />
      <p>
        Validation Result: <span style={{ color: isInvalid ? "red" : "blue", fontWeight: "bold" }}>{isInvalid ? "NG" : "OK"}</span>
      </p>
    </div>
  );
};

export default enhancer(AboutPage);
