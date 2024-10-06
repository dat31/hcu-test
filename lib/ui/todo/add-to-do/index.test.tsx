import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import AddTodo from "./index";

describe("AddTodo", () => {
  it("form submit should works", async () => {
    const onSubmit = jest.fn(() => Promise.resolve());
    render(<AddTodo onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Input todo title");
    await act(async () => {
      fireEvent.change(input, { target: { value: "todo" } });
      fireEvent.click(screen.getByRole("button"));
    });
    expect(onSubmit).toHaveBeenCalled();
  });

  it("form validation should works", async () => {
    const onSubmit = jest.fn(() => Promise.resolve());
    render(<AddTodo onSubmit={onSubmit} />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    const errorMessage = screen.getByText("Required!");
    expect(errorMessage).toBeTruthy();
  });
});
