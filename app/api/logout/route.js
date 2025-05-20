import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  // 删除所有 cookie
  const cookieStore = cookies();
  for (const cookie of cookieStore.getAll()) {
    response.cookies.delete(cookie.name);
  }
  return response;
} 