import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        content: [
            {
                contentTitle: { type: String, required: true },
                contentDescription: { type: String, required: true },
            }
        ],
        author: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        coverImage: {
            type: String, 
            required: true,
        },
        coverImageId: {
            type: String, 
            unique: true,

        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;