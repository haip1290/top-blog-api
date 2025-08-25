import { Prisma, PrismaClient } from "../../generated/prisma/index.js";
import {
  handleResourceExistsError,
  handleResourcerNotFoundError,
} from "./prismaErrorHandler.js";

const prisma = new PrismaClient();

const userRepo = {
  createUser: async (data) => {
    console.log("Inserting user into database");
    try {
      const user = await prisma.user.create({ data });
      console.log("Inserted user into database ", user.id);
      return user;
    } catch (error) {
      console.error("Error inserting user into database ", error);
      handleResourceExistsError(error.code, {
        resourceName: "user",
        resourceData: data.email,
      });
      throw error;
    }
  },
  createAuthor: async (data) => {
    try {
      console.log("Inserting author into database");
      const user = await prisma.user.create({
        data: { ...data, role: Prisma.role.AUTHOR },
      });
      console.log("Inserted author into database ", user.id);
      return user;
    } catch (error) {
      console.error("Error inserting author into database ", error);
      handleResourceExistsError(error.code, {
        resourceName: "user",
        resourceData: data.email,
      });
      throw error;
    }
  },
  getUserById: async (id) => {
    console.log("Query user by id");
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      console.log("Found user ", user.id);
    } else {
      console.log("User not found with id ", id);
    }

    return user;
  },
  getUserByEmail: async (email) => {
    console.log("Query user by email");
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      console.log("Found user ", user.id);
    } else {
      console.log("User not found with email ", email);
    }

    return user;
  },
  getAllActiveUsers: async () => {
    console.log("Query all undeleted users from database");
    const users = await prisma.user.findMany({ where: { isDeleted: false } });
    return users;
  },
  getAllActiveUsersPaging: async (page = 1, size = 10) => {
    console.log(
      `Query non deleted users from users with paging: page ${page}, size ${size}`
    );
    const [users, totalCount] = await prisma.$transaction([
      prisma.user.findMany({
        skip: (page - 1) * size,
        take: size,
        where: { isDeleted: false },
      }),
      prisma.user.count({ where: { isDeleted: false } }),
    ]);
    return { users, totalCount };
  },
  updateUser: async (id, data) => {
    console.log(`Update user ${id}`);
    try {
      const updatedUser = await prisma.user.update({ where: { id }, data });
      console.log(`updated user `, updatedUser.id);
      return updatedUser;
    } catch (error) {
      console.error("Error update user ", error);
      handleResourcerNotFoundError(error.code, {
        resourceName: "user",
        resourceData: id,
      });
      throw error;
    }
  },
  deleteUser: async (id) => {
    console.log(`update user ${id} isDeleted`);
    try {
      const updatedUser = await prisma.user.update({
        where: { id, isDeleted: false },
        data: { isDeleted: true },
      });
      console.log(
        `Updated user ${updatedUser.id} isDeleted: ${updatedUser.isDeleted}`
      );
      return updatedUser;
    } catch (error) {
      console.error("Error update user isDeleted ", error);
      handleResourcerNotFoundError(error.code, {
        resourceName: "user",
        resourceData: id,
      });
      throw error;
    }
  },
};

export default userRepo;
