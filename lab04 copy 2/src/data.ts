import type { TTip } from "./types";
import { randomUUID, RandomUUIDOptions } from "crypto";

// DONE: replace any with the correct type here!
let tips: TTip[] = [
  {
    id: randomUUID(),
    text: "Prefer const over let when you can.",
    likes: 2,
    createdAt: Date.now() - 10000,
  },
  {
    id: randomUUID(),
    text: "Name things clearly, future you will thank you.",
    likes: 5,
    createdAt: Date.now() - 5000,
  },
];

export function getTips() {
  return tips;
}

// DONE: replace any with the correct type here!
export function addTip(text: string) {
  // DONE: 🚀 Create a tip of type of TTIP and push into tips.
  //          - id: generate a random id using node crypto
  //          - text: use incoming text
  //          - likes: by default should be 0
  //          - createdAt: just use Date.now()
  //       return the created tip when you're done.
  const newTip: TTip = {
    id: randomUUID(),
    text: text,
    likes: 0,
    createdAt: Date.now(),
  };
  tips.push(newTip);
  return newTip;
}

// DONE: replace any with the correct type here!
export function like(id: string) {
  // DONE: 🚀 Find the tip from tips, based on id.
  //          - increment the number of likes
  //          - return the found and liked tip
  const tip = tips.find((tip) => tip.id === id);
  if (tip) {
    tip.likes += 1;
    return tip;
  }
  return null;
}

// DONE: replace any with the correct type here!
export function dislike(id: string) {
  // DONE: 🚀 Find the tip from tips, based on id.
  //          - decrement the number of likes if greater than 0
  //          - return the found and disliked tip
  const tip = tips.find((tip) => tip.id == id);
  if (tip && tip.likes >= 1) {
    tip.likes -= 1;
    return tip;
  }
  return null;
}

export function remove(id: string) {
  // DONE: 🚀 - remove the tip from tips by id by using .filter.
  //          - filter should give you back an array of all tips
  //            MINUS the one you are trying to remove. set tips
  //            equal to this newly filtered list.
  //          - return true if removed, false if no change.
  tips = tips.filter((tip) => tip.id !== id);
  return true;

}
