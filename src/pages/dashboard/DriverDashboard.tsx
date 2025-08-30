import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/store/hooks';

export default function DriverDashboard() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>
                Go online to receive ride requests
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Label htmlFor="availability" className="flex flex-col space-y-1">
                <span>Online Status</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive ride requests
                </span>
              </Label>
              <Switch id="availability" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earnings</CardTitle>
              <CardDescription>View your earnings summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,245.80</div>
              <p className="text-muted-foreground">This week's earnings</p>
              <Button variant="outline" className="w-full mt-4">
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ride Requests</CardTitle>
              <CardDescription>Current ride requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-muted-foreground">Active requests</p>
              <Button className="w-full mt-4">View Requests</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
