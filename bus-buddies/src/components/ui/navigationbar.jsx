import React from "react";

export default function NavigationBar() {
    return (
        <nav>
        <ul>
            <li>
            <a href="/matches">Matches</a>
            </li>
            <li>
            <a href="/profile">Chats</a>
            </li>
            <li>
            <a href="/settings">My Profile</a>
            </li>
            <li>
            <a href="/signout">Sign Out</a>
            </li>
        </ul>
        </nav>
    );
    }