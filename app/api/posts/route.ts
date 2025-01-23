import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Post from "@/models/Post";

// GET: List or retrieve all posts with optional pagination
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const [docs, totalCount] = await Promise.all([
      Post.find({})
        .skip(skip)
        .limit(limit)
        .populate("author", "username displayName") // optional populate
        .lean(),
      Post.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      data: docs,
      total: totalCount,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST: Create a new post
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const doc = await Post.create(body);

    return NextResponse.json({
      success: true,
      data: doc,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 }
    );
  }
}

// PUT: Update a post (example: requires _id in body)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { _id, ...fieldsToUpdate } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Missing _id in request body" },
        { status: 400 }
      );
    }

    const updated = await Post.findByIdAndUpdate(_id, fieldsToUpdate, {
      new: true,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE: Delete by id in query param => /api/posts?id=...
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing 'id' query parameter" },
        { status: 400 }
      );
    }

    const result = await Post.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
