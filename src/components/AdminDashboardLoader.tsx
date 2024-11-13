import { LoaderCircle } from 'lucide-react';

const AdminDashboardLoader = () => {
  return (
    <div className='h-[calc(100vh-6rem)] flex gap-3 justify-center items-center'>
      Loading... <LoaderCircle className='animate-spin h-5 w-5' />
    </div>
  );
};

export default AdminDashboardLoader;
