import asyncHandler from "express-async-handler";
import commentRepo from "../db/commentRepo.js";
import { validatePostId } from "../validators/postValidator.js";

const commentToDTO = (comment) => ({
  id: comment.id,
  content: comment.content,
  userId: comment.userId,
  createAt: comment.createAt,
});

const commentController = {
  createComment: [
    validatePostId,
    asyncHandler(async (req, res) => {
      console.log("Creating comment");
      //   const userId = Number(req.user.id);
      const userId = 1;
      const { content } = req.body;
      const postId = Number(req.params.postId);
      const comment = await commentRepo.createComment({
        content,
        postId,
        userId,
      });
      console.log("Created new comment ", comment.id);
      return res.json({
        message: "created new comment",
        data: commentToDTO(comment),
      });
    }),
  ],
};

export default commentController;

export { commentToDTO };
