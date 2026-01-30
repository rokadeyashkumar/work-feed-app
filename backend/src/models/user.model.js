import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        clerkID: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            reuqired: true,
            unique: true,
        },
        profilePiture: {
            type: String,
            default: "",
        },
        bannerImage: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
            maxLength: 200,
        },
        location:
        {
            type: String,
            default: "",
        },

        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
{ timestamps: true }
);
const User = mongoose.model("User",userSchema);

export default User;