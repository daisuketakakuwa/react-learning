import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import EditFriendNameModal from './EditFriendNameModal';

const meta: Meta<typeof EditFriendNameModal> = {
    title: 'Components/EditFriendNameModal',
    component: EditFriendNameModal,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => <EditFriendNameModal {...args} />,
    args: {
        isOpen: true,
        friendUserId: 'user-123',
        defaultDisplayName: 'Default Name',
        currentDisplayName: 'Current Name',
        onClose: fn(),
    },
};

export const Interaction: Story = {
    render: (args) => <EditFriendNameModal {...args} />,
    args: {
        isOpen: true,
        friendUserId: 'user-123',
        defaultDisplayName: 'Default Name',
        currentDisplayName: 'Current Name',
        onClose: fn(),
    },
    play: async ({ canvasElement, args }) => {
        const modalElement = document.getElementsByClassName('ReactModalPortal')[0];
        if (!modalElement) throw new Error('ReactModalPortal not found in DOM');

        // モーダルのDOMを取得する
        const modalCanvas = within(modalElement as HTMLElement);

        // TextInput を取得
        const input = modalCanvas.getByPlaceholderText('Default Name') as HTMLInputElement;
        const button = modalCanvas.getByRole('button', { name: '更新する' });

        // 空入力でボタンをクリック → バリデーションメッセージが表示される
        await userEvent.clear(input);
        await userEvent.click(button);
        const errorMsg = modalCanvas.getByText('１文字以上入力してください。');
        expect(errorMsg).toBeVisible();

        // 正しい入力をしてクリック
        await userEvent.type(input, 'Alice');
        await userEvent.click(button);
    },
};
