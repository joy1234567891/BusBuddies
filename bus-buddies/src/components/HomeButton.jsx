'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-sky-500 text-white py-2 px-4 rounded-xl hover:bg-sky-600"
    >
      Home
    </button>
  );
}