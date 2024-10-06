import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllTodo } from "@/lib/api/todo";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { FilterStatus } from "@/lib/model";
import dynamic from "next/dynamic";

type Props = {
  filter: {
    status: FilterStatus;
  };
  page?: number;
};

const headers = ["Title", "Completed"];

const Pagination = dynamic(() => import("@/lib/ui/common/pagination"), {
  ssr: false,
});

export default async function TodoList({ filter, page }: Props) {
  const { totalPages, data } = await getAllTodo({ filter, page });
  if (data.length === 0) {
    return <div className="mt-4">Empty todo</div>;
  }
  return (
    <>
      <div className="border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(({ title, isCompleted, id }) => (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>
                  {isCompleted ? <CheckCircledIcon /> : <CrossCircledIcon />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={Number(page)} />
      )}
    </>
  );
}
