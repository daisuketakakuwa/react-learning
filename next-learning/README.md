## このプロジェクトで学ぶこと

以下について自分の言葉で説明＆コーディングできるようにしたい。

- Next.js@12 までの定番 `Next.js × tRPC × PagesRouterのAPIRoutes`
- Next.js@13 からの定番 `Next.js × tRPC × AppRouterのRouteHandlers`

## 各モジュールの役割

```
APIクライアント ⇒ BFF【Controller ... 外部APIコール】⇒ 外部API
```

↓ 各モジュールについて見ていく。

### **API クライアント**

axios 単体で使うパターンはもちろん、ここに `react-query` と `@trpc/next` が絡んでくる。

#### **react-query（API クライアントの補助）**

`react-query`なしだと、状態管理（`loading/error/data/caching`）を全て自前実装する必要あり。

```js
// Without React Query
import { useEffect, useState } from "react";

type Todo = { id: number; title: string; completed: boolean };

export function Todos() {
  const [data, setData] = useState<Todo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

`react-query`ありだと、状態管理（`loading/error/data/caching`）周りをイイ感じにやってくれる。

```js
// With React Query
import { useQuery } from "@tanstack/react-query";

type Todo = { id: number, title: string, completed: boolean };

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  return res.json();
}

export function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

更新系（`POST/PUT/DELETE`）は、`mutation`(変化/変更)という"更新系フック"を使う。

```js
import { useMutation } from "@tanstack/react-query";

async function addTodo(title: string) {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export function AddTodo() {
  const mutation = useMutation({
    mutationFn: addTodo, // 実行する関数
  });

  return (
    <div>
      <button onClick={() => mutation.mutate("新しいタスク")}>Add Todo</button>

      {mutation.isPending && <p>送信中...</p>}
      {mutation.error instanceof Error && <p>エラー: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>成功！ID: {mutation.data.id}</p>}
    </div>
  );
}
```

#### **@trpc/next とは**

- RPC（Remote **Procedure** Call）とは
  - ✖ REST のように「/api/add?a=1&b=2」を叩く
  - ◎ 別のコンピュータにある関数（procedure）を、あたかもローカル関数のように呼び出す仕組み
  - 👉RPC は「**概念**」であり、↓tRPC は「**RPC の実装の１つ**」。他にも gRPC とか仲間いる。
- tRPC とは
  - TypeScript × RPC のライブラリ
  - API の型定義とクライアントの型推論が 自動で一致 するのが最大の特徴
  - 👉**`[client] --(HTTP/1.1 + JSON)--> [server]`**で実現。
- @trpc/next とは
  - ↑tRPC を Next.js に統合するための公式パッケージ
  - 土台(`Next.jsのAPIRoutes/RouterHandlers`)に、tRPC を載せる。

#### **@trpc/next で、サーバ側にある関数（RemoteProcedure）を Call する流れ**

① サーバ側で、エンドポイントに該当する関数（RemoteProcedure）を定義。<br>
② ①(AppRouter)を用いて、サーバ側で API 公開（`createNextApiHandler`関数）<br>
③ ①(AppRouter)を、クライアントコード側でも参照して、関数を呼び出す（`createTRPCNext`関数）

### **BFF 層**

#### **BFF 層** > Controller 部分

#### **BFF 層** > 外部 API コール

### 外部 API

Java/Kotlin などで実装。割愛。
