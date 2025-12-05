// app/page.tsx

import Link from 'next/link'
import { books } from '@/lib/data/books'
import { reviews } from '@/lib/data/reviews'
import { getTopBooks } from '@/lib/data/rating'

export default function HomePage() {
  // 인기 도서 TOP 3
  const topBooks = getTopBooks(books, reviews, 3)

  // 카테고리별 그룹화
  const categories = [...new Set(books.map((b) => b.category || '기타'))]

  const booksByCategory = categories.map((category) => ({
    category,
    items: books.filter((b) => (b.category || '기타') === category),
  }))

  // 최신 도서 (ID 순서라고 가정)
  const newestBooks = [...books].slice(-4)

  return (
    <div className="space-y-16">
      {/* ────────────────────────────── Hero Section ────────────────────────────── */}
      <section className="text-center py-16 bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-sm">
        <h1 className="text-4xl font-bold mb-4">
          📚 당신만의 안전한 독서 공간
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          리뷰, 토론, 추천까지 — 독서를 더욱 가치 있게 만들어 드립니다.
        </p>

        <Link
          href="/books"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          도서 둘러보기 →
        </Link>
      </section>

      {/* ────────────────────────────── 인기 도서 ────────────────────────────── */}
      <section>
        <div className="section-header">
          <h2 className="text-2xl font-bold mb-4">⭐ 인기 도서 TOP 3</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topBooks.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="card p-5 rounded-2xl shadow hover:shadow-lg transition bg-white"
            >
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{book.author}</p>

              <div className="flex items-center gap-2 text-sm mt-auto">
                <span className="text-yellow-500 font-bold">
                  ★ {book.avgRating}
                </span>
                <span className="text-gray-500">({book.reviewCount} 리뷰)</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ────────────────────────────── 카테고리별 도서 ────────────────────────────── */}
      <section className="space-y-12">
        <h2 className="text-2xl font-bold">📚 카테고리별 도서</h2>

        {booksByCategory.map(({ category, items }) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4">{category}</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="card p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <h4 className="font-medium">{book.title}</h4>
                  <p className="text-gray-500 text-sm">{book.author}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ────────────────────────────── 최신 도서 ────────────────────────────── */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🆕 신규 등록 도서</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {newestBooks.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="card p-4 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h4 className="font-medium">{book.title}</h4>
              <p className="text-gray-500 text-sm">{book.author}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
