import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("Sign out route triggered");
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error during signout: " + error.message },
      { status: 500 }
    );
  }
}
