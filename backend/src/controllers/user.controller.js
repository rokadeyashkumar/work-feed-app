import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import Notification from "../models/notification.model.js";
import { clerkClient, getAuth } from "@clerk/express";

export const getUserProfile = asyncHandler(async (req,res) => {
    const { usernname } = req.params;
    const user = await User.findOne({ usernmae });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
});

export const updateProfile = asyncHandler(async (req,res) => {
    const { userId } = getAuth(req);

    const user = await User.findOneAndUpdate({ clerkID: userId }, req.ReportBody, { new: true });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
});

export const syncUser = asyncHandler(async(req,res) => {
    const { userId } = getAuth(req);

    // check if user already exists in mongodb
    const existingUser = await User.findOne({ clerkID: userId });
    if (existingUser) {
        return res.status(200).json({ user: existingUser, message: "User already existing" });
    }

    // create new user form clerk data
    const clerkUser = await clerkClient.users.getUser(userId);

    const userData = {
        clerkID: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
        profilePiture: clerkUser.imageUrl || "",
    };

    const user = await User.create(userData);
});

export const getCurrentUser = asyncHandler(async (req, res) =>{
    const { userId } = getAuth(req);
    const user = await User.findOne({ clerkID: userId });

    if (!user) return res.status(404).json({ error: "User not found "});

    res.status(200).json({ user });
});

export const followUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { targetUserId } = req.params;

  if (userId === targetUserId) return res.status(400).json({ error: "You cannot follow yourself" });

  const currentUser = await User.findOne({ clerkId: userId });
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) return res.status(404).json({ error: "User not found" });

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    // unfollow
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUser._id },
    }); 
  } else {
    // follow
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $push: { followers: currentUser._id },
    });

    // create notification
    await Notification.create({
      from: currentUser._id,
      to: targetUserId,
      type: "follow",
    });
  }

  res.status(200).json({
    message: isFollowing ? "User unfollowed successfully" : "User followed successfully",
  });
});