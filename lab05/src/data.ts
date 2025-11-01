import type { TTip } from "./types";
import { randomUUID } from "crypto";

type TUser = { id: string; username: string; password: string; tips: TTip[] };

let database: TUser[] = [
  {
    id: "A0328Xhf8",
    username: "jimmy123",
    password: "jimmy123!",
    tips: [
      {
        id: "1",
        text: "Prefer const over let when you can.",
        likes: 2,
        createdAt: Date.now() - 10000,
      },
    ],
  },
  {
    id: "BFGZ8328X",
    username: "sandra123",
    password: "sandra123!",
    tips: [
      {
        id: "2",
        text: "Name things clearly, future you will thank you.",
        likes: 5,
        createdAt: Date.now() - 5000,
      },
    ],
  },
];

// TODO: Add a userId field and modify inner logic to use it
export function getTips(userId: string) {
  console.log("Getting tips for user:", userId);
  const user = database.find((user) => user.username === userId);
  return user?.tips ?? [];
}

// TODO: Add a userId field and modify inner logic to use it
export function addTip(text: string, userId: string) {
  const tip: TTip = {
    id: randomUUID(),
    text: text,
    likes: 0,
    createdAt: Date.now(),
  };
  database[0]?.tips.push(tip);
  return tip;
}

// TODO: Add a userId field and modify inner logic to use it
export function like(id: string, userId: string) {
  const foundTip = database.find((user) => user.id === userId)?.tips.find((tip) => tip.id === id);
  if (foundTip) {
    foundTip.likes++;
  }
  return foundTip;
}

// TODO: Add a userId field and modify inner logic to use it
export function dislike(id: string, userId: string) {
  const foundTip = database.find((user) => user.id === userId)?.tips.find((tip) => tip.id === id);
  if (foundTip) {
    foundTip.likes--;
  }
  return foundTip;
}

// TODO: Add a userId field and modify inner logic to use it
export function remove(id: string, userId: string) {
  const user = database.find((user) => user.id === userId);
  const tipToDelete = user?.tips.findIndex((tip) => tip.id === id);
  if (tipToDelete != undefined && tipToDelete != -1) {
    user?.tips.splice(tipToDelete, 1);
  }
}

export function search(userName: string, password: string) {
  if(database.find((user) => user.username === userName && user.password === password)) {
    return true;
  } else {
    return false;
  }
}
