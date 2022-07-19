import mongoose from 'mongoose';

const storySchema = mongoose.Schema({
    caption: String,
    username: String,
    userId: String,
    image: String,
    tags: [String],
    likes: {
        type: [String],
        default: [],
        createdAt: new Date()
    }
});

export default mongoose.model('Story', storySchema);

/*
{
 caption: String
 username: String
 userId: reference to userSchema
 image: String // url/path
 tags: [String]
 likes: {
    type: [String]
    default: []
    createdAt: new Date()
 }
}
 */