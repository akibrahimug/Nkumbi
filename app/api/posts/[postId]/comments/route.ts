import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";

interface Params {
  params: {
    postId: string;
  };
}

// Get all comments for a post
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const comments = await Comment.find({ postId: params.postId })
      .populate("userId", "name")
      .populate({
        path: "replies",
        populate: {
          path: "userId",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// Create a new comment
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    const { content, parentCommentId } = data;

    const post = await Post.findById(params.postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Create the comment
    const comment = await Comment.create({
      content,
      userId: session.user.id,
      postId: params.postId,
      parentCommentId: parentCommentId || null,
    });

    // If this is a reply to another comment, update the parent comment's replies
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id },
      });
    }

    // Update the post's comments array
    await Post.findByIdAndUpdate(params.postId, {
      $push: { comments: comment._id },
    });

    // Populate the user information
    await comment.populate("userId", "name");

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
