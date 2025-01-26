import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export function GET(request: NextRequest) {
  const token = request.headers.get("token");
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized!" },
      { status: 401 }
    );
  }

  try{

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
  
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Invalid token!" },
        { status: 400 }
      );
    }
  
    return NextResponse.json(
      { success: true, message: "Dashboard data!" },
      { status: 200 }
    );
  }
  catch(err :any){
    return NextResponse.json(
        { success: false, message: "Token verification failed!  "+err },
        { status: 401 }
      );
  }
}
