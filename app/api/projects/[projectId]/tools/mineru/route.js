import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

function getConfigPath(projectId) {
    return path.join(process.cwd(), 'local-db', projectId, 'mineru-config.json');
}

export async function GET(request, { params }) {
    const { projectId } = params;
    const configPath = getConfigPath(projectId);
    try {
        const data = await fs.readFile(configPath, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (e) {
        // 文件不存在时返回默认空配置
        return NextResponse.json({ apiBaseUrl: '', apiKey: '' });
    }
}

export async function PUT(request, { params }) {
    const { projectId } = params;
    const configPath = getConfigPath(projectId);
    try {
        const body = await request.json();
        // 确保 local-db/{projectId} 目录存在
        await fs.mkdir(path.dirname(configPath), { recursive: true });
        await fs.writeFile(configPath, JSON.stringify(body, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
} 