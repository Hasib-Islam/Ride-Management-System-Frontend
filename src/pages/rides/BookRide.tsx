import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function BookRide() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [isSelectingLocation, setIsSelectingLocation] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to book a ride');
      navigate('/login');
      return;
    }

    const pickupParam = searchParams.get('pickup');
    const destinationParam = searchParams.get('destination');

    if (pickupParam && destinationParam) {
      setPickup(pickupParam);
      setDestination(destinationParam);
      setIsSelectingLocation(false);
      const fare = Math.floor(Math.random() * 200) + 100;
      setEstimatedFare(fare);
    }
  }, [searchParams, isAuthenticated, navigate]);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickup && destination) {
      setIsSelectingLocation(false);
      const fare = Math.floor(Math.random() * 200) + 100;
      setEstimatedFare(fare);
    } else {
      toast.error('Please enter both pickup and destination locations');
    }
  };

  const handleBookRide = () => {
    toast.success('Ride booked successfully!');
    navigate('/dashboard/rider');
  };

  const handleEditLocations = () => {
    setIsSelectingLocation(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Book Your Ride</CardTitle>
            <CardDescription>
              {isSelectingLocation
                ? 'Enter ride details'
                : 'Confirm your ride details'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSelectingLocation ? (
              <form onSubmit={handleLocationSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup location"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Calculate Fare
                </Button>
              </form>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input id="pickup" value={pickup} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" value={destination} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fare">Estimated Fare</Label>
                  <Input id="fare" value={`৳${estimatedFare}`} readOnly />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleEditLocations}
                    className="flex-1"
                  >
                    Edit Locations
                  </Button>
                  <Button onClick={handleBookRide} className="flex-1">
                    Confirm Booking
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
