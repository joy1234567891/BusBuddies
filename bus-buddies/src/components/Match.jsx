"use client"

export default function Match({ name, hobbies, busRoute, busTime, yearLevel, major, faculty }) {
    const hobbyList = hobbies ? hobbies.split(' ') : [];
    
    return (
      <div className="flex flex-col items-center p-6 max-w-xs rounded-lg bg-sky-300 shadow-lg text-black">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          
          <p className="text-sm mb-2">Year: {yearLevel}</p>
          <p className="text-sm mb-2">Faculty: {faculty}</p>
          <p className="text-sm mb-2">Major: {major}</p>

          
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {hobbyList.map((hobby, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs text-black"
              >
                {hobby}
              </span>
            ))}
          </div>
          
          <p className="text-sm mb-4 text-black">
            Taking the {busRoute} around {busTime}
          </p>
          
          <button className="mt-2 px-4 py-2 bg-white text-sky-600 rounded-full font-medium hover:bg-sky-100 transition-colors">
            Let's Chat
          </button>
        </div>
      </div>
    );
  }