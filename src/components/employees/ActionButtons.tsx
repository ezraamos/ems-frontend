import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

type Props = {
  employee: { _id: string };
};
const ActionButtons = ({ employee }: Props) => {
  const { _id: id } = employee;

  const navigate = useNavigate();
  return (
    <div className='flex space-x-2 '>
      <Button
        variant='outline'
        className='bg-teal-500 text-white hover:bg-teal-600 hover:text-white'
        onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
      >
        View
      </Button>
      <Button
        variant='outline'
        className='bg-blue-500 text-white hover:bg-blue-600 hover:text-white'
        onClick={() =>
          navigate(`/admin-dashboard/employees/edit/${id}`, {
            state: {
              employee,
            },
          })
        }
      >
        Edit
      </Button>
      <Button
        variant='outline'
        className='bg-amber-500 text-white hover:bg-amber-600 hover:text-white'
        onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
      >
        Salary
      </Button>
      <Button
        variant='outline'
        className='bg-red-500 text-white hover:bg-red-600 hover:text-white'
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
      >
        Leave
      </Button>
    </div>
  );
};

export default ActionButtons;
