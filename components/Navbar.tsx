import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, providor } from "../firebase/firebase";
import Link from "next/link";
import { setUser } from "@/store/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);

  const handleJoin = async () => {
    signInWithPopup(auth, providor)
      .then((result) => {
        dispatch(
          setUser({
            userName: result.user.displayName,
            email: result.user.email,
            id: result.user.uid,
            photoUrl: result.user.photoURL,
          })
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    const userRes = localStorage.getItem("user") || "";

    dispatch(setUser(JSON.parse(userRes)));
  }, []);

  return (
    <nav className="bg-gray-300">
      <p>Lorem ipsum dolor sit amet</p>

      {user.email ? (
        <div>
          <div className="bg-red-300">
            <span>{user.userName}</span>
            <img
              className="rounded-full"
              src={user.photoUrl ? user.photoUrl : ""}
              alt=""
            />
          </div>
          <Link href={`/${user?.id}`}> Set Yor Goal</Link>
        </div>
      ) : (
        <button
          className="p-1 bg-black text-white"
          onClick={() => handleJoin()}
        >
          Login
        </button>
      )}
    </nav>
  );
}
