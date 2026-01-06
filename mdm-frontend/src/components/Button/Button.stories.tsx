import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn, expect, within } from 'storybook/test';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    args: {
        onClick: fn(),
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'HELLO',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'HELLO',
    },
};

export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
        children: 'HELLO',
    },
};

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
