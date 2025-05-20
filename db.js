import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let dbPromise;

export async function getDB() {
  if (!dbPromise) {
    dbPromise = open({
      filename: path.join(process.cwd(), 'users.db'),
      driver: sqlite3.Database
    });
    const db = await dbPromise;
    // 初始化用户表
    await db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);
  }
  return dbPromise;
}

export async function createUser(name, password) {
  const db = await getDB();
  await db.run('INSERT INTO users (name, password) VALUES (?, ?)', [name, password]);
}

export async function getUserByName(name) {
  const db = await getDB();
  return db.get('SELECT * FROM users WHERE name = ?', [name]);
} 