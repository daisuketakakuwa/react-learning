import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, within } from 'storybook/test';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    args: {
        onClose: fn(),
        isOpen: true,
        children: <div>モーダルの内容</div>,
    },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CloseModal: Story = {
    args: {
        onClose: fn(),
    },
    play: async ({ args, userEvent }) => {
        // #__next の div を取得
        const modalElement = document.getElementsByClassName('ReactModalPortal')[0];
        if (!modalElement) throw new Error('ReactModalPortal not found in DOM');

        // モーダルのDOMを取得する
        const modalCanvas = within(modalElement as HTMLElement);
        const closeButton = modalCanvas.getByRole('button', { name: '閉じる' });

        // ボタンをクリック
        await userEvent.click(closeButton);

        // アサーション
        expect(args.onClose).toHaveBeenCalled();
    },
};
