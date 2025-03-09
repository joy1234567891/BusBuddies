import LogoutButton from '@/components/LogoutButton';
import HomeButton from '@/components/HomeButton';
import ProfileButton from '@/components/ProfileButton';
import ChatButton from '@/components/ChatButton';
import { getSession, requireAuth } from '@/lib/auth';
import { findMatches, nonMatches } from '@/utils/findMatches'; // Import nonMatches function
import Match from '@/components/Match';
import LetsChatButton from '@/components/LetsChatButton';

export default async function Home() {
    const session = await getSession();

    let matches = [];
    let nonMatchesList = [];
    if (session) {
        const userId = session.user.id; // Extract the user ID from the session
        matches = await findMatches(userId); // Fetch matches for the current user
        nonMatchesList = await nonMatches(userId); // Fetch non-matches for the current user
    }

    return (
        <div>
            {session ? (
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 py-10">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold">On Your Route</h1>
                            <div className="flex gap-4">
                                <HomeButton />
                                <ProfileButton />
                                <ChatButton />
                                <LogoutButton />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            {/* Display Matches */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                {matches.map((match, index) => (
                                    <div key={index} className="flex flex-col justify-center items-center bg-sky-300 p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold">{match.name}</h3>
                                        <div key={index} className="flex flex-col justify-left items-left p-6">
                                            <p><strong>Hobbies:</strong> {match.hobbies}</p>
                                            <p><strong>Departure Time:</strong> {match.departure_time}</p>
                                            <p><strong>Route:</strong> {match.route}</p>
                                            <p><strong>Faculty:</strong> {match.faculty}</p>
                                            <p><strong>Major:</strong> {match.major}</p>
                                            <p><strong>Year:</strong> {match.year}</p>
                                            <p><strong>Matching Hobbies:</strong> {match.matchingHobbies || 0}</p>
                                            <LetsChatButton />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Separator */}
                            <div className="w-full max-w-4xl mx-auto my-8 border-t border-gray-300 relative">
                                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-4 text-gray-600 font-semibold">
                                    View Other Options:
                                </span>
                            </div>

                            {/* Display Non-Matches */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                {nonMatchesList.map((nonMatch, index) => (
                                    <div key={index} className="flex flex-col justify-center items-center bg-sky-100 p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold">{nonMatch.name}</h3>
                                        <div key={index} className="flex flex-col justify-left items-left p-6">
                                        <p><strong>Hobbies:</strong> {nonMatch.hobbies}</p>
                                        <p><strong>Departure Time:</strong> {nonMatch.departure_time}</p>
                                        <p><strong>Route:</strong> {nonMatch.route}</p>
                                        <p><strong>Faculty:</strong> {nonMatch.faculty}</p>
                                        <p><strong>Major:</strong> {nonMatch.major}</p>
                                        <p><strong>Year:</strong> {nonMatch.year}</p>
                                        <LetsChatButton />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <img className="m-4 p-4 md:w-1/2 sm:w-full sm:h-auto" src="/logo.svg" alt="Logo" />

                    <p className="text-2xl text-black font-bold mt-4">Find someone to bus home with!</p>

                    <div className="space-y-4">
                        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-4 px-8 text-xl rounded-xl m-4">
                            <a href="/register">Sign Up</a>
                        </button>

                        <button className="bg-sky-300 hover:bg-sky-700 text-white font-bold py-4 px-8 text-xl rounded-xl m-4">
                            <a href="/login">Login</a>
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto p-4 space-y-6">
                        <p className="text-2xl text-black font-bold mt-12 sm:mt-8 text-center">Why use BusBuddies?</p>

                        <div className="rounded-xl bg-sky-300 p-8 m-4 shadow-lg w-full sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                            <h2 className="text-xl text-gray-800 font-semibold">Instant Connection</h2>
                            <p className="text-lg text-gray-700">Take the bus home with a new friend!</p>
                        </div>

                        <div className="rounded-xl bg-sky-300 p-8 m-4 shadow-lg w-full sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                            <h2 className="text-xl text-gray-800 font-semibold">Find Common Ground</h2>
                            <p className="text-lg text-gray-700">Meet people with similar interests.</p>
                        </div>

                        <div className="rounded-xl bg-sky-300 p-8 m-4 shadow-lg w-full sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                            <h2 className="text-xl text-gray-800 font-semibold">Save Time</h2>
                            <p className="text-lg text-gray-700">You're taking the bus anyways - why not make a new friend on the way?</p>
                        </div>

                        <div className="rounded-xl bg-sky-300 p-8 m-4 shadow-lg w-full sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                            <h2 className="text-xl text-gray-800 font-semibold">Power in Numbers</h2>
                            <p className="text-lg text-gray-700">Leaving late? Stay safe with your transit buddy!</p>
                        </div>

                        <div className="rounded-xl bg-sky-300 p-8 m-4 shadow-lg w-full sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                            <h2 className="text-xl text-gray-800 font-semibold">Students Only</h2>
                            <p className="text-lg text-gray-700">UBC student emails required for sign up.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}