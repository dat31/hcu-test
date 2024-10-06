"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Todo } from "@/lib/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema: ZodType<Partial<Todo>> = z.object({
  title: z.string().min(1, "Required!"),
});

type Props = { onSubmit: (formData: Todo) => Promise<void> };

export default function AddTodo({ onSubmit }: Props) {
  const form = useForm<Todo>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      isCompleted: false,
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex gap-4 "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl className="flex-grow-1">
                <Input placeholder="Input todo title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Add todo
        </Button>
      </form>
    </Form>
  );
}
