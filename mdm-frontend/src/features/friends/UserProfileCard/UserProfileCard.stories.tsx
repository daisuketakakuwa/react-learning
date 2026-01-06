import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn } from 'storybook/test';
import { UserProfileCard } from './UserProfileCard';

/* =========================
   モック
========================= */
const mockFriend = {
    userId: 'friend-001',
    email: 'friend@example.com',
    orgName: 'Example Org',
    defaultDisplayName: 'Default Name',
    displayName: 'Alice',
    profileImgUrl: '/img/user-icon.png',
    freeComment: 'Hello!',
    unreadCount: 5,
    lastMessage: 'Hi',
    lastMessageSendDate: '2025-01-01',
    lastMessageSendTime: '10:00',
};

/* =========================
   Meta
========================= */
const meta: Meta<typeof UserProfileCard> = {
    title: 'Components/UserProfileCard',
    component: UserProfileCard,
    args: {
        friend: mockFriend,
        onClickEditNameIcon: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* =========================
   Interaction Story
========================= */
export const Interaction: Story = {
    play: async ({ args, canvasElement, userEvent }) => {
        /**
         * 編集アイコンをクリック
         *    - onClickEditNameIcon は呼ばれる
         *    - pushTo は呼ばれない（stopPropagation）
         */
        const editIcon = canvasElement.querySelector('[class*="editNameIcon"]') as HTMLElement;
        await userEvent.click(editIcon);

        expect(args.onClickEditNameIcon).toHaveBeenCalled();
    },
};
