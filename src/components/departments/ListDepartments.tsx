import { Link } from 'react-router-dom';

import { DataTable } from '../ui/data-table';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiBaseUrl } from '@/lib/utils';
import AdminDashboardLoader from '../AdminDashboardLoader';

const ListDepartments = () => {
  // State to manage the current page

  const { data: departmentsList, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const res = await axios.get(`${apiBaseUrl}/department`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return res.data.data;
    },
  });
  if (isLoading) {
    return <AdminDashboardLoader />;
  }

  return (
    <div className='p-10'>
      <div className='flex justify-between'>
        <h3 className='text-2xl font-medium'>Manage Department</h3>
        {!isLoading && (
          <Link
            className='px-4 py-1 bg-sky-600 rounded text-white truncate'
            to='/admin-dashboard/departments/add'
          >
            Add New Department
          </Link>
        )}
      </div>

      <div className=' flex justify-center  max-h-[80vh] mt-5'>
        <div className='max-w-5xl flex-1 flex flex-col gap-5'>
          <DataTable columns={columns} data={departmentsList} />
        </div>
      </div>
    </div>
  );
};

export default ListDepartments;
