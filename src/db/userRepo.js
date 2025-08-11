import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

const userRepo = {
  createUser: async ({ email, password, username }) => {
    console.log("Inserting user into database");
    try {
      const user = await prisma.user.create({
        data: { email, username, password },
      });
      console.log("Inserted user into database ", user.id);
      return user;
    } catch (error) {
      console.log("Error while inserting user into database ", error);
      throw error;
    }
  },
  getAllUsersNotDeleted: async () => {
    console.log("Query all undeleted users from database");
    try {
      const users = await prisma.user.findMany({ where: { isDeleted: false } });
      console.log("Found users from database");
      return users;
    } catch (error) {
      console.log("Error while querying undeleted users from database ", error);
      throw error;
    }
  },
  getAllUsersNotDeletedPaging: async (page, size) => {
    console.log(
      `Query non deleted users from users with paging: page ${page}, size ${size}`
    );
    try {
      const users = await prisma.user.findMany({ where: { isDeleted: false } });
      console.log("Found list of users with paging");
      return users;
    } catch (error) {
      console.log("Error query non deleted users with paging", error);
      throw error;
    }
  },
};

export default userRepo;
