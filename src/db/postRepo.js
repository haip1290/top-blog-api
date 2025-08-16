import { PrismaClient } from "../../generated/prisma/index.js";
import { handleAuthorNotFoundError } from "./prismaErrorHandler.js";

const prisma = new PrismaClient();

const postRepo = {
  createPost: async (data) => {
    console.log("Inserting new post");
    try {
      const post = await prisma.post.create({ data });
      console.log("created post ", post.id);
      return post;
    } catch (error) {
      console.error("Error inserting new post ", error);
      handleAuthorNotFoundError(error.code, data.authorId);
      throw error;
    }
  },
  getAllActivePostByAuthor: async (authorId) => {
    console.log("Query all post by author ", authorId);
    try {
      const posts = await prisma.post.findMany({
        where: { authorId, isDeleted: false },
      });
      console.log("Found posts by author");
      return posts;
    } catch (error) {
      console.error("error query posts by author ", error);
      throw error;
    }
  },
  getAllActivePostByAuthorPaging: async (authorId, page = 1, size = 10) => {
    console.log(
      `Query all post by author ${authorId} page ${page} size ${size}`
    );
    try {
      const [posts, totalCount] = await prisma.$transaction([
        prisma.post.findMany({
          skip: size * (page - 1),
          take: size,
          where: { authorId, isDeleted: false },
        }),
        prisma.post.count({ where: { isDeleted: false } }),
      ]);
      console.log("Found posts by author");
      return { posts, totalCount };
    } catch (error) {
      console.error("error query posts by author ", error);
      throw error;
    }
  },
};

export default postRepo;
