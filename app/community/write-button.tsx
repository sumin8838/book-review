// app/community/write-button.tsx

'use client'

import { useRouter } from 'next/navigation'

export default function WriteButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      className="
        px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700 transition
        text-sm font-medium
      "
      onClick={() => router.push('/community/new')}
    >
      + 게시글 작성
    </button>
  )
}
