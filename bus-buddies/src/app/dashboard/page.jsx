import { requireAuth } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';
import ProfileForm from '@/components/ProfileForm';
import HomeButton from '@/components/HomeButton';
import ProfileButton from '@/components/ProfileButton';
import ChatButton from '@/components/ChatButton';
import { findMatches } from '@/utils/findMatches'; // Import the findMatches function

export default async function DashboardPage() {
    const session = await requireAuth();
    const userId = session.user.id; // Extract the user ID from the session

    // Fetch matches for the current user
    const matches = await findMatches(userId);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                <div className="grid grid-cols-4">
                    <HomeButton />
                    <ProfileButton />
                    <ChatButton />
                    <LogoutButton />
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <ProfileForm session={session} />
            </div>

            {/* Store matches in a hidden input or pass them to a global state */}
            <input type="hidden" id="matches-data" value={JSON.stringify(matches)} />
        </div>
    );
}