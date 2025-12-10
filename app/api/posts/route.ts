// app/api/posts/route.ts

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'

export async function POST(req: Request) {
  await connectDB()
  const { title, content, category, userEmail } = await req.json()

  try {
    const post = await Post.create({ title, content, category, userEmail })
    return NextResponse.json({ ok: true, post })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err }, { status: 500 })
  }
}
