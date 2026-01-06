# Storybook の使い方

-   公式：[Story の書き方](https://storybook.js.org/docs/writing-stories#component-story-format) を参照する。
    -   [Component Story Format(CSF)](https://storybook.js.org/docs/writing-stories#component-story-format) に沿って Story を書く。
    -   Story のタイトル/対象のコンポーネントを定義する**Meta 情報** を Default エクスポートする。

## 初期設定（`create-storybook`コマンドでいい感じに）
- 📝10系×Viteだと不安定だった。
- 📝9系×Viteでセットアップする。
```
npx storybook@9 init
```

## Storybook関連のライブラリ

### 本体

- `storybook`：本体

- `@storybook/nextjs-vite`
    -  **Next.js用フレームワークパッケージ**。↓すべてを一括でインストール👍
        - React用Storybook(`@storybook/react`)
        - Next.jsに必要な追加設定
        - Viteビルダー(`storybook/builder-vite`)
            - 旧Storybook(~V6)までは、Webpackビルダー(`storybook/builder-webpack5`)が主流だった。
            - 新Storybook(V7~）は、Viteビルダーが主流になりつつある。

### 拡張機能(プラグイン)
- MUSTな拡張機能
    - `@storybook/addon-essentials`（基本機能セット）
- WANTな拡張機能
    - `@storybook/addon-a11y`（アクセシビリティチェック）
    - `@storybook/addon-links`（ストーリー遷移）
    - `@storybook/addon-docs`（Doc拡張、ただし`essentials`に含まれる）
    - `@storybook/addon-interactions`（play関数を使わないなら不要）**※これはcore機能に包含されている**
    - `@chromatic-com/storybook`（Chromatic Cloud上でUI差分テストをしないなら不要）

### ✅✅✅Storybook8系⇒9系の大きな変更点✅✅✅
結局これでOK◎
```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
// DOM 操作・アサーション
import { fn, expect, within } from 'storybook/test';
```
こっちじゃない...
```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
// DOM 操作
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
// アサーション
import { expect, vi } from 'vitest';
```

#### 1. テストランナーが Jest → Vitest に変わった
- Vitest は Node.js 上でも動くし、Playwright と組み合わせてブラウザ上でもテスト可能
- Storybook の play 関数と自然に連携できるようになった
#### 2. DOM が仮想 → 実ブラウザに
- Storybook の canvas にレンダリングされるコンポーネントを操作・アサーションできる
- CSS やブラウザ挙動も考慮できる（より「本番に近い」テストが可能）
### 3. 旧パッケージの廃止
- `@storybook/jest` / `@storybook/testing-library` は Storybook 8 向け
- Storybook9系では、play関数 + Vitest + Playwright が公式推奨の自動テスト方法
### ※8系までの考え方※ テスト関連のライブラリ
#### アサーション
- ◎ `@storybook/jest`
  - jest単体だと、画面(DOM)操作だけでなくサーバJSに対する操作もできる。
  - `@storybook/jest`は、画面(DOM)操作【play関数でのテスト】に特化したexpect関数 だけを提供する（**テストランナー機能はもたない**）
- △ `storybook/test`
  - [V9系の公式Doc｜Play関数の書き方](https://storybook.js.org/docs/9/writing-stories/play-function)に記載されている。
  - 公式に書いてあるけど、`storybook/test`は「npm 内で独立したパッケージ」として存在しているわけではないので安定性としては△。
- △ `@storybook/test`
  - @storybook/testの最新バージョンは9系以降に対応していない。

#### DOM操作
- ◎ `@storybook/testing-library`
  - **Storybookは「実際のブラウザ上でコンポーネントをレンダリング」する。**
  - `canvasElement`とは「Storybookがレンダリングしたコンポーネントをラップして表示しているDOM要素」のこと。
- ※ `@testing-library/react`
  - Jest/Vitest上でReactコンポーネントをテストする場合のDOM操作で使う。
  - **Jestは「テスト専用の仮想DOM」で完結。**
- △ `storybook/test`
  - [V9系の公式Doc｜Play関数の書き方](https://storybook.js.org/docs/9/writing-stories/play-function)に記載されている。
  - 公式に書いてあるけど、`storybook/test`は「npm 内で独立したパッケージ」として存在しているわけではないので安定性としては△。

## テスト

## Storybookの設定ファイル
- `.storybook/main.ts`：ビルド設定。拡張機能の設定とかはここ。
- `.storybook/preview.tsx`：StorybookUI で 全ストーリーに共通で適用する設定を書く。

## Storyの種類
1. arg だけのストーリー（標準ストーリー）
2. render を書いたストーリー（カスタムレンダリング）
3. play を書いたストーリー（UI自動テスト）
4. decorators を書いたストーリー

### Story パターン１：arg だけのストーリー（標準ストーリー）

```tsx
export const Primary: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};
```

👉 これは Storybook の「標準的な書き方」

-   このストーリーは **デフォルトレンダリング（Meta で指定された component で `<Xxxx {...arg}>`）** を使います

\_\_つまり、Meta 内に `component: Button` がある場合のみ 動作します。

### Story パターン２：render を書いたストーリー（カスタムレンダリング）

```tsx
export const PrimaryInAlert: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
    render: (args) => <Button {...args} />,
};
```

デフォルトレンダリングとの違い

-   render を定義した瞬間、ストーリーの描画方法は完全にこの関数に委ねられる。
-   **Meta の component は参照されない。**

つまり、↓ のように好きなラッパー（Alert、Provider、Theme など）を追加できる 👉

```tsx
render: (args) => (
    <Alert>
        <Button {...args} />
    </Alert>
);
```

### Meta には、他にも定義できる（args, parameters）

#### Meta の `args` とは？

```tsx
const meta = {
    component: Button,
    args: {
        primary: true,
    },
} satisfies Meta<typeof Button>;
```

✅ 全ストーリーで `primary: true` がデフォルトとして適用される。<br>
✅ 各ストーリーで上書きが可能。
<br><br>

#### Meta の `parameters` とは？
👉役割１：UI設定に関するもの。<br>
👉役割２：コンポーネントの挙動（APIリクエストをMSWでインターセプトするか等）

```tsx
// UserList.stories.ts の場合
import { http, HttpResponse } from 'msw';

export const Default = () => <UserList />;

Default.parameters = {
  layout: 'centered',
  // msw-storybook-addonで追加されるフィールドでMockAPIの挙動設定
  msw: {
    handlers: [
      http.get('/api/users', () =>
        HttpResponse.json([{ id: 1, name: 'Alice' }])
      ),
    ],
  },
};
```

### Story パターン３：play を書いたストーリー（UI 自動テスト）

```tsx
export const ClickedButton: Story = {
    args: {
        variant: 'primary',
        children: 'HELLO',
    },
    play: async ({ args, canvasElement, userEvent }) => {
        // Storybookのcanvas要素@ブラウザ上 を特定する
        const canvas = within(canvasElement);

        // canvas要素を対象に、Buttonコンポーネントを操作する
        await userEvent.click(canvas.getByRole('button'));

        // アサーション
        expect(args.onClick).toHaveBeenCalled();
    },
};
```

🤖 **「UI 自動操作**」を書く機能。

-   play 関数 × アサーション機能 で【**Interaction Testing（UI 自動テスト）**】を書く。
-   フォーム入力、ボタンのクリック、Modal の開閉...などの**動的なユーザー操作**を自動実行する。
-   テストの実行方法
    -   「Interactions」タブで実行ステップを確認できる。
    -   `storybook test`コマンドで実行できる。

テストが成功する例
<img width="2718" height="712" alt="image" src="https://github.com/user-attachments/assets/647032f4-dc69-4ba0-b7eb-b71a799f8ca2" />

テストが失敗する例
<img width="2714" height="896" alt="image" src="https://github.com/user-attachments/assets/5c1c1f96-aad3-4ec9-a5e9-e6b64948f6fd" />


### Story パターン４：decorators を書いたストーリー

```tsx
const meta = {
    component: JobofferAndTypePicker,
    decorators: [
        (Story) => (
            <Dialog open={open} ariaLabel="対象求人を変更して判定">
                <DialogHeader text="対象求人を変更して判定">
                    <Story />
                </DialogHeader>
            </Dialog>
        ),
    ],
};
```

Story のラッパーとなる定義。
