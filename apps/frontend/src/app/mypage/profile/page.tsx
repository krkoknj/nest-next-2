"use client";
import { fetcher } from "@/app/lib/fetcher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile {
  id: number;
  email: string;
  name: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/users/profile`)
      .then((data) => {
        if (!data) {
          router.push("/login");
          return;
        }
        setUserProfile(data);
      })
      .catch(() => {
        router.push("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Id: {userProfile?.id}</p>
      <p>Email: {userProfile?.email}</p>
      <p>Name: {userProfile?.name}</p>
    </div>
  );
}
