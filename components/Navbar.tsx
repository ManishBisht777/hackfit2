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

    if (userRes === "") return;

    dispatch(setUser(JSON.parse(userRes)));
  }, [dispatch]);

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between px-[4rem] py-[1.5rem] items-center">
      <h1 className="text-gray-600 text-3xl font-bold flex ">
        Goal <span className="text-[#d95d37] font-extrabold">To</span>Fit
      </h1>

      <ul className="flex gap-5 text-gray-600">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">About</Link>
        </li>
        <li>
          <Link href="/">Set Goal</Link>
        </li>
        <li>
          <Link href="/">View Goals</Link>
        </li>
        <li>
          <Link href="/exercise">Exercise</Link>
        </li>
      </ul>
      {user.email ? (
        <div>
          <div className="flex ">
            <img
              className="rounded-full w-[2.5rem] z-10"
              src={user.photoUrl ? user.photoUrl : ""}
              alt=""
            />
          </div>
          {/* <Link href={`/${user?.id}`}> Set Yor Goal</Link> */}
        </div>
      ) : (
        <button
          className="py-2 px-8 bg-[#1a1a1a] text-white z-10"
          onClick={() => handleJoin()}
        >
          Login
        </button>
      )}
    </nav>
  );
}
