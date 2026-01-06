import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn, expect, within } from 'storybook/test';

import { MenuLinkCard } from './MenuLinkCard';

const meta: Meta<typeof MenuLinkCard> = {
    title: 'Components/MenuLinkCard',
    component: MenuLinkCard,
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
        children: 'Primary Link',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary Link',
    },
};

export const ClickedCard: Story = {
    args: {
        variant: 'primary',
        children: 'Click Me',
        onClick: fn(),
    },
    play: async ({ args, canvasElement, userEvent }) => {
        // Storybook 上の canvas 要素を特定
        const canvas = within(canvasElement);

        // div をクリックする
        await userEvent.click(canvas.getByText('Click Me'));

        // アサーション：onClick が呼ばれたか確認
        expect(args.onClick).toHaveBeenCalled();
    },
};
