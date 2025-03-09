import LogoutButton from '@/components/LogoutButton';
import { getSession, requireAuth } from '@/lib/auth';

export default async function Home() {
    const session = await getSession();

    return (
        <div>
            {session ? (
                <div>
                    <h1>Welcome back, here are your matches!</h1>
                    <LogoutButton />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <img className="m-4 p-4 md:w-1/2 sm:w-full sm:h-auto" src="/logo.svg" alt="Logo" />

                    <p className="text-2xl text-black font-bold mt-4">Find someone to bus home with!</p>

                    <div className="space-y-4"> {/* Adds space between buttons */}
                        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-4 px-8 text-xl rounded-xl m-4">
                            <a href="/register">Sign Up</a>
                        </button>

                        <button className="bg-sky-300 hover:bg-sky-700 text-white font-bold py-4 px-8 text-xl rounded-xl m-4">
                            <a href="/login">Login</a>
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto p-4 space-y-6">
                        <p className="text-2xl text-black-400 font-bold mt-12 sm:mt-8 text-center">Why use BusBuddies?</p>

                        {/* Repeat this block for other sections */}
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
