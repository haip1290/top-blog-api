import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

const throwUserNotFoundError = (error) => {
  if (error.code === "P2025") {
    throw new Error(`User with id ${id} not found`);
  }
};
const throwUserExistsError = (error) => {
  if (error.code === "P2002") {
    throw new Error(`User with email ${email} already exists`);
  }
};

const userRepo = {
  createUser: async ({ email, password, username }) => {
    console.log("Inserting user into database");
    try {
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password,
        },
      });
      console.log("Inserted user into database ", user.id);
      return user;
    } catch (error) {
      console.log("Error inserting user into database ", error);
      throwUserExistsError;
      throw error;
    }
  },
  getAllActiveUsers: async () => {
    console.log("Query all undeleted users from database");
    try {
      const users = await prisma.user.findMany({ where: { isDeleted: false } });
      return users;
    } catch (error) {
      console.log("Error querying undeleted users from database ", error);
      throw error;
    }
  },
  getAllActiveUsersPaging: async (page, size) => {
    console.log(
      `Query non deleted users from users with paging: page ${page}, size ${size}`
    );
    try {
      const users = await prisma.user.findMany({ where: { isDeleted: false } });
      return users;
    } catch (error) {
      console.log("Error querying non deleted users with paging", error);
      throw error;
    }
  },
  updateUser: async (id, data) => {
    console.log(`Update user ${id}`);
    try {
      const updatedUser = await prisma.user.update({ where: { id }, data });
      console.log(`updated user `, updatedUser.id);
      return updatedUser;
    } catch (error) {
      console.log("Error update user ", error);
      throwUserNotFoundError;
      throw error;
    }
  },
  deleteUser: async (id) => {
    console.log(`update user ${id} isDeleted`);
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { isDeleted: true },
      });
      console.log(
        `Updated user ${updatedUser.id} isDeleted: ${updatedUser.isDeleted}`
      );
      return updatedUser;
    } catch (error) {
      console.log("Error update user isDeleted ", error);
      throwUserNotFoundError;
      throw error;
    }
  },
};

export default userRepo;
