import LogoutButton from '@/components/LogoutButton';
import HomeButton from '@/components/HomeButton';
import ChatButton from '@/components/ChatButton';
import Match from '@/components/Match';
import { getSession, requireAuth } from '@/lib/auth'; 
import ProfileButton from '@/components/ProfileButton';

export default async function Home() {
  const session = await getSession();
  const matchesData = [
    {
      id: 1,
      name: "Josh",
      yearLevel: "4",
      hobbies: "reading swimming",
      busRoute: "99",
      busTime: "12:45pm"
    },
    {
      id: 2,
      name: "Harry",
      yearLevel: "Graduate",
      hobbies: "basketball gaming music",
      busRoute: "99",
      busTime: "12:15pm"
      
    },
    {
      id: 3,
      name: "Sarah",
      yearLevel: "5+",
      hobbies: "art coding photography",
      busRoute: "99",
      busTime: "12:30pm"
    },
    {
      id: 4,
      name: "John",
      yearLevel: "Year 1",
      hobbies: "soccer debate",
      busRoute: "99",
      busTime: "1:00pm"
    }
  ];

  return (
    <div>
      {session ? (
       <div className="min-h-screen bg-gray-50">
       <div className="container mx-auto px-4 py-10">
         <div className="flex justify-between items-center mb-6">
           <h1 className="text-3xl font-bold">On Your Route</h1>
           <div className="flex gap-4">
             <HomeButton />
             <ProfileButton />
              <ChatButton />
             <LogoutButton />
           </div>
         </div>
         
         {/* Bus route filters
         <div className="mb-6">
           <h2 className="text-xl font-semibold mb-2">12pm-1pm Routes</h2>
           <div className="flex gap-3">
             <span className="px-4 py-2 bg-sky-500 text-white rounded-full">Bus 25</span>
             <span className="px-4 py-2 bg-sky-500 text-white rounded-full">Bus 33</span>
           </div>
         </div> */}
         
         {/* Display matches in a grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {matchesData.map(match => (
             <div key={match.id} className="flex justify-center">
               <Match 
                 name={match.name}
                 yearLevel={match.yearLevel}
                 hobbies={match.hobbies}
                 busRoute={match.busRoute}
                 busTime={match.busTime}
               />
             </div>
           ))}
         </div>
       </div>
     </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <img className="m-4 p-4 md:w-1/2 sm:w-full sm:h-auto" src="/logo.svg" alt="Logo" />
        
        <p className="font-space text-2xl text-black font-bold mt-4">Find someone to bus home with!</p>
        
        <div className="space-y-4"> {/* Adds space between buttons */}
          <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-4 px-8 text-xl rounded-xl m-4">
            <a href="/register">Sign Up</a>
          </button>
          
          <button className="bg-sky-300 hover:bg-sky-700 text-white font-bold py-4 px-8 text-xl rounded-xl m-4">
            <a href="/login">Login</a>
          </button>
        </div>
      
        <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto p-4 space-y-6">
          <p className="text-2xl text-gray-400 font-bold mt-12 sm:mt-8 text-center">Why use BusBuddies?</p>
      
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
