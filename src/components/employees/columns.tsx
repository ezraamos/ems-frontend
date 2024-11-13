'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
import ActionButtons from './ActionButtons';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Employee = {
  _id: string;
  employeeId: string;
  dateOfBirth: string;
  userId: { email: string };
};
export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'employeeId',
    header: ({ column }) => {
      return (
        <Button
          className='w-32'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Employee ID
          <ArrowUpDown className='ml-2 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=' w-32 text-center'>{row.original.employeeId}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'userId.firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'userId.lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'userId.email',
    header: 'Email',
  },
  {
    accessorKey: 'department.departmentName',
    header: 'Department',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original;

      return <ActionButtons employee={employee} />;
    },
  },
];
