import { PrismaClient } from "../../generated/prisma/index.js";
import {
  handleConstraintNotFoundError,
  handleResourcerNotFoundError,
} from "./prismaErrorHandler.js";
const prisma = new PrismaClient();

const commentRepo = {
  createComment: async (data) => {
    console.log("Insert new comment");
    try {
      const comment = await prisma.comment.create({ data });
      console.log("Created new comment ", comment.id);
      return comment;
    } catch (error) {
      console.error("Error insert new commnet ", error);
      handleConstraintNotFoundError(error.code, {
        resourceName: "post",
        resourceData: data.postId,
      });
      throw error;
    }
  },
  getCommentByPostIdPaging: async (postId, page = 1, size = 10) => {
    console.log(`Query comments from ${postId} page ${page} size ${size}`);
    try {
      const [comments, totalCount] = await prisma.$transaction([
        prisma.comment.findMany({
          where: { postId, isDeleted: false },
          skip: size * (page - 1),
          take: size,
        }),
        prisma.comment.count({ where: { postId, isDeleted: false } }),
      ]);
      console.log(`Found ${totalCount} comments from DB`);
      return { comments, totalCount };
    } catch (error) {
      console.error(`Error query comments from post ${postId} `, error);
      handleResourcerNotFoundError(error.code, {
        resourceName: "post",
        resourceData: postId,
      });
      throw error;
    }
  },
};

export default commentRepo;
