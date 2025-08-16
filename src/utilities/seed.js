import { PrismaClient } from "../../generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = Number(process.env.SALT);
const password = process.env.ADMIN_PWD;

// initialze an author at start of the app
const initializeAuthor = async () => {
  console.log("Initialzing author");
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const author = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "AUTHOR",
    },
  });
  console.log("Created author ");
};

initializeAuthor()
  .catch((error) => {
    console.error("Error creating author ", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
