
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthForm({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');  // New state for email validation error
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailError('');  // Clear email error on submit
    setLoading(true);
  
    try {
      if (type === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
  
        router.refresh();
        router.push('/dashboard');
      } else {
        // Sign up flow (without email verification)
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          // Removed emailRedirectTo to prevent email verification
        });
  
        if (error) throw error;
  
        // Create profile record with the new user's ID
        if (data && data.user) {
          const profileData = {
            id: data.user.id,
            route: null,
            departure_time: null,
            year: null,
            hobbies: null,
          };
  
          const { error: profileError } = await supabase
            .from('user_profile')
            .insert([profileData]);
  
          if (profileError) {
            throw profileError;
          }
        }
  
        setEmail('');
        setPassword('');
        alert('Account created successfully! Logging you in...');
  
        // Automatically log the user in after sign up
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
        if (signInError) throw signInError;
  
        router.refresh();
        router.push('/dashboard');
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email to ensure it ends with '@student.ubc.ca'
    if (value && !value.endsWith('@student.ubc.ca')) {
      setEmailError('Email must be a student.ubc.ca address');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-transparent rounded-lg">
      <h2 className="text-2xl font-bold mb-6">
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </h2>
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-xl">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Student Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="cwl@student.ubc.ca"
            onChange={handleEmailChange}
            className="w-full p-2 rounded-xl bg-white"
            required
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>} 
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
            className="w-full p-2 rounded-xl bg-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || emailError}  
          className="w-full bg-sky-500 text-white py-2 px-4 rounded-xl hover:bg-sky-600 disabled:bg-sky-300"
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
