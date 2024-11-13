import useUserStore from '@/store/useUserStore';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const PrivateRoutes = ({ children }: Props) => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  if (user?.role !== 'admin') {
    <Navigate to='/employee-dashboard' />;
  }

  // Redirect to login if there's no user
  return user ? children : <Navigate to='/login' />;
};

export default PrivateRoutes;
