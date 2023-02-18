import { hash } from "bcrypt";

import USER from "../models/USERS.js";

const user = [
  {
    email: "user1@example.com",
    name: "John",
    lastName: "Doe",
    password: "Abcdefg1",
  },
  {
    email: "user2@example.com",
    name: "Jane",
    lastName: "Doe",
    password: "HgfedcB2",
  },
  {
    email: "user3@example.com",
    name: "Jim",
    lastName: "Smith",
    password: "GhiJkLm3",
  },
  {
    email: "user4@example.com",
    name: "Jake",
    lastName: "Johnson",
    password: "MnLkJiG4",
  },
  {
    email: "user5@example.com",
    name: "Jessica",
    lastName: "Williams",
    password: "5GfEdCbH",
  },
  {
    email: "user6@example.com",
    name: "James",
    lastName: "Brown",
    password: "6BcDeFgA",
  },
  {
    email: "user7@example.com",
    name: "Jill",
    lastName: "Davis",
    password: "7AeFgHcB",
  },
  {
    email: "user8@example.com",
    name: "Joan",
    lastName: "Miller",
    password: "8HgFdCbA",
  },
  {
    email: "user9@example.com",
    name: "Johnnie",
    lastName: "Wilson",
    password: "9BgHcDeF",
  },
  {
    email: "user10@example.com",
    name: "Jordan",
    lastName: "Moore",
    password: "10CdEfGhA",
  },
  {
    email: "user11@example.com",
    name: "Julie",
    lastName: "Taylor",
    password: "11AfGdHcB",
  },
  {
    email: "user12@example.com",
    name: "Justin",
    lastName: "Anderson",
    password: "12BgHeFdC",
  },
  {
    email: "user13@example.com",
    name: "Jackie",
    lastName: "Thomas",
    password: "13CdFgAeH",
  },
  {
    email: "user14@example.com",
    name: "Jasmine",
    lastName: "Jackson",
    password: "14DeGhBfC",
  },
  {
    email: "user15@example.com",
    name: "Jayden",
    lastName: "White",
    password: "15EfHgCdA",
  },
  {
    email: "user16@example.com",
    name: "Jenna",
    lastName: "Harris",
    password: "16FgHeDcB",
  },
  {
    email: "user17@example.com",
    name: "Jeremiah",
    lastName: "Young",
    password: "17GdAfHcE",
  },
  {
    email: "user18@example.com",
    name: "Jessica",
    lastName: "Allen",
    password: "18HeBgDfF",
  },
  {
    email: "user19@example.com",
    name: "Joel",
    lastName: "King",
    password: "19AfCdGgH",
  },
  {
    email: "email@asd.com",
    name: "nameDTOSchema",
    lastName: "surnameDTOSchema",
    password: "Test1234",
  },
  {
    email: "aloja@asd.com",
    name: "pancho",
    lastName: "vila",
    password: "Test123",
  },
  {
    email: "mandrake@asd.com",
    name: "mandrake",
    lastName: "elmago",
    password: "Test12345",
  },
];

export async function mapUserTesting() {
  user.map(async (u) => {
    const hashedPassword = await hash(u.password, 10);
    await USER.create({ ...u, password: hashedPassword });
  });
}
