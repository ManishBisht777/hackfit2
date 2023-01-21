import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import Part from "@/components/part";
import Head from "next/head";

export default function Exercise() {
  const [exercise, setExercise] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(firestore, "gym"));

      let exerciseData: any = [];
      querySnapshot.forEach((doc) => {
        exerciseData.push(doc.data());
      });

      setExercise(exerciseData);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Exercise</title>
        <meta name="description" content="Exercise Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-[3rem] pt-[7rem]">
        {exercise &&
          exercise.map((exercise: any, index: number) => {
            return <Part key={index} exercise={exercise.exercise} />;
          })}
      </main>
    </>
  );
}
