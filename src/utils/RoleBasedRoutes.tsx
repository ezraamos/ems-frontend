import useUserStore from '@/store/useUserStore';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  requiredRole: string[];
};

const RolebasedRoutes = ({ children, requiredRole }: Props) => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  if (isLoading) {
    return <div> Loading ....</div>;
  }
  if (!requiredRole.includes(user?.role || '')) {
    <Navigate to='/unauthorized' />;
  }

  return user ? children : <Navigate to='/login' />;
};

export default RolebasedRoutes;
