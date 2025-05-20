import { createUser, getUserByName } from '../../../db';

export async function POST(request) {
  const { name, password } = await request.json();
  if (!name || !password) {
    return Response.json({ error: '姓名和密码不能为空' }, { status: 400 });
  }
  // 检查用户名是否已存在
  const existing = await getUserByName(name);
  if (existing) {
    return Response.json({ error: '该用户名已被注册' }, { status: 409 });
  }
  try {
    await createUser(name, password);
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: '注册失败' }, { status: 500 });
  }
} 