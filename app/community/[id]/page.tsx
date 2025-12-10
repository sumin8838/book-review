// app/community/[id]/page.tsx

import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import Comment from '@/models/Comment'
import Link from 'next/link'

type PostPageProps = {
  params: { id: string } | Promise<{ id: string }>
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { id } = await params
  await connectDB()

  const post = await Post.findById(id).lean()
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>

  const comments = await Comment.find({ postId: id })
    .sort({ createdAt: -1 })
    .lean()

  return (
    <div className="max-w-2xl mx-auto py-10 px-5 space-y-6">
      <Link href="/community" className="btn btn-outline">
        ← 목록으로
      </Link>

      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">
        작성자 {post.nickname} | {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className="prose dark:prose-invert">{post.content}</div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          댓글 ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">
            아직 댓글이 없습니다. 첫 댓글을 달아보세요!
          </p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li
                key={c._id}
                className="border p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <p>{c.content}</p>
                <div className="text-sm text-gray-400 mt-1">
                  {c.nickname} | {new Date(c.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* 댓글 작성 폼 */}
        <form
          action={async (formData: FormData) => {
            'use server'
            const content = formData.get('content')?.toString()
            if (!content) return
            await connectDB()
            await Comment.create({
              postId: id,
              content,
              nickname: '익명 사용자',
              createdAt: new Date(),
            })
          }}
          className="mt-6 space-y-3"
        >
          <textarea
            name="content"
            rows={3}
            placeholder="댓글을 입력하세요..."
            className="textarea w-full"
            required
          />
          <button type="submit" className="btn btn-primary">
            댓글 작성
          </button>
        </form>
      </section>
    </div>
  )
}
