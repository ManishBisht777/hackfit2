import React, { useState } from "react";
import { User, signInWithPopup } from "firebase/auth";
import { auth, providor } from "../firebase/firebase";

export default function Navbar() {
  const [user, setUser] = useState<User>();

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
