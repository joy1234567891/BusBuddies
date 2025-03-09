import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://mhxwhdyuafhxkttetszu.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oeHdoZHl1YWZoeGt0dGV0c3p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NjY4NzcsImV4cCI6MjA1NzA0Mjg3N30.q5QQZleJ0wMLOp14ccs9ZmT2QcLSg18I4YQN7oa0Do4'; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

async function findMatches(userId) {
    // Retrieve data for the specified user
    const { data: userData, error: userError } = await supabase
        .from('user_profile')
        .select('*')
        .eq('id', userId) // Use id as the unique identifier
        .single();

    if (userError || !userData) {
        console.error('Error fetching target user:', userError);
        return []; // Return empty list if user not found
    }

    console.log('Target User Data:', userData);

    const targetRoute = userData.route;
    const targetDepartureTime = userData.departure_time;
    const targetHobbies = userData.hobbies.split(' '); // Split hobbies string into an array

    // Fetch all users from the Supabase table
    const { data: usersList, error: usersError } = await supabase
        .from('user_profile')
        .select('*');

    if (usersError) {
        console.error('Error fetching users:', usersError);
        return [];
    }

    console.log('All Users:', usersList);

    // Filter users with matching route and departure time
    const filteredUsers = usersList.filter(user => 
        user.id !== userId && // Exclude the target user
        user.route === targetRoute && 
        user.departure_time === targetDepartureTime
    );

    console.log('Filtered Users:', filteredUsers);

    // Collect matched users with their matching hobby count
    const matchedUsers = filteredUsers.map(user => {
        const userHobbies = user.hobbies.split(' '); // Split hobbies string into an array
        const matchingHobbies = userHobbies.filter(hobby => targetHobbies.includes(hobby)).length;
        return { ...user, matchingHobbies };
    });

    console.log('Matched Users:', matchedUsers);

    // Sort matched users by the number of matching hobbies (descending order)
    matchedUsers.sort((a, b) => b.matchingHobbies - a.matchingHobbies);

    // Get non-matching users (different departure_time or route)
    const nonMatchingUsers = usersList.filter(user => 
        user.id !== userId && 
        (user.route !== targetRoute || user.departure_time !== targetDepartureTime)
    );

    // Combine the results: matching users first, then non-matching users
    const result = [...matchedUsers, ...nonMatchingUsers];

    return result;
}

// Example usage
findMatches('3f3c6aa1-257e-435f-bfda-cbe1d74850be').then(matches => {
    console.log('Matches:', matches); // Output: Sorted list of user objects
});