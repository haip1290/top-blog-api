import asyncHandler from "express-async-handler";
import postRepo from "../db/postRepo.js";

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
    const { title, content } = req.body;
    const data = {
      title,
      content,
      authorId,
    };
    const newPost = await postRepo.createPost(data);
    console.log("Created new post ", newPost.id);
    return res
      .status(201)
      .json({ message: "created post", data: postToDTO(newPost) });
  }),
  getPostByAuthorId: asyncHandler(async (req, res) => {
    const authorId = Number(req.params.authorId);
    const { page, size } = req.query;
    const validSize = Number(size);
    if (!page || !size || isNaN(page) || isNaN(validSize)) {
      return res
        .status(400)
        .json({
          message: "Invalid page or size",
          errors: "Invalid page or size",
        });
    }
    if (isNaN(authorId)) {
      return res
        .status(400)
        .json({ message: "Invalid author ID ", errors: "Invalid author Id" });
    }
    console.log(`Getting all posts by author ${authorId} from DB`);
    const { posts, totalCount } = await postRepo.getAllActivePostByAuthorPaging(
      authorId,
      page,
      validSize
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
};

export default postController;
