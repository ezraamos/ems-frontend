import { apiBaseUrl } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewEmployee = () => {
  const { id } = useParams();

  const {
    data: employeeData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const res = await axios.get(`${apiBaseUrl}/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return res.data.employee;
    },
  });
  if (isError) return <div>Error fetching Employee details...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='pt-12'>
      <div className='p-12 max-w-lg mx-auto bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-5'>Employee Details</h1>

        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-sky-600'>
            Basic Information
          </h2>
          <p>
            <span className='font-medium'>Name:</span>{' '}
            {employeeData.userId.firstName} {employeeData.userId.lastName}
          </p>
          <p>
            <span className='font-medium'>Email:</span>{' '}
            {employeeData.userId.email}
          </p>
          <p>
            <span className='font-medium'>Role:</span>{' '}
            {employeeData.userId.role}
          </p>
        </div>

        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-sky-600'>
            Employee Information
          </h2>
          <p>
            <span className='font-medium'>Employee ID:</span>{' '}
            {employeeData.employeeId}
          </p>
          <p>
            <span className='font-medium'>Date of Birth:</span>{' '}
            {new Date(employeeData.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <span className='font-medium'>Gender:</span> {employeeData.gender}
          </p>
          <p>
            <span className='font-medium'>Marital Status:</span>{' '}
            {employeeData.maritalStatus}
          </p>
          <p>
            <span className='font-medium'>Salary:</span> $
            {employeeData.salary.toLocaleString()}
          </p>
        </div>

        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-sky-600'>Department</h2>
          <p>
            <span className='font-medium'>Department Name:</span>{' '}
            {employeeData.department.departmentName}
          </p>
          <p>
            <span className='font-medium'>Description:</span>{' '}
            {employeeData.department.departmentDescription}
          </p>
          <p>
            <span className='font-medium'>Designation:</span>{' '}
            {employeeData.designation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
