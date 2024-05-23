"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";

export default function CreateForm() {
  const { createUser } = useAuthContext();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [created, setCreated] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleCreateUser(e) {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    } else {
      setError(null);
    }

    try {
      await createUser(username, password);
      setCreated(true);
      router.push("/login");

      // Clear input fields if new account created
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      console.error("Error creating user:", error.message);
      setError("Failed to create user");
    }
  }

  return (
    <div className="px-4 w-full">
      <div className="pt-10 xl:pt-40 flex flex-col mx-auto">
        <h3 className="font-semibold pb-6 text-center text-xl">
          Create new user account
        </h3>
        <form onSubmit={handleCreateUser} className="flex flex-col mx-auto">
          <label htmlFor="username" className="font-semibold">
            Username:
          </label>
          <input
            id="username"
            ref={usernameRef}
            type="text"
            className="max-w-[300px] border bordre-slate-300 px-2 py-1 mb-2"
          />

          <label htmlFor="password" className="font-semibold">
            Password:
          </label>
          <input
            id="password"
            ref={passwordRef}
            type="password"
            className="max-w-[300px] border bordre-slate-300 px-2 py-1"
          />
          <div className="max-w-[300px] mt-6 flex justify-end">
            <button
              type="submit"
              className="max-w-fit px-6 py-2 bg-[#005fa5] text-white"
            >
              Create account
            </button>
          </div>
        </form>
        {created && <div className="">User account created!</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="pt-4 text-center">
          <p>
            Already have an account? Go to{" "}
            <Link href="/login" className="underline text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
