import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center py-12">
      <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        <FileQuestion className="h-24 w-24 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight">404 - Page Not Found</h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
