import React, { useEffect, useState } from "react";

export default function Part({ exercise }: any) {
  console.log(exercise, "ello");

  return (
    <div>
      {exercise &&
        exercise.map((ex: any, index: number) => {
          console.log(ex);
          return (
            <div className="" key={index}>
              <p className="text-xl text-[#d95d37] capitalize font-bold my-4">
                {ex.name}
              </p>
              <div className="flex gap-[1rem] flex-wrap">
                {ex.exercise.map((e: any) => {
                  return (
                    <div
                      key={e.name}
                      className="w-[7rem] h-[7rem] border p-2 shadow-[5px_5px_0px_0px_#1a1a1a] border-[#1a1a1a]"
                    >
                      <p>{e.name}</p>
                      <p>{e.sets} Sets</p>
                      <p>{e.reps} Reps</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
