'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
import ActionButtons from './ActionButtons';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Department = {
  _id: string;
  departmentName: string;
  departmentDescription: string;
};
export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: 'departmentName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-3 w-3' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='truncate' style={{ maxWidth: '150px' }}>
        {row.getValue('departmentName')}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'departmentDescription',
    header: 'Description',
    cell: ({ row }) => (
      <div style={{ maxWidth: '450px' }}>
        {row.getValue('departmentDescription')}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const department = {
        id: row.original._id,
        name: row.original.departmentName,
        description: row.original.departmentDescription,
      };

      return <ActionButtons department={department} />;
    },
  },
];
