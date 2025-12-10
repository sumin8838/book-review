// app/community/new/actions.ts

'use server'

import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  await connectDB()

  await Post.create({
    title: formData.get('title')?.toString(),
    content: formData.get('content')?.toString(),
    category: formData.get('category')?.toString() ?? '기타',
    createdAt: new Date().toISOString(),
    nickname: '익명 사용자',
    hasPoll: false,
  })

  revalidatePath('/community')
}
