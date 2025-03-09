import { requireAuth } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';
import ProfileButton from '@/components/ProfileButton';
import ProfileForm from '@/components/ProfileForm';
import HomeButton from '@/components/HomeButton';
import ChatButton from '@/components/ChatButton';

export default async function DashboardPage() {
  const session = await requireAuth();
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <HomeButton />
      <ProfileButton />
      <ChatButton />
      <LogoutButton />
        </div>
      </div>
      

      <div className="flex flex-col justify-center">
        <ProfileForm session={session} />
      </div>
    </div>
  );
}