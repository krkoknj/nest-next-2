"use client";

import Link from "next/link";
import LogoutButton from "./Logout";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("User:", user);
  }, [user]);
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <LogoutButton />
            </li>
            <li>
              <Link href="/mypage/profile">Profile</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </>
        )}
        <li>
          <Link href="/boards">Boards</Link>
        </li>
      </ul>
    </nav>
  );
}
