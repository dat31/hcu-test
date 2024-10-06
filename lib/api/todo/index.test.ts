import { addTodo, getAllTodo } from ".";
import { FilterStatus } from "@/lib/model";
import { clearAllMocks } from "@storybook/test";
import { revalidatePath } from "next/cache";

jest.mock("next/cache");

const mockRevalidatePath = <jest.Mock<typeof revalidatePath>>revalidatePath;

describe("TodoList", () => {
  it("should resolve todo list", async () => {
    const { data } = await getAllTodo({
      filter: { status: FilterStatus.ALL },
    });
    expect(data.length).toBeGreaterThan(1);
  });

  it("should filter correctly", async () => {
    const { data } = await getAllTodo({
      filter: { status: FilterStatus.COMPLETED },
    });

    data.forEach((todo) => {
      expect(todo.isCompleted).toBeTruthy();
    });

    const { data: incompleteTodos } = await getAllTodo({
      filter: {
        status: FilterStatus.INCOMPLETE,
      },
    });

    incompleteTodos.forEach((todo) => {
      expect(todo.isCompleted).toBeFalsy();
    });
  });

  it("should revalidate cache on add todo success", async () => {
    const fn = jest.fn();
    mockRevalidatePath.mockImplementation(fn);
    await addTodo("hello");
    expect(fn).toHaveBeenCalled();
  });
});

afterAll(() => {
  clearAllMocks();
});
