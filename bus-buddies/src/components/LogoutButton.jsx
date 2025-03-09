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
      className="bg-red-300 text-white py-2 px-4 rounded-xl hover:bg-red-500"
    >
      Sign Out
    </button>
  );
}