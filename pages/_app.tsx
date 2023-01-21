import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { User } from "firebase/auth";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Component {...pageProps} />
    </>
  );
}
