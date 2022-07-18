import mongoose from 'mongoose';

// define postSchema

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    name: { type: String, required: true },
    creator: { type: String, required: true },
    tags: { type: [String], required: true },
    createdAt: { type: Date, default: new Date() }
});

const Post = mongoose.model('Post', postSchema);

export default Post;

/**
 *
 {
     * title: 'My Post',
     * message: 'this is a message for my friend',
     * name: 'Linda',
     * creator: 'Kakai',
     * tags: ['friend', 'first_message'],
     * createdAt: new Date(), -- default value
 } 
 *
 */