import { rest } from "msw";

export const handlers = [
  rest.post("https://mockapi.io/users", (req, res, ctx) => {
    const { firstName, lastName, email, personNumber, username, password } = req.body;

    if (!firstName || !lastName || !email || !personNumber || !username || !password) {
      return res(
        ctx.status(400),
        ctx.json({ error: "All fields are required." })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        id: Date.now(),
        firstName,
        lastName,
        email,
        personNumber,
        username,
      })
    );
  }),
];
