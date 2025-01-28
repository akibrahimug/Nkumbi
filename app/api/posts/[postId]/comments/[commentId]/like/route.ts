import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";

interface Params {
  params: {
    postId: string;
    commentId: string;
  };
}

// Toggle like on a comment
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const comment = await Comment.findById(params.commentId);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const userLikedComment = comment.likes.includes(userId);
    const userDislikedComment = comment.dislikes.includes(userId);

    // Remove from dislikes if user previously disliked
    if (userDislikedComment) {
      comment.dislikes = comment.dislikes.filter(
        (id: string) => id.toString() !== userId
      );
    }

    // Toggle like
    if (userLikedComment) {
      comment.likes = comment.likes.filter(
        (id: string) => id.toString() !== userId
      );
    } else {
      comment.likes.push(userId);
    }

    await comment.save();
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update comment like" },
      { status: 500 }
    );
  }
}

// Toggle dislike on a comment
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const comment = await Comment.findById(params.commentId);

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const userLikedComment = comment.likes.includes(userId);
    const userDislikedComment = comment.dislikes.includes(userId);

    // Remove from likes if user previously liked
    if (userLikedComment) {
      comment.likes = comment.likes.filter(
        (id: string) => id.toString() !== userId
      );
    }

    // Toggle dislike
    if (userDislikedComment) {
      comment.dislikes = comment.dislikes.filter(
        (id: string) => id.toString() !== userId
      );
    } else {
      comment.dislikes.push(userId);
    }

    await comment.save();
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update comment dislike" },
      { status: 500 }
    );
  }
}
