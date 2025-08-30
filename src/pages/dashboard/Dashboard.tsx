import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import RiderDashboard from './RiderDashboard';
import DriverDashboard from './DriverDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { role } = useParams();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role && role !== user.role) {
      navigate(`/dashboard/${user.role}`, { replace: true });
    }
  }, [isAuthenticated, user, role, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const userRole = user?.role;

  switch (userRole) {
    case 'rider':
      return <RiderDashboard />;
    case 'driver':
      return <DriverDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Invalid Role</h1>
          <p>Your account role is not recognized.</p>
        </div>
      );
  }
}
