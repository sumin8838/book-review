// app/community/write/page.tsx

'use client'

import { useState } from 'react'

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('일반')

  const handleSubmit = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        category,
        userEmail: 'test@example.com', // 추후 auth 연동
      }),
    })

    const data = await res.json()
    if (data.ok) alert('✨ 글이 등록되었습니다!')
    else alert('등록 실패: ' + data.error)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">✏️ 글 작성하기</h1>

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded mb-3 h-48"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select
        className="w-full p-2 border rounded mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>일반</option>
        <option>후기</option>
        <option>질문</option>
      </select>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700 transition"
      >
        제출하기
      </button>
    </div>
  )
}
