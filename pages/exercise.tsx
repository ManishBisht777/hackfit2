import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import Part from "@/components/part";

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
    <main className="p-[3rem] pt-[7rem]">
      {exercise &&
        exercise.map((exercise: any, index: number) => {
          return <Part key={index} exercise={exercise.exercise} />;
        })}
    </main>
  );
}
