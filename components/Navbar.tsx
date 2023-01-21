import React, { useState } from "react";
import { User, signInWithPopup } from "firebase/auth";
import { auth, providor } from "../firebase/firebase";
import Link from "next/link";

interface authProp {
  user: User | undefined;
  setUser: (value: User) => void;
}

export default function Navbar({ user, setUser }: authProp) {
  const handleJoin = async () => {
    signInWithPopup(auth, providor)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <nav>
      <p>Lorem ipsum dolor sit amet</p>

      <Link href={`/${user?.uid}`}> Set Yor Goal</Link>

      {user ? (
        <div>
          <span>{user.displayName}</span>
          <img
            className="rounded-full"
            src={user.photoURL ? user.photoURL : ""}
            alt=""
          />
        </div>
      ) : (
        <button onClick={() => handleJoin()}>Login</button>
      )}
    </nav>
  );
}
