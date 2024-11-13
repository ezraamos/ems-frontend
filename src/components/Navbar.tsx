import useUserStore from '@/store/useUserStore';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  return (
    <nav className='text-white h-24 px-10 flex justify-between items-center bg-sky-950'>
      <p className='capitalize'>Welcome {user?.name}! 👋</p>
      <Button className=' bg-sky-900 flex items-center gap-2 hover:bg-sky-900'>
        Logout <LogOut className='w-4 h-4' />
      </Button>
    </nav>
  );
};

export default Navbar;
