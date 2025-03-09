// components/ProfileForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProfileForm({ session }) {
  const supabase = createClient();
  const router = useRouter();
  const user = session?.user;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Form state
  const [busRoute, setBusRoute] = useState('');
  const [busTime, setBusTime] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [hobbies, setHobbies] = useState(['', '', '']);
  
  // Sample data for dropdowns
  const busRoutes = ['Route A', 'Route B', 'Route C', 'Route D', 'Route E'];
  const busTimes = ['7:00 AM', '8:00 AM', '9:00 AM', '3:00 PM', '4:00 PM', '5:00 PM'];
  const yearLevels = ['1', '2', '3', '4', '5+', 'Graduate'];

  useEffect(() => {
    async function loadProfile() {
      try {
        if (!user) return;

        setLoading(true);
        
        // Get profile data from the profiles table
        const { data, error } = await supabase
          .from('user_profile')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setBusRoute(data.bus_route || '');
          setBusTime(data.bus_time || '');
          setYearLevel(data.year_level || '');
          
          // Handle hobbies array with proper fallbacks
          const userHobbies = data.hobbies || [];
          setHobbies([
            userHobbies[0] || '',
            userHobbies[1] || '',
            userHobbies[2] || ''
          ]);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setMessage({ text: 'Error loading profile', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [user, supabase]);

  const handleHobbyChange = (index, value) => {
    const newHobbies = [...hobbies];
    newHobbies[index] = value;
    setHobbies(newHobbies);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) return;
  
    try {
      setUpdating(true);
      setMessage({ text: '', type: '' });
  
      // Filter out empty hobbies
      const filteredHobbies = hobbies.filter(hobby => hobby.trim() !== '');
  
      const updates = {
        id: user.id,
        bus_route: busRoute,
        bus_time: busTime,
        year_level: yearLevel,
        hobbies: filteredHobbies,
        updated_at: new Date().toISOString(),
      };
  
      // Use upsert to handle both insert and update cases
      const { error } = await supabase
        .from('user_profile')
        .upsert(updates, { returning: 'minimal' });
  
      if (error) throw error;
  
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ text: 'Error updating profile', type: 'error' });
    } finally {
      setUpdating(false);
    }
  };  

  if (loading) {
    return <div className="text-center py-4">Loading profile...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Your Profile</h2>
      
      {message.text && (
        <div 
          className={`p-3 rounded mb-4 ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="busRoute">
            Bus Route
          </label>
          <select
            id="busRoute"
            value={busRoute}
            onChange={(e) => setBusRoute(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a bus route</option>
            {busRoutes.map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="busTime">
            Bus Time
          </label>
          <select
            id="busTime"
            value={busTime}
            onChange={(e) => setBusTime(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a bus time</option>
            {busTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="yearLevel">
            Year Level
          </label>
          <select
            id="yearLevel"
            value={yearLevel}
            onChange={(e) => setYearLevel(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select your year level</option>
            {yearLevels.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Hobbies (up to 3)
          </label>
          {hobbies.map((hobby, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={hobby}
                onChange={(e) => handleHobbyChange(index, e.target.value)}
                placeholder={`Hobby ${index + 1}`}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          disabled={updating}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {updating ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}