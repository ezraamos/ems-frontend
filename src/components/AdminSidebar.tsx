import { cn } from '@/lib/utils';
import {
  Banknote,
  BookOpenCheck,
  Boxes,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='h-screen w-64  bg-sky-900 text-white flex flex-col gap-10 '>
      <div className='w-full h-24 text-center flex justify-center items-center  '>
        <h3 className='text-2xl font-semibold'>Employee MS</h3>
      </div>
      <div className='flex justify-center'>
        <ul className='flex flex-col justify-center gap-2  w-52'>
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(' flex items-center gap-2 pl-9 py-2 ', {
                  'bg-sky-950 rounded-full': isActive,
                })
              }
              to='/admin-dashboard'
              end
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/admin-dashboard/employees'
              className={({ isActive }) =>
                cn(' flex items-center gap-2 pl-9 py-2', {
                  'bg-sky-950 rounded-full': isActive,
                })
              }
            >
              <Users />
              <span>Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(' flex items-center gap-2 pl-9 py-2', {
                  'bg-sky-950 rounded-full': isActive,
                })
              }
              to='/admin-dashboard/departments'
            >
              <Boxes />
              <span>Department</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(' flex items-center gap-2 pl-9 py-2', {
                  'bg-sky-950 rounded-full': isActive,
                })
              }
              to='/admin-dashboard/leaves'
            >
              <BookOpenCheck />
              <span>Leave</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(' flex items-center gap-2 pl-9 py-2', {
                  'bg-sky-950 rounded-full': isActive,
                })
              }
              to='/admin-dashboard/salary'
            >
              <Banknote />
              <span>Salary</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(' flex items-center gap-2 pl-9 py-2', {
                  'bg-sky-950 rounded-full': isActive,
                })
              }
              to='/admin-dashboard/settings'
            >
              <Settings />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
