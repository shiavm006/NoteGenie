'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect directly to General page
    router.push('/general');
  }, [router]);

  return (
    <div className="flex h-screen bg-black text-white items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting to General...</p>
      </div>
    </div>
  );
} 