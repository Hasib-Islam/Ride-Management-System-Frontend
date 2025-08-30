import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';

export default function AdminDashboard() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-muted-foreground">Total users</p>
              <Button variant="outline" className="w-full mt-4">
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rides</CardTitle>
              <CardDescription>View and manage all rides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">324</div>
              <p className="text-muted-foreground">Rides today</p>
              <Button variant="outline" className="w-full mt-4">
                View All Rides
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Platform revenue analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,458</div>
              <p className="text-muted-foreground">Total revenue</p>
              <Button variant="outline" className="w-full mt-4">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
