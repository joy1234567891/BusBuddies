'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthForm({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
        if (type === 'login') {
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (error) throw error;
          } else {
            // Sign up flow
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/callback`,
              },
            });
            
            if (error) throw error;
            
            // Now we can access the user ID from the data object

            if (data && data.user) {
                // console.log("User created with ID:", data.user.id);
                
                // Create profile record with the new user's ID
                const profileData = {
                  id: data.user.id,
                  route: null,
                  departure_time: null,
                  year: null,
                  hobbies: null,
                };
                
                // console.log("Inserting profile data:", profileData); 
                // add to table
                const { error: profileError } = await supabase
                  .from('user_profile')
                  .insert([profileData]);
                
                if (profileError) {
                //   console.error("Profile creation error:", profileError); 
                  throw profileError;
                }
              }
            
            setEmail('');
            setPassword('');
            alert('Check your email for the confirmation link');
          }
  
      router.refresh();
      if (type === 'login') {
        router.push('/dashboard');
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading
            ? 'Loading...'
            : type === 'login'
            ? 'Sign In'
            : 'Create Account'}
        </button>
      </form>
    </div>
  );
}