import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Comment from "@/models/Comment";

/**
 * GET /api/comments
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const postId = searchParams.get("postId"); // optional

    const query: any = {};
    if (postId) {
      query.post = postId;
    }

    const [docs, totalCount] = await Promise.all([
      Comment.find(query)
        .skip(skip)
        .limit(limit)
        .populate("author", "username displayName")
        .lean(),
      Comment.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: docs,
      total: totalCount,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const doc = await Comment.create(body);

    return NextResponse.json({
      success: true,
      data: doc,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/comments
 *  - Body should include { _id, content }
 *  - Must be logged in, must be the author of this comment
 */
export async function PUT(request: NextRequest) {
  try {
    // 1) Ensure user is logged in
    const session = await getServerSession(request, authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2) Parse the JSON body
    const { _id, content } = await request.json();
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Missing _id in request body" },
        { status: 400 }
      );
    }

    // 3) Connect to DB and find the comment
    await dbConnect();
    const commentDoc = await Comment.findById(_id);
    if (!commentDoc) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 }
      );
    }

    // 4) Check if the logged-in user is the comment author
    if (commentDoc.author.toString() !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "You are not the author of this comment" },
        { status: 403 }
      );
    }

    // 5) Update the comment content
    commentDoc.content = content;
    await commentDoc.save();

    return NextResponse.json({
      success: true,
      data: commentDoc,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error while editing comment" },
      { status: 500 }
    );
  }
}
