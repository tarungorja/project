import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { schemaValidator } from "../middlewares/schemaValidator";
import { signupSchema } from "../schemas/signup_schema";
import { validateUser } from "../middlewares/sigup-middleware";


const indexRouter = Router();

const prisma = new PrismaClient();

indexRouter.get('/', async (req: Request, res: Response) => {
  res.send("helvsdvo");
});

indexRouter.post("/sign-up", schemaValidator(signupSchema), validateUser, async (req: Request, res: Response) => {
  const { password, email } = req.body;
  const user = await prisma.users.create({
    data: {
      email,
      password
    }
  });
  const { id, ...userWithoutId } = user;
  res.status(200).json({
    message: 'User created successfully!',
    email: userWithoutId.email,
  });
});


export default indexRouter;