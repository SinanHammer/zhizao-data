import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(request) {
  try {
    // 首先尝试从 Authorization header 获取 token
    const authHeader = request.headers.get('authorization');
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // 如果没有 Authorization header，尝试从 cookie 获取
      const cookieStore = cookies();
      const cookieToken = cookieStore.get("auth_token");
      if (cookieToken) {
        token = cookieToken.value;
      }
    }

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 确保 token 是有效的字符串
    if (typeof token !== 'string' || !token.trim()) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 这里应该从数据库获取用户信息
    // 为了演示，我们返回一些模拟数据
    return NextResponse.json({
      username: user.username,
      email: user.email || `${user.username}@example.com`,
      avatar: "",
    });
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    // 首先尝试从 Authorization header 获取 token
    const authHeader = request.headers.get('authorization');
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // 如果没有 Authorization header，尝试从 cookie 获取
      const cookieStore = cookies();
      const cookieToken = cookieStore.get("auth_token");
      if (cookieToken) {
        token = cookieToken.value;
      }
    }

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 确保 token 是有效的字符串
    if (typeof token !== 'string' || !token.trim()) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const data = await request.json();
    
    // 这里应该更新数据库中的用户信息
    // 为了演示，我们直接返回更新后的数据
    return NextResponse.json({
      username: data.username,
      email: data.email,
      avatar: data.avatar,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 