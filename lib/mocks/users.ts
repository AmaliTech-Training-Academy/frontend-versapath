const makeTestData = (i: number) => ({
  id: i,
  user: "John Doe",
  email: "favoureliab@gmail.com",
  role: ["Admin", "User", "Guest"][Math.floor(Math.random() * 3)],
  status: ["Active", "Inactive", "Suspended"][Math.floor(Math.random() * 3)],
  joinDate: "12/03/2023",
  stack: "string",
});
export const usersMockData = Array.from({ length: 100 }, (_, i) =>
  makeTestData(i)
);