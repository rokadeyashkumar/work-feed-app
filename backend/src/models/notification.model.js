import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            reuqired: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            reuqired: true,
        },
        type: {
            type: String,
            reuqired: true,
            enum: ["follwo", "like", "comment"],
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: null,
        },
        Comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
            default: null,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;