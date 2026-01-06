import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within, userEvent, fn } from 'storybook/test';
import React, { useState } from 'react';

import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
    title: 'Components/TextInput',
    component: TextInput,
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
const ControlledTextInput = (props: { initialValue?: string; placeholder?: string }) => {
    const [value, setValue] = useState(props.initialValue || '');
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    return <TextInput value={value} onInput={handleInput} placeholder={props.placeholder || 'Type here...'} />;
};

// --------------------------
// Stories
// --------------------------
export const Default: Story = {
    render: () => <ControlledTextInput />,
};

// ユーザーが入力できるかテスト
export const UserTyping: Story = {
    render: () => <ControlledTextInput />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText('Type here...') as HTMLInputElement;

        await userEvent.type(input, 'Hello Storybook');

        expect(input.value).toBe('Hello Storybook');
    },
};
