import { useRouter } from "next/router";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "@/firebase/firebase";

interface Comment {
  userName: string;
  comment: string;
  photoUrl: string;
}

interface Goal {
  name: string;
  description: string;
  // steps:Array<string> | null,
  comments: Array<Comment> | null;
}

export default function Goals() {
  const router = useRouter();
  console.log(router.query);
  const { userId } = router.query;

  const [goal, setGoal] = useState<Goal>({
    name: "",
    description: "",
    // steps:null,
    comments: null,
  });

  function writeGoal() {
    set(ref(db, "goals/" + userId), {
      name: "sample gaol",
      description: "sample desc",
      comments: [],
    });
  }

  return (
    <main>
      <p>user Id {userId}</p>

      <input type="text" placeholder="Goal" />
      <input type="text" placeholder="description" />
      <textarea placeholder="Step you will take for this" />

      <button onClick={() => writeGoal()}>Set Goal</button>
    </main>
  );
}
