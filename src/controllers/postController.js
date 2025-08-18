import asyncHandler from "express-async-handler";
import postRepo from "../db/postRepo.js";
import { validatePagination } from "../validators/paginationValidator.js";
import { validateUserId } from "../validators/userValidator.js";
import { validatePostId } from "../validators/postValidator.js";

const postToDTO = (post) => ({
  id: post.id,
  title: post.title,
  content: post.content,
  authorId: post.authorId,
  isPublished: post.isPublished,
});

const postController = {
  createPost: asyncHandler(async (req, res) => {
    console.log("Creating post");
    // const authorId = Number(req.user.id);
    const authorId = 10;
    const { title, content, isPublished } = req.body;
    const data = {
      title,
      content,
      isPublished,
      authorId,
    };
    const newPost = await postRepo.createPost(data);
    console.log("Created new post ", newPost.id);
    return res
      .status(201)
      .json({ message: "created post", data: postToDTO(newPost) });
  }),
  getPostsByAuthorId: [
    validatePagination,
    validateUserId,
    asyncHandler(async (req, res) => {
      const authorId = Number(req.params.authorId);
      const { page, size } = req.query;
      console.log(`Getting all posts by author ${authorId} from DB`);
      const { posts, totalCount } =
        await postRepo.getAllActivePostByAuthorPaging(
          authorId,
          Number(page),
          Number(size)
        );
      if (posts.length === 0) {
        return res
          .status(404)
          .json({ message: "No posts found for this author" });
      }
      const postsDTO = posts.map((post) => postToDTO(post));
      return res.status(200).json({
        message: `Posts for author ${authorId}`,
        data: { post: postsDTO, totalCount },
      });
    }),
  ],
  publishPost: [
    validatePostId,
    asyncHandler(async (req, res) => {
      const postId = Number(req.params.postId);
      const { isPublished } = req.body;
      console.log(`Publish post ${postId}`);
      const updatedPost = await postRepo.updatePostPublishStatus(
        postId,
        isPublished
      );
      console.log(
        `Publish post ${updatedPost.id} is publish ${updatedPost.isPublished}`
      );
      return res.json({
        message: "Published post",
        data: postToDTO(updatedPost),
      });
    }),
  ],
};

export default postController;
