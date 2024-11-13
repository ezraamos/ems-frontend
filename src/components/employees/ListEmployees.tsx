import { apiBaseUrl } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DataTable } from '../ui/data-table';
import { Link } from 'react-router-dom';
import { columns } from './columns';
import AdminDashboardLoader from '../AdminDashboardLoader';

const ListEmployees = () => {
  const { data: employeesList, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await axios.get(`${apiBaseUrl}/employee`, {
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
        <h3 className='text-2xl font-medium'>Manage Employees</h3>

        {!isLoading && (
          <Link
            className='px-4 py-1 bg-sky-600 rounded text-white truncate'
            to='/admin-dashboard/employees/add'
          >
            Add New Employee
          </Link>
        )}
      </div>

      <div className=' flex justify-center  max-h-[80vh] mt-5'>
        <div className='max-w-[90rem] flex-1 flex flex-col gap-5'>
          <DataTable columns={columns} data={employeesList} />
        </div>
      </div>
    </div>
  );
};

export default ListEmployees;
