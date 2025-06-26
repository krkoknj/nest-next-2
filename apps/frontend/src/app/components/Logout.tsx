"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {};

  return <button onClick={handleLogout}>Logout</button>;
}
