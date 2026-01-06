import { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
    title: 'Components/Snackbar',
    component: Snackbar,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Success: Story = {
    args: {
        open: true,
        type: 'success',
        message: '正常に処理が完了\nしましたしましたしましたしましたしました。',
    },
};

export const Error: Story = {
    args: {
        open: true,
        type: 'error',
        message: '内部エラーが発生しました。',
    },
};
