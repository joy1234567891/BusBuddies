import { requireAuth } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';
import ProfileForm from '@/components/ProfileForm';

export default async function DashboardPage() {
  const session = await requireAuth();
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p>You are logged in as: {session.user.email}</p>
        </div>
        
        <ProfileForm session={session} />
      </div>
    </div>
  );
}