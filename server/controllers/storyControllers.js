import mongoose from 'mongoose';

import Story from "../models/Story.js";


export const getStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
}

export const addStory = async (req, res) => {
    const { caption, image, tags } = req.body;

    try {
        const newStory = await Story.create({
            caption,
            username: req.user.username,
            userId: req.user.id,
            image,
            tags: tags.split(' '),
        });

        res.status(201).json(newStory);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const editStory = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No story with the given id has been found');

    try {
        const story = await Story.findById(id);
        // is the logged in user the one editing their story or not?
        if (story.username === req.user.username) {
            const updatedStory = await Story.findByIdAndUpdate(id, update, { new: true });
            res.status(200).json(updatedStory);
        } else {
            res.status(203).json({ message: "not authorized" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const removeStory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No story with the given id has been found');

    try {
        await Story.findByIdAndRemove(id);
        res.status(200).json({ message: "story has been removed" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const likeStory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No story with the given id has been found');

    try {
        const story = await Story.findById(id);
        // check if the logged in user did not like this story before
        const index = story.likes.findIndex((userId) => userId === String(req.user.id));
        if (index === -1) {
            story.likes.push(req.user.id);
        } else {
            story.likes = story.likes.filter((userId) => userId !== String(req.user.id))
        }
        const updatedStory = await Story.findByIdAndUpdate(id, story, { new: true });
        res.status(200).json(updatedStory);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
