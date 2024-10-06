import { addTodo } from "@/lib/api/todo";
import { FilterStatus, Todo } from "@/lib/model";
import AddTodo from "@/lib/ui/todo/add-to-do";
import TodoList from "@/lib/ui/todo/list";
import Filter from "@/lib/ui/todo/list/filter";
import TodoListSkeleton from "@/lib/ui/todo/list/skeleton";
import { Suspense } from "react";

type Props = {
  searchParams: { status: FilterStatus; page?: number };
};

export default function TodoPage({ searchParams }: Props) {
  async function onSubmit(data: Todo) {
    "use server";
    await addTodo(data.title);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <AddTodo onSubmit={onSubmit} />
            <Filter />
          </div>
          <Suspense fallback={<TodoListSkeleton />}>
            <TodoList filter={searchParams} page={searchParams.page} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
