import { db } from "@/firebase/firebase";
import { useAppSelector } from "@/store/hooks";
import { Goal } from "@/types/types";
import { onValue, ref, set } from "firebase/database";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import chad from "../assets/chad.jpeg";

export default function Home() {
  const goalsRef = ref(db, "goals");
  const [userGoal, setUserGoal] = useState<Goal>();
  const [goalName, setGoalName] = useState<string>("");
  const [goalDesc, setGoalDesc] = useState<string>("");
  const [allGoals, setallGoals] = useState<any>([]);

  const user = useAppSelector((state) => state.auth);
  const writeGoal = () => {
    set(ref(db, "goals/" + user.id), {
      name: goalName,
      description: goalDesc,
      comments: [],
      user: user,
    });
  };

  useEffect(() => {
    onValue(goalsRef, (snapshot) => {
      const data = snapshot.val();
      const goalArr = [];
      if (data) {
        for (let value of Object.values(data)) {
          goalArr.push(value);
        }
      }

      setallGoals(goalArr);
    });
  }, [goalsRef]);

  useEffect(() => {
    if (!user.id) return;

    const goalsRef = ref(db, `goals/${user.id}`);

    onValue(goalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserGoal(data);
      }
    });
  }, [user]);

  return (
    <>
      <Head>
        <title>GoalToFit</title>
        <meta name="description" content="Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-[#fff9eb]">
        <section className="h-screen justify-center flex items-center p-[4rem] gap-[2rem] ">
          <div className="flex flex-col gap-4 w-[50%]">
            <h1 className="text-5xl flex gap-3 text-gray-600 flex-wrap font-bold">
              Transform Your <span className="text-[#d95d37]">Fitness</span>
              into Shape
            </h1>
            <p>Set your Goals and See what Others are aiming for</p>

            <button className="shadow-[5px_5px_0px_0px_#1a1a1a] w-fit border border-[#1a1a1a] px-10 py-2 text-[#1a1a1a]">
              Set Goal
            </button>
          </div>
          <div className="bg-[#1a1a1a] w-[25%] h-[70%] z-10 flex flex-col items-center gap-[2rem]">
            <div className="mt-[-2rem] mx-auto w-fit">
              <Image src={chad} alt="" />
            </div>
            <p className="text-gray-300 w-[10rem]">
              Achieve Your Goals be an Absolute Chad
            </p>
          </div>
          <div className="absolute top-0 right-0 h-full w-[27%] bg-[#d95d37]"></div>
        </section>

        <section className="bg-[#f6eade]">
          {userGoal ? (
            <div className="p-[3rem] ">
              <h2 className="text-3xl font-semibold p-3 px-[3rem] mb-[2rem] text-gray-600 w-fit">
                Here is Your Goal
              </h2>
              <div className="flex gap-[2rem] items-center justify-center">
                <img
                  className="w-[10rem]"
                  src={userGoal.user.photoUrl}
                  alt=""
                />
                <div className="w-[35rem]">
                  <p className="gap-2 text-xl text-gray-700">
                    ??? I
                    <span className="text-[#d95d37] mx-2 font-semibold">
                      {userGoal.user.userName}
                    </span>
                    Herby Declare that I will Achive my goal of
                    <span className="text-[#d95d37] mx-2 font-semibold">
                      {userGoal.name}
                    </span>
                    and will continue to work hard to achive the same ???
                  </p>
                </div>
              </div>
            </div>
          ) : !user.email ? (
            <div className="p-[3rem]">
              <p className="text-center text-xl">Login to Share your goal</p>
            </div>
          ) : (
            <div className="p-[3rem] bg-[#f6eade] flex flex-col gap-[1rem] items-center">
              <h2 className="text-gray-800 text-2xl text-center font-bold">
                Share Your Goal
              </h2>
              <div className="flex flex-col gap-3 w-[30%]">
                <input
                  onChange={(e) => setGoalName(e.target.value)}
                  type="text"
                  placeholder="Goal"
                  className="border px-4 py-2 border-[#1a1a1a] rounded-sm"
                />
                <input
                  onChange={(e) => setGoalDesc(e.target.value)}
                  type="text"
                  placeholder="description"
                  className="border px-4 py-2 border-[#1a1a1a] rounded-sm"
                />
                <button
                  className="w-fit text-[#f6eade] self-center px-10 py-2 bg-[#1a1a1a] rounded-sm"
                  onClick={() => writeGoal()}
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="p-[3rem] bg-[#1a1a1a] text-[#f6eade]">
          <h3 className="text-3xl text-[#d95d37] font-semibold text-center">
            Here is what other want
          </h3>
          <p className="text-center mt-[.5rem]">
            See what other people want to achieve and give them some tips to
            achieve that goal
          </p>
          <div className="flex flex-wrap mt-[1rem] gap-4">
            {allGoals &&
              allGoals.map((goal: Goal) => {
                return (
                  <div
                    className="flex flex-col justify-center items-center p-[2rem] text-lg w-[12rem] border border-[#d95d37] rounded-md gap-2"
                    key={goal.user.id}
                  >
                    <img
                      className="rounded-full w-[4rem]"
                      src={goal.user.photoUrl}
                      alt=""
                    />
                    <p className="text-[#d95d37] font-semibold">
                      {goal.user.userName}
                    </p>
                    <p className="text-gray-300 italic"> {goal.name} </p>
                  </div>
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
}
