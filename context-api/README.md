# What is Context API

- Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
- 親 Component 配下にある全ての Component より**props を使わずに**情報を参照させる。

https://react.dev/learn/passing-data-deeply-with-context

# 登場人物

Context：情報を一元的に管理する**1Component**。Context を参照したい Component を子 Component に配置する。<br>
Reducer：**複数の状態を管理できる** useState のようなもの。<br><br>

```ts
// 親Component
//  - Contextオブジェクトは 子Componentから参照できるように。
export const Context = createContext({} as DataStoreContext);

const ContextProvider: React.FC = (props): JSX.Element => {
  // 複数状態管理できるuseReducerをCall
  const [state, dispatch] = useReducer(reducer, initState);
  // useReducerで生成した state, dispatch をContextに登録
  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

export default ContextProvider;

// 子Component
const Hoge = () => {
  const { state } = useContext(Context);
};
```

## useState と useReducer

|                          | useState         | useReducer                  |
| ------------------------ | ---------------- | --------------------------- |
| Mount/Unmount 時に状態が | リセットされる。 | リセットされない。          |
| 状態を更新するには       | setXxx()関数     | dispatch にパラメータ渡す。 |

setXxx()で更新後の値を１つ渡すのに対して、dispatch は更新内容を actionCreator で複雑に定義できる 👍
