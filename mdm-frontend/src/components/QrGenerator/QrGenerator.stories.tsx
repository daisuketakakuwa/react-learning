import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { QrGenerator } from './QrGenerator';

const meta: Meta<typeof QrGenerator> = {
    title: 'Components/QrGenerator',
    component: QrGenerator,
    args: {
        value: 'https://example.com',
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 通常表示
export const Default: Story = {
    args: {
        value: 'https://example.com',
    },
};

// value が空のとき何も表示されない Story
export const EmptyValue: Story = {
    args: {
        value: '',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        // QRコードは描画されていないことを確認
        expect(canvas.queryByRole('svg')).toBeNull();
    },
};
