import { Prisma, PrismaClient } from "../../generated/prisma/index.js";
import {
  handleUserExistsError,
  handleUserNotFoundError,
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
      handleUserExistsError(error.code, data.email);
      throw error;
    }
  },
  createAuthor: async (data) => {
    try {
      console.log("Inserting author into database");
      const user = await prisma.user.create({ data, role: Prisma.role.AUTHOR });
      console.log("Inserted author into database ", user.id);
      return user;
    } catch (error) {
      console.error("Error inserting author into database ", error);
      handleUserExistsError(error.code, data.email);
    }
  },
  getAllActiveUsers: async () => {
    console.log("Query all undeleted users from database");
    try {
      const users = await prisma.user.findMany({ where: { isDeleted: false } });
      return users;
    } catch (error) {
      console.error("Error querying undeleted users from database ", error);
      throw error;
    }
  },
  getAllActiveUsersPaging: async (page = 1, size = 10) => {
    console.log(
      `Query non deleted users from users with paging: page ${page}, size ${size}`
    );
    try {
      const [users, totalCount] = await prisma.$transaction([
        prisma.user.findMany({
          skip: (page - 1) * size,
          take: size,
          where: { isDeleted: false },
        }),
        prisma.user.count({ where: { isDeleted: false } }),
      ]);
      return { users, totalCount };
    } catch (error) {
      console.error("Error querying non deleted users with paging", error);
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
      console.error("Error update user ", error);
      handleUserNotFoundError(error.code, id);
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
      console.error("Error update user isDeleted ", error);
      handleUserNotFoundError(error.code, id);
      throw error;
    }
  },
};

export default userRepo;
