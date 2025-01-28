import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";

interface Params {
  params: {
    postId: string;
  };
}

// Toggle like on a post
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const post = await Post.findById(params.postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const userLikedPost = post.likes.includes(userId);
    const userDislikedPost = post.dislikes.includes(userId);

    // Remove from dislikes if user previously disliked
    if (userDislikedPost) {
      post.dislikes = post.dislikes.filter(
        (id: string) => id.toString() !== userId
      );
    }

    // Toggle like
    if (userLikedPost) {
      post.likes = post.likes.filter((id: string) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post like" },
      { status: 500 }
    );
  }
}

// Toggle dislike on a post
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const post = await Post.findById(params.postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const userLikedPost = post.likes.includes(userId);
    const userDislikedPost = post.dislikes.includes(userId);

    // Remove from likes if user previously liked
    if (userLikedPost) {
      post.likes = post.likes.filter((id: string) => id.toString() !== userId);
    }

    // Toggle dislike
    if (userDislikedPost) {
      post.dislikes = post.dislikes.filter(
        (id: string) => id.toString() !== userId
      );
    } else {
      post.dislikes.push(userId);
    }

    await post.save();
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post dislike" },
      { status: 500 }
    );
  }
}
