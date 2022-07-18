import Post from "../models/Post.js";
import createPost from "../helpers/createPost.js";


export const getPosts = (req, res) => {
    res.json({
        id: req.userId,
        message: 'all posted messages'
    });
}

export const addPost = async (req, res) => {
    const { title, message, name, creator, tags } = req.body;

    const createdPost = {
        title,
        message,
        name,
        creator,
        tags: tags.split(','),
        createdAt: new Date()
    };

    const savedPost = await createPost(createdPost);

    res.status(201).json({
        message: 'Your post has been created :)',
        savedPost
    })
}

export const editPost = async (req, res) => {
    const toUpdate = await Post.updateOne({ title: req.body.title }, { $set: req.body });
    res.status(200).json(toUpdate);
}

export const removePost = async (req, res) => {
    const toDelete = await Post.deleteOne({ title: req.body.title });
    res.status(200).json(toDelete);
}
