import mongoose from 'mongoose';

import Post from "../models/Post.js";
import createPost from "../helpers/createPost.js";


export const getPosts = async (req, res) => {
    try {
        const postMessages = await Post.find();
        res.status(200).json(postMessages);
    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
}

export const addPost = async (req, res) => {
    const { title, message, name, tags } = req.body;

    try {
        const createdPost = {
            title,
            message,
            name,
            creator: req.user.username,
            tags: tags.split(','),
            createdAt: new Date()
        };

        const savedPost = await createPost(createdPost);

        res.status(201).json({
            message: 'Your post has been created :)',
            savedPost
        })
    } catch (err) {
        res.status(409).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}

export const editPost = async (req, res) => {
    /* const toUpdate = await Post.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json(toUpdate); */
    const { id: _id } = req.params;
    const update = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with the given id has been found');

    try {
        /* const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true }); */
        const post = await Post.findById(_id);
        // is the logged in user the one editing their post or not?
        if (post.creator === req.user.username) {
            const updatedPost = await Post.findByIdAndUpdate(_id, update, { new: true });
            res.status(200).json(updatedPost);
        } else {
            res.status(203).json({ message: "not authorized" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const removePost = async (req, res) => {
    /* const toDelete = await Post.deleteOne({ title: req.body.title });
    res.status(200).json(toDelete); */
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the given id has been found');

    try {
        await Post.findByIdAndRemove(id);
        res.status(200).json({ message: "post has been removed" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with the given id has been found');

    try {
        const post = await Post.findById(id);
        // check if the logged in user did not like this post before
        const index = post.likes.findIndex((userId) => userId === String(req.user.id));
        if (index === -1) {
            post.likes.push(req.user.id);
        } else {
            post.likes = post.likes.filter((userId) => userId !== String(req.user.id))
        }
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
