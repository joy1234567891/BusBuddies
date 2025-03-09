'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function HomeButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    router.refresh();
    router.push('/');
  };

  return (
    <button
      onClick={handleClick}
      className="text-sky-500 py-2 px-4 rounded-xl hover:text-sky-700"
    >
      Matches
    </button>
  );
}