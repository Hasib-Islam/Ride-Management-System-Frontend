import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import Logo from '@/components/common/Logo';

export default function Home() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');

  const locationOptions = [
    { value: 'dhaka-airport', label: 'Dhaka Airport' },
    { value: 'gulshan-1', label: 'Gulshan 1' },
    { value: 'banani', label: 'Banani' },
    { value: 'dhanmondi', label: 'Dhanmondi' },
    { value: 'uttara', label: 'Uttara' },
    { value: 'mirpur', label: 'Mirpur' },
    { value: 'motijheel', label: 'Motijheel' },
    { value: 'farmgate', label: 'Farmgate' },
    { value: 'bashundhara', label: 'Bashundhara' },
    { value: 'mohakhali', label: 'Mohakhali' },
  ];

  return (
    <section className="relative overflow-hidden py-32 min-h-screen">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <Logo />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Your Ride, Your Way with{' '}
                <span className="text-primary">Ride App</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Book reliable rides across Bangladesh. Fast, safe, and
                affordable transportation at your fingertips.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4 w-full max-w-md">
              <div className="flex gap-3">
                <Select onValueChange={(value) => setPickupLocation(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pickup Locations</SelectLabel>
                      {locationOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setDestination(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Destinations</SelectLabel>
                      {locationOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {pickupLocation && destination ? (
                <Button asChild className="w-full">
                  <Link
                    to={`/book-ride?pickup=${pickupLocation}&destination=${destination}`}
                  >
                    Book Ride Now
                  </Link>
                </Button>
              ) : (
                <Button disabled className="w-full">
                  Book Ride Now
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Booking</h3>
              <p className="text-muted-foreground">
                Book your ride in seconds with our intuitive interface.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Your safety is our priority with verified drivers and real-time
                tracking.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-muted-foreground">
                Competitive prices with no hidden fees or surge pricing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
