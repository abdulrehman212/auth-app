// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";

// Mock database
const users: any = [];

interface ISignupBody {
  email: string;
  password: string;
  name: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ISignupBody = await request.json();
    //empty email or password or name
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: "Email and Password fields are required!" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userExists = users.find((user: any) => user.email === body.email);
    if (userExists) {
      return NextResponse.json(
        { success: false, message: "Email already registered!" },
        { status: 400 }
      );
    }

    // Save user
    users.push({
      id: users.length + 1,
      email: body.email,
      password: body.password,
      name: body.name,
    });

    return NextResponse.json(
      { success: true, message: "Signup Successful!" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Something went wrong!  Error >>>  " + err },
      { status: 400 }
    );
  }
}
