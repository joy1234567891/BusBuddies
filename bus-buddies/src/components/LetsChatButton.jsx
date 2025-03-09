'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LetsChatButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    router.refresh();
    router.push('/chat');
  };

  return (
    <button className="mt-2 px-4 py-2 bg-white text-sky-600 rounded-full font-medium hover:bg-sky-100 transition-colors" onClick={handleClick}>
        Let's Chat
    </button>
  );
}