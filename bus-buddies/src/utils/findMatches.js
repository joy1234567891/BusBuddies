import { createClient } from '@supabase/supabase-js'; // Import createClient

// Initialize Supabase client
const supabaseUrl = 'https://mhxwhdyuafhxkttetszu.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oeHdoZHl1YWZoeGt0dGV0c3p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NjY4NzcsImV4cCI6MjA1NzA0Mjg3N30.q5QQZleJ0wMLOp14ccs9ZmT2QcLSg18I4YQN7oa0Do4'; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to convert time string to minutes since midnight
function timeToMinutes(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes, seconds] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
}

// Helper function to calculate time difference in minutes
function timeDifferenceInMinutes(time1, time2) {
    return Math.abs(timeToMinutes(time1) - timeToMinutes(time2));
}

export async function findMatches(userId) {
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

    // Filter users with matching route and departure time difference less than 30 minutes
    const filteredUsers = usersList.filter(user =>
        user.id !== userId && // Exclude the target user
        user.route === targetRoute &&
        timeDifferenceInMinutes(user.departure_time, targetDepartureTime) <= 30
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

    return matchedUsers;
}

export async function nonMatches(userId) {
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

    // Fetch all users from the Supabase table
    const { data: usersList, error: usersError } = await supabase
        .from('user_profile')
        .select('*');

    if (usersError) {
        console.error('Error fetching users:', usersError);
        return [];
    }

    // Get non-matching users
    const nonMatchingUsers = usersList.filter(user =>
        user.id !== userId &&
        (user.route !== targetRoute || timeDifferenceInMinutes(user.departure_time, targetDepartureTime) > 30)
    );

    // Separate users into two groups:
    // 1. Same route but departure time difference > 30 minutes
    // 2. Different route
    const sameRouteNonMatches = nonMatchingUsers.filter(user => user.route === targetRoute);
    const differentRouteNonMatches = nonMatchingUsers.filter(user => user.route !== targetRoute);

    // Combine the results: same route non-matches first, then different route non-matches
    const result = [...sameRouteNonMatches, ...differentRouteNonMatches];

    return result;
}

// Example usage
findMatches('1be0ddeb-3625-443c-bcd9-963740af4fba').then(matches => {
    console.log('Matches:', matches); // Output: Sorted list of user objects
});

nonMatches('1be0ddeb-3625-443c-bcd9-963740af4fba').then(nonmatches => {
    console.log('Non-Matches:', nonmatches);
});