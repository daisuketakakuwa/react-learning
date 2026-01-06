import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormErrorMessage, PageTitle, Typography } from './Typography';

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --------------------------
// size と fontWeight の全バリエーションを確認する Story
// --------------------------
export const Default: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Size: base</h3>
            <Typography size="base" fontWeight="thin">
                Sample Text - base / thin
            </Typography>
            <Typography size="base" fontWeight="extraLight">
                Sample Text - base / extraLight
            </Typography>
            <Typography size="base" fontWeight="light">
                Sample Text - base / light
            </Typography>
            <Typography size="base" fontWeight="normal">
                Sample Text - base / normal
            </Typography>
            <Typography size="base" fontWeight="medium">
                Sample Text - base / medium
            </Typography>
            <Typography size="base" fontWeight="semibold">
                Sample Text - base / semibold
            </Typography>
            <Typography size="base" fontWeight="bold">
                Sample Text - base / bold
            </Typography>
            <Typography size="base" fontWeight="extraBold">
                Sample Text - base / extraBold
            </Typography>

            <h3>Size: sm</h3>
            <Typography size="sm" fontWeight="thin">
                Sample Text - sm / thin
            </Typography>
            <Typography size="sm" fontWeight="extraLight">
                Sample Text - sm / extraLight
            </Typography>
            <Typography size="sm" fontWeight="light">
                Sample Text - sm / light
            </Typography>
            <Typography size="sm" fontWeight="normal">
                Sample Text - sm / normal
            </Typography>
            <Typography size="sm" fontWeight="medium">
                Sample Text - sm / medium
            </Typography>
            <Typography size="sm" fontWeight="semibold">
                Sample Text - sm / semibold
            </Typography>
            <Typography size="sm" fontWeight="bold">
                Sample Text - sm / bold
            </Typography>
            <Typography size="sm" fontWeight="extraBold">
                Sample Text - sm / extraBold
            </Typography>

            <h3>Size: md</h3>
            <Typography size="md" fontWeight="thin">
                Sample Text - md / thin
            </Typography>
            <Typography size="md" fontWeight="extraLight">
                Sample Text - md / extraLight
            </Typography>
            <Typography size="md" fontWeight="light">
                Sample Text - md / light
            </Typography>
            <Typography size="md" fontWeight="normal">
                Sample Text - md / normal
            </Typography>
            <Typography size="md" fontWeight="medium">
                Sample Text - md / medium
            </Typography>
            <Typography size="md" fontWeight="semibold">
                Sample Text - md / semibold
            </Typography>
            <Typography size="md" fontWeight="bold">
                Sample Text - md / bold
            </Typography>
            <Typography size="md" fontWeight="extraBold">
                Sample Text - md / extraBold
            </Typography>

            <h3>Size: lg</h3>
            <Typography size="lg" fontWeight="thin">
                Sample Text - lg / thin
            </Typography>
            <Typography size="lg" fontWeight="extraLight">
                Sample Text - lg / extraLight
            </Typography>
            <Typography size="lg" fontWeight="light">
                Sample Text - lg / light
            </Typography>
            <Typography size="lg" fontWeight="normal">
                Sample Text - lg / normal
            </Typography>
            <Typography size="lg" fontWeight="medium">
                Sample Text - lg / medium
            </Typography>
            <Typography size="lg" fontWeight="semibold">
                Sample Text - lg / semibold
            </Typography>
            <Typography size="lg" fontWeight="bold">
                Sample Text - lg / bold
            </Typography>
            <Typography size="lg" fontWeight="extraBold">
                Sample Text - lg / extraBold
            </Typography>

            <h3>Size: xl</h3>
            <Typography size="xl" fontWeight="thin">
                Sample Text - xl / thin
            </Typography>
            <Typography size="xl" fontWeight="extraLight">
                Sample Text - xl / extraLight
            </Typography>
            <Typography size="xl" fontWeight="light">
                Sample Text - xl / light
            </Typography>
            <Typography size="xl" fontWeight="normal">
                Sample Text - xl / normal
            </Typography>
            <Typography size="xl" fontWeight="medium">
                Sample Text - xl / medium
            </Typography>
            <Typography size="xl" fontWeight="semibold">
                Sample Text - xl / semibold
            </Typography>
            <Typography size="xl" fontWeight="bold">
                Sample Text - xl / bold
            </Typography>
            <Typography size="xl" fontWeight="extraBold">
                Sample Text - xl / extraBold
            </Typography>

            <h3>Size: 2xl</h3>
            <Typography size="2xl" fontWeight="thin">
                Sample Text - 2xl / thin
            </Typography>
            <Typography size="2xl" fontWeight="extraLight">
                Sample Text - 2xl / extraLight
            </Typography>
            <Typography size="2xl" fontWeight="light">
                Sample Text - 2xl / light
            </Typography>
            <Typography size="2xl" fontWeight="normal">
                Sample Text - 2xl / normal
            </Typography>
            <Typography size="2xl" fontWeight="medium">
                Sample Text - 2xl / medium
            </Typography>
            <Typography size="2xl" fontWeight="semibold">
                Sample Text - 2xl / semibold
            </Typography>
            <Typography size="2xl" fontWeight="bold">
                Sample Text - 2xl / bold
            </Typography>
            <Typography size="2xl" fontWeight="extraBold">
                Sample Text - 2xl / extraBold
            </Typography>

            <h3>Size: 3xl</h3>
            <Typography size="3xl" fontWeight="thin">
                Sample Text - 3xl / thin
            </Typography>
            <Typography size="3xl" fontWeight="extraLight">
                Sample Text - 3xl / extraLight
            </Typography>
            <Typography size="3xl" fontWeight="light">
                Sample Text - 3xl / light
            </Typography>
            <Typography size="3xl" fontWeight="normal">
                Sample Text - 3xl / normal
            </Typography>
            <Typography size="3xl" fontWeight="medium">
                Sample Text - 3xl / medium
            </Typography>
            <Typography size="3xl" fontWeight="semibold">
                Sample Text - 3xl / semibold
            </Typography>
            <Typography size="3xl" fontWeight="bold">
                Sample Text - 3xl / bold
            </Typography>
            <Typography size="3xl" fontWeight="extraBold">
                Sample Text - 3xl / extraBold
            </Typography>
        </div>
    ),
};

// --------------------------
// PageTitle の Story
// --------------------------
export const Title: Story = {
    render: () => <PageTitle>ページタイトル Example</PageTitle>,
};

// --------------------------
// FormErrorMessage の Story
// --------------------------
export const ErrorMessage: Story = {
    render: () => <FormErrorMessage>入力エラーです</FormErrorMessage>,
};
