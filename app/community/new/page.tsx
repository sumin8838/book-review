// app/community/new/page.tsx

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createPost } from './actions'

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    await createPost(formData)

    router.push('/community')
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-6">✍️ 새 게시글 작성</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-5 border border-gray-100 dark:border-gray-700"
      >
        <div>
          <label className="font-medium">제목</label>
          <input
            name="title"
            className="input mt-2"
            placeholder="게시글 제목을 입력하세요"
            required
          />
        </div>

        <div>
          <label className="font-medium">카테고리</label>
          <input
            name="category"
            className="input mt-2"
            placeholder="예: 독서토론, 추천도서"
          />
        </div>

        <div>
          <label className="font-medium">내용</label>
          <textarea
            name="content"
            rows={6}
            className="textarea mt-2"
            placeholder="게시글 내용을 입력하세요..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-3"
        >
          {loading ? '작성 중...' : '게시글 작성완료'}
        </button>
      </form>
    </div>
  )
}
