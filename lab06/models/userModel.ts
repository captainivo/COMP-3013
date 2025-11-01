const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];


import { User } from "../interfaces/user";

const userModel = {
  findOne: (email: string): User | null => {
    const user = database.find((user) => user.email === email);
    return user || null;
  },
  findById: (id: number): User | null => {
    const user = database.find((user) => user.id === id);
    return user || null;
  },
};

export { database, userModel };
