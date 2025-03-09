'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    router.refresh();
    router.push('/');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-sky-500 text-white py-2 px-4 rounded-xl hover:bg-sky-600"
    >
      Home
    </button>
  );
}