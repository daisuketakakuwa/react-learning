// UAスタイル(ブラウザのデフォルトCSS)をリセットする
import 'the-new-css-reset/css/reset.css';

import type { Preview } from '@storybook/nextjs-vite';

import '@/styles/variables.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
