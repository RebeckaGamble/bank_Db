"use client";
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function NavLinks() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = () => {
    handleLogout();
    router.push("/login");
  };
  return (
    <>
      <li>
        {isLoggedIn ? (
          <div className="flex flex-row gap-4">
            <button onClick={logoutHandler}>Logout</button>
            <Link href="/account"> My account </Link>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <Link href="/login">Login</Link>
            <Link href="/create">Create account </Link>
          </div>
        )}
      </li>
    </>
  );
}
