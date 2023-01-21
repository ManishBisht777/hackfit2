import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { child, onValue, push, ref, set, update } from "firebase/database";
import { db } from "@/firebase/firebase";
import { useAppSelector } from "@/store/hooks";

interface Comment {
  userName: string;
  comment: string;
  photoUrl: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface Goal {
  name: string;
  description: string;
  comments: Array<Comment> | null;
  // user: User;
}

export default function Goals() {
  const router = useRouter();
  console.log(router.query);
  const { userId } = router.query;
  const user = useAppSelector((state) => state.auth.user);

  const [goal, setGoal] = useState<Goal>({
    name: "",
    description: "",
    comments: null,
    // user:{},
  });

  function writeGoal() {
    set(ref(db, "goals/" + userId), {
      name: "first Goal",
      description: "sample desc",
      comments: [],
      user: user,
    });
  }

  // function writeComment() {
  //   const updates = {};
  //   updates[`/goals/${user?.uid}`] = {
  //     name: "sample goal 3",
  //     description: "sample desc",
  //     comments: [],
  //   };
  //   update(ref(db), updates);
  // }

  useEffect(() => {
    if (!userId) return;

    // const goalRef = ref(db, `goals${userId}`);
    // onValue(goalRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    // });
  }, [userId]);

  return (
    <main>
      <p>user Id {userId}</p>

      <input type="text" placeholder="Goal" />
      <input type="text" placeholder="description" />
      <textarea placeholder="Step you will take for this" />

      <button onClick={() => writeGoal()}>Set Goal</button>
      {/* <button onClick={() => writeComment()}>update Goal</button> */}
    </main>
  );
}
