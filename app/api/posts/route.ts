import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Document, Types } from "mongoose";

// Import all models to ensure they are registered
import "@/models/User";
import "@/models/Post";
import "@/models/Comment";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  username?: string;
  location?: string;
}

interface IComment extends Document {
  _id: Types.ObjectId;
  userId: IUser;
  content: string;
  createdAt: Date;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  replies: IComment[];
}

interface IPost extends Document {
  _id: Types.ObjectId;
  userId: IUser;
  content: string;
  media?: string;
  createdAt: Date;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  comments: IComment[];
}

// Get all posts
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    // Get all posts with populated user data and comments
    const posts = await Post.find()
      .populate("userId", "name username location") // Get user details for posts
      .populate({
        path: "comments",
        populate: [
          {
            path: "userId",
            select: "name username location",
          },
          {
            path: "replies",
            populate: {
              path: "userId",
              select: "name username location",
            },
          },
        ],
      })
      .sort({ createdAt: -1 }); // Sort by newest first

    // Transform the data to match the frontend requirements
    const transformedPosts = posts.map((post) => {
      const isAuthor = session?.user?.id === post.userId?._id.toString();
      const userId = session?.user?.id
        ? new Types.ObjectId(session.user.id)
        : null;

      return {
        id: post._id.toString(),
        author: post.userId?.name || "Unknown User",
        username: post.userId?.username,
        location: post.userId?.location,
        content: post.content,
        media: post.media,
        timestamp: post.createdAt.toISOString(),
        likes: post.likes.length,
        dislikes: post.dislikes.length,
        userVote: userId
          ? post.likes.some((id: Types.ObjectId) => id.equals(userId))
            ? "like"
            : post.dislikes.some((id: Types.ObjectId) => id.equals(userId))
            ? "dislike"
            : "none"
          : "none",
        isAuthor,
        replies: post.comments.map((comment: IComment) => ({
          id: comment._id.toString(),
          author: comment.userId?.name || "Unknown User",
          username: comment.userId?.username,
          location: comment.userId?.location,
          content: comment.content,
          timestamp: comment.createdAt.toISOString(),
          likes: comment.likes.length,
          dislikes: comment.dislikes.length,
          userVote: userId
            ? comment.likes.some((id: Types.ObjectId) => id.equals(userId))
              ? "like"
              : comment.dislikes.some((id: Types.ObjectId) => id.equals(userId))
              ? "dislike"
              : "none"
            : "none",
          isAuthor: session?.user?.id === comment.userId?._id.toString(),
          replies: comment.replies?.map((reply: IComment) => ({
            id: reply._id.toString(),
            author: reply.userId?.name || "Unknown User",
            username: reply.userId?.username,
            location: reply.userId?.location,
            content: reply.content,
            timestamp: reply.createdAt.toISOString(),
            likes: reply.likes.length,
            dislikes: reply.dislikes.length,
            userVote: userId
              ? reply.likes.some((id: Types.ObjectId) => id.equals(userId))
                ? "like"
                : reply.dislikes.some((id: Types.ObjectId) => id.equals(userId))
                ? "dislike"
                : "none"
              : "none",
            isAuthor: session?.user?.id === reply.userId?._id.toString(),
          })),
        })),
      };
    });

    return NextResponse.json(transformedPosts);
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// Create a new post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();

    const post = await Post.create({
      ...data,
      userId: session.user.id,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
