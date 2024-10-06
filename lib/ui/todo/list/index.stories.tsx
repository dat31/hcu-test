import type { Meta, StoryObj } from "@storybook/react";

import TodoList from "./index";
import { FilterStatus } from "@/lib/model";
import { Suspense } from "react";

const meta = {
  title: "TodoList",
  component: TodoList,
  args: { filter: { status: FilterStatus.ALL } },
  decorators: (Story) => (
    <Suspense>
      <Story />
    </Suspense>
  ),
} satisfies Meta<typeof TodoList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Completed: Story = {
  args: { filter: { status: FilterStatus.COMPLETED } },
};
export const Incomplete: Story = {
  args: { filter: { status: FilterStatus.INCOMPLETE } },
};
