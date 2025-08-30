import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { Link } from 'react-router-dom';

export default function RiderDashboard() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Rider Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Book a Ride</CardTitle>
              <CardDescription>Request a new ride</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/book-ride">Book Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ride History</CardTitle>
              <CardDescription>View your past rides</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/ride-history">View History</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment options</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Payments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
