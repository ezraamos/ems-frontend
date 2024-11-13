import AdminSidebar from '@/components/AdminSidebar';

import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className='flex min-w-full'>
      <AdminSidebar />
      <div className='flex-1'>
        <Navbar />
        <div className=' pb-10 max-h-[calc(100vh-6rem)] overflow-hidden'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
