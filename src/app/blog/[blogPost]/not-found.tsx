import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Article Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn&apos;t find the article you&apos;re looking for. It may have
          been moved or deleted.
        </p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Articles
          </Link>
        </Button>
      </div>
    </main>
  );
}
