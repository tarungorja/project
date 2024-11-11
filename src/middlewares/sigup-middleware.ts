import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    res.status(400).json({ message: "User with the Email exists!" });
    return;
  }

  next();
};
