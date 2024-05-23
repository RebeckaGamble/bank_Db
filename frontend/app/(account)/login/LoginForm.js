"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser, setSessionToken, setIsLoggedIn } = useAuthContext();
  const router = useRouter();

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Wrong username or password.");
      return;
    }

    try {
      const { sessionToken } = await loginUser(username, password);
      setIsLoggedIn(true);
      setSessionToken(sessionToken);

      router.push("/account");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Failed to login");
    }
  };

  return (
    <div className="px-4 w-full">
      <div className="pt-10 xl:pt-40 flex flex-col mx-auto">
        <h3 className="font-semibold pb-6 text-center text-xl">
          Login to your user account
        </h3>
        <form
          action=""
          onSubmit={handleLoginUser}
          className="flex flex-col mx-auto"
        >
          <label htmlFor="username" className="font-semibold">
            Username:{" "}
          </label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="max-w-[300px] border bordre-slate-300 px-2 py-1 mb-2"
          />
          <label htmlFor="password" className="font-semibold">
            Password:{" "}
          </label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="max-w-[300px] border bordre-slate-300 px-2 py-1"
          />

          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="max-w-[300px] mt-6 flex justify-end">
            <button className="max-w-fit px-6 py-2 text-white">Log in</button>
          </div>
        </form>

        <div className="pt-4 text-center">
          <p>
            Don't have an account? Go to{" "}
            <Link href="/create" className="underline text-blue-700">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
