"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetcher } from "../lib/fetcher";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext) as any;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await fetcher(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    setUser(user);
    router.push("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
