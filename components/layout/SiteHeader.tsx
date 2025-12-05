// components/layout/SiteHeader.tsx

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, Sun, Moon, User } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-30">
      <div className="app-container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="text-xl font-bold">
            📚 Secure Book Review
          </Link>
        </div>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-gray-700 dark:text-gray-200">
          <Link
            href="/books"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            도서 목록
          </Link>
          <Link
            href="/community"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            커뮤니티
          </Link>
        </nav>

        {/* Right: Search + Theme + Profile */}
        <div className="flex items-center gap-4">
          {/* 검색창 */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-xl">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search books..."
              className="bg-transparent px-2 focus:outline-none text-sm"
            />
          </div>

          {/* 다크모드 버튼 */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* 프로필(로그인 전이면 로그인 버튼) */}
          <Link
            href="/login"
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <User className="w-4 h-4" />
            로그인
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white dark:bg-gray-900 px-4 py-3 space-y-3">
          <Link
            href="/books"
            className="block text-gray-700 dark:text-gray-200"
          >
            도서 목록
          </Link>
          <Link
            href="/community"
            className="block text-gray-700 dark:text-gray-200"
          >
            커뮤니티
          </Link>

          {/* 모바일 검색창 */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent px-2 focus:outline-none text-sm"
            />
          </div>
        </div>
      )}
    </header>
  )
}
