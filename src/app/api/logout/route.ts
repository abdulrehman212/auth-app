import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );
}
