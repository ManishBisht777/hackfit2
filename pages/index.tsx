import { db } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [goals, setGoals] = useState();

  const goalsRef = ref(db, "goals");
  onValue(goalsRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen"></main>
    </>
  );
}
