import { revalidatePath } from "next/cache";
import { FilterStatus, Todo } from "../../model";
import { RECORD_PER_PAGE } from "@/lib/constants";

const todos: Todo[] = [
  {
    title: "Create a new GitHub repository for your project.",
    isCompleted: true,
    id: 0,
  },
  {
    title: "Push your code to the repository and ensure it is public",
    isCompleted: true,
    id: 1,
  },
  {
    title: "Provide a link to your GitHub repository in your submission.",
    isCompleted: true,
    id: 2,
  },
  {
    title: "Include a README.md file explaining",
    isCompleted: true,
    id: 3,
  },
  {
    title:
      "Ensure the code is clean, well-organized, and follows React best practices.",
    isCompleted: true,
    id: 4,
  },
];

export async function getAllTodo({
  filter: { status },
  page = 1,
}: {
  filter: { status: FilterStatus };
  page?: number;
}) {
  await delay();
  const data = todos
    .filter((t) => {
      if (Number(status) === FilterStatus.COMPLETED) {
        return t.isCompleted;
      }
      if (Number(status) === FilterStatus.INCOMPLETE) {
        return !t.isCompleted;
      }
      return t;
    })
    .slice((page - 1) * RECORD_PER_PAGE, page * RECORD_PER_PAGE);
  return {
    totalPages: Math.ceil(todos.length / RECORD_PER_PAGE),
    data,
  };
}

export async function addTodo(title: string) {
  await delay();
  todos.push({
    title,
    isCompleted: false,
    id: todos.length + 1,
  });
  revalidatePath("/", "page");
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 200));
}
