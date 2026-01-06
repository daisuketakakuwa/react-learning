import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within, userEvent, fn } from 'storybook/test';
import React, { useState } from 'react';

import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Components/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --------------------------
// 制御コンポーネントのラッパー
// --------------------------
const ControlledTextarea = (props: { initialValue?: string }) => {
    const [value, setValue] = useState(props.initialValue || '');
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value);
    };
    return <Textarea value={value} onInput={handleInput} placeholder="Type here..." />;
};

// --------------------------
// Stories
// --------------------------
export const Default: Story = {
    render: () => <ControlledTextarea />,
};

// ユーザー入力をテスト
export const UserTyping: Story = {
    render: () => <ControlledTextarea />,
    play: async ({ canvasElement }) => {
        // canvas 内の textarea を取得
        const canvas = within(canvasElement);
        const textarea = canvas.getByPlaceholderText('Type here...') as HTMLTextAreaElement;

        // 入力操作
        await userEvent.type(textarea, 'Hello Storybookaaaaaaa\nbbbbbbb\nccccccc');

        // アサーション
        expect(textarea.value).toBe('Hello Storybookaaaaaaa\nbbbbbbb\nccccccc');
    },
};
