import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";

/**
 * POST /api/auth/signup
 * Body: { username: string, email: string, password: string, ... }
 */
export async function POST(request: NextRequest) {
  try {
    // 1) Connect to the database
    await dbConnect();

    // 2) Read the request body
    const { username, email, password } = await request.json();

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3) Check if a user with the same email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    }).lean();

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User with this email or username already exists",
        },
        { status: 409 } // Conflict
      );
    }

    // 4) Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5) Create and save the new user
    const newUser = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
    });

    // 6) Return success (not signing them in automatically)
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign up error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
