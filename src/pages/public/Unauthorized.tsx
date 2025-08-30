import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
        <p className="text-muted-foreground mb-8">
          You don't have permission to access this page.
        </p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
