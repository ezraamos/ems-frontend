import {
  Ban,
  Banknote,
  Boxes,
  CheckCheck,
  File,
  Timer,
  Users,
} from 'lucide-react';
import SummaryCard from './SummaryCard';

const AdminSummary = () => {
  return (
    <div className='p-10'>
      <h3 className='text-2xl font-medium'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 max-w-5xl'>
        <SummaryCard
          icon={<Users />}
          text='Total Employees'
          number={52}
          iconBgColor='bg-blue-300'
        />
        <SummaryCard
          icon={<Boxes />}
          text='Total Departments'
          number={4}
          iconBgColor='bg-amber-300'
        />
        <SummaryCard
          icon={<Banknote />}
          text='Monthly Salary'
          number='₱ 252,500'
          iconBgColor='bg-emerald-300'
        />
      </div>
      <div className='mt-10'>
        <h4 className='text-lg font-medium'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 max-w-5xl'>
          <SummaryCard
            icon={<File />}
            text='Leave Applied'
            number={27}
            iconBgColor='bg-teal-300'
          />
          <SummaryCard
            icon={<CheckCheck />}
            text='Leave Approved'
            number={15}
            iconBgColor='bg-lime-300'
          />
          <SummaryCard
            icon={<Timer />}
            text='Leave Pending'
            number={10}
            iconBgColor='bg-orange-300'
          />
          <SummaryCard
            icon={<Ban />}
            text='Leave Rejected'
            number={2}
            iconBgColor='bg-red-300'
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
