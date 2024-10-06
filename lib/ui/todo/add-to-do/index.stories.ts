import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import AddTodo from "./index";

const meta = {
  title: "AddTodo",
  component: AddTodo,
  parameters: {
    layout: "centered",
  },

  args: { onSubmit: fn() },
} satisfies Meta<typeof AddTodo>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
