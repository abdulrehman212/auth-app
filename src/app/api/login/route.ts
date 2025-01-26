import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

interface ILoginBody {
  email: string;
  password: string;
}

//Database
const user = {
  id: 1,
  email: "abc@gmail.com",
  password: "12345678",
  name: "Abdul Rehman",
};

export async function POST(request: NextRequest) {
  const body: ILoginBody = await request.json();

  //Data Validation
  if (!body.email || !body.password) {
    return NextResponse.json(
      { success: false, message: "Data validation failed!" },
      { status: 400 }
    );
  }

  //Check if user email or password exists
  if (body.email !== user.email || body.password !== user.password) {
    return NextResponse.json(
      { success: false, message: "Email or Password is invalid!" },
      { status: 404 }
    );
  }

  //Generate JWT token
  const payload = { email: body.email };
  const secretKey = process.env.JWT_SECRET;

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
    },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

  //Return token
  return NextResponse.json(
    { success: true, message: "Login Successful!", token: token },
    { status: 200 }
  );
}
