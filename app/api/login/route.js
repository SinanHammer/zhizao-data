import { NextResponse } from 'next/server';
import { getUserByName } from '../../../db';
import { generateToken } from '../../../lib/auth';

export async function POST(request) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
  }
  const user = await getUserByName(username);
  if (!user || user.password !== password) {
    return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
  }

  // 生成JWT token
  const token = generateToken({
    id: user.id,
    username: user.name,
    email: `${user.name}@example.com`
  });

  // 设置cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: false,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  return response;
} 