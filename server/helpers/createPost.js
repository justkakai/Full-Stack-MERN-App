import Post from "../models/Post.js";

/**
 * @param {*} newPost 
 * @returns {mongoose.Document}
 */

const createPost = async (newPost) => {
    const post = await Post.create(newPost);
    return post;
}

export default createPost;