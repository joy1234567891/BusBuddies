
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
    const [name, setName] = useState('');
    const [busRoute, setBusRoute] = useState('');
    const [busTime, setBusTime] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [major, setMajor] = useState(''); // Added major state
    const [faculty, setFaculty] = useState(''); // Added faculty state
    const [hobbies, setHobbies] = useState('');

    const busRoutes = ['R4', '99', '4', '14', '25', '33', '49', '84', '9', '44', 'N17'];
    const yearLevels = ['1', '2', '3', '4', '5+', 'Graduate'];

    // Faculty options
    const faculties = [
        'Applied Science',
        'Arts',
        'Business',
        'Dentistry',
        'Education',
        'Forestry',
        'Land and Food Systems',
        'Law',
        'Medicine',
        'Pharmaceutical Sciences',
        'Science'
    ];

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
                    setName(data.name || '');
                    setBusRoute(data.route || '');
                    setBusTime(data.departure_time || '');
                    setYearLevel(data.year || '');
                    setMajor(data.major || ''); // Set major from data
                    setFaculty(data.faculty || ''); // Set faculty from data

                    // Handle hobbies string with fallback
                    const userHobbies = data.hobbies || '';
                    setHobbies(userHobbies);
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

    const handleHobbiesChange = (e) => {
        setHobbies(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return;

        const filteredHobbies = hobbies
            .split(',')
            .map(hobby => hobby.trim())
            .filter(hobby => hobby)
            .join(' ');

        try {
            setUpdating(true);
            setMessage({ text: '', type: '' });

            const updates = {
                id: user.id,
                name: name,
                route: busRoute,
                departure_time: busTime,
                year: yearLevel,
                major: major, // Include major in updates
                faculty: faculty, // Include faculty in updates
                hobbies: filteredHobbies,
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
        <div className="flex justify-center">
            <div className="max-w-lg mt-10 p-6 bg-transparent rounded-lg w-full">
                <h2 className="text-xl font-semibold mb-4">Update Your Profile</h2>

                {message.text && (
                    <div
                        className={`p-3 rounded mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-xl"
                            required
                        />
                    </div>

                    {/* Bus Route Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="busRoute">
                            Bus Route
                        </label>
                        <select
                            id="busRoute"
                            value={busRoute}
                            onChange={(e) => setBusRoute(e.target.value)}
                            className="w-full p-2 border rounded-xl"
                        >
                            <option value="">Select a bus route</option>
                            {busRoutes.map((route) => (
                                <option key={route} value={route}>
                                    {route}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Departure Time Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="busTime">
                            Departure Time
                        </label>
                        <input
                            type="time"
                            id="busTime"
                            value={busTime}
                            onChange={(e) => setBusTime(e.target.value)}
                            className="w-full p-2 border rounded-xl"
                        />
                    </div>

                    {/* Year Level Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="yearLevel">
                            Year Level
                        </label>
                        <select
                            id="yearLevel"
                            value={yearLevel}
                            onChange={(e) => setYearLevel(e.target.value)}
                            className="w-full p-2 border rounded-xl"
                        >
                            <option value="">Select your year level</option>
                            {yearLevels.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Faculty Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="faculty">
                            Faculty
                        </label>
                        <select
                            id="faculty"
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                            className="w-full p-2 border rounded-xl"
                        >
                            <option value="">Select your faculty</option>
                            {faculties.map((fac) => (
                                <option key={fac} value={fac}>
                                    {fac}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Major Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="major">
                            Major
                        </label>
                        <input
                            type="text"
                            id="major"
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            placeholder="Enter your major"
                            className="w-full p-2 border rounded-xl"
                        />
                    </div>

                    {/* Hobbies Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            Up to 3 Hobbies
                            <p className="text-sm text-gray-500 mt-1">Enter as a comma-separated list (e.g. Coding, Skiing, Hiking)</p>
                        </label>
                        <input
                            type="text"
                            value={hobbies}
                            onChange={handleHobbiesChange}
                            placeholder="Enter hobbies (e.g. Reading Coding Running)"
                            className="w-full p-2 border rounded-xl"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full bg-sky-500 text-white py-2 px-4 rounded-xl hover:bg-sky-600 disabled:bg-sky-300"
                    >
                        {updating ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}