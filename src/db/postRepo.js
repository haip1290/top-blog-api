import { PrismaClient } from "../../generated/prisma/index.js";
import {
  handleConstraintNotFoundError,
  handleResourcerNotFoundError,
} from "./prismaErrorHandler.js";

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
      handleConstraintNotFoundError(error.code, data.authorId, "author");
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
        prisma.post.count({ where: { authorId, isDeleted: false } }),
      ]);
      console.log("Found posts by author");
      return { posts, totalCount };
    } catch (error) {
      console.error("error query posts by author ", error);
      throw error;
    }
  },
  updatePost: async (postId, data) => {
    console.log(`Updating post ${postId} content for post `);
    try {
      const updatedPost = await prisma.post.update({
        data,
        where: { id: postId, isDeleted: false },
      });
      console.log(`Updated post ${updatedPost.id}`);
      return updatedPost;
    } catch (error) {
      console.error("Error updating post ", error);
      handleResourcerNotFoundError(error.code, postId, "post");
      throw error;
    }
  },
  updatePostPublishStatus: async (postId, isPublished) => {
    console.log(`Update post ${postId} change publish status`);
    try {
      const updatedPost = await prisma.post.update({
        data: { isPublished },
        where: { id: postId, isDeleted: false },
      });
      console.log(`Updated post ${updatedPost.id}`);
      return updatedPost;
    } catch (error) {
      console.error("Error update post change publish status ", error);
      handleConstraintNotFoundError(error.code, postId, "post");
      throw error;
    }
  },
  updatePostDeleteStatus: async (postId) => {
    console.log(`Update post ${postId}, change delete status`);
    try {
      const deletedPost = await prisma.post.update({
        data: { isDeleted: true },
        where: { id: postId, isDeleted: false },
      });
      console.log(`Updated post ${deletedPost.id}`);
      return deletedPost;
    } catch (error) {
      console.error(`Error updating post deleted status`, error);
      handleResourcerNotFoundError(error.code, postId, "post");
      throw error;
    }
  },
};

export default postRepo;
