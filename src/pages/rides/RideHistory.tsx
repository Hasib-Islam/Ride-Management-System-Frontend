import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RideHistory() {
  const rideHistory = [
    {
      id: 1,
      from: 'Gulshan 1',
      to: 'Dhaka Airport',
      fare: 250,
      date: '2024-01-15',
    },
    { id: 2, from: 'Banani', to: 'Dhanmondi', fare: 180, date: '2024-01-14' },
    { id: 3, from: 'Uttara', to: 'Motijheel', fare: 300, date: '2024-01-13' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Ride History</h1>
          <p className="text-muted-foreground">View your past rides</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {rideHistory.map((ride) => (
            <Card key={ride.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">
                      {ride.from} → {ride.to}
                    </h3>
                    <p className="text-muted-foreground">Fare: ৳{ride.fare}</p>
                    <p className="text-sm text-muted-foreground">
                      Date: {ride.date}
                    </p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
