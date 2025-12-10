// app/community/page.tsx

import Link from 'next/link'
import { communityPosts } from '@/lib/data/community'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import Comment from '@/models/Comment'

type CommunityPageProps = {
  searchParams: { category?: string }
}

export default async function CommunityPage({
  searchParams,
}: CommunityPageProps) {
  await connectDB()

  // MongoDB 글 가져오기
  const dbPosts = await Post.find().sort({ createdAt: -1 }).lean()

  // 모든 댓글 가져오기 (DB + 하드코딩)
  const dbComments = await Comment.find().lean()

  // 하드코딩 데이터와 합치기
  const allPosts = [
    ...dbPosts.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      category: p.category,
      content: p.content,
      excerpt: p.content.slice(0, 100),
      createdAt: p.createdAt.toISOString(),
      nickname: p.nickname,
      hasPoll: p.hasPoll,
    })),
    ...communityPosts,
  ]

  const currentCategory = searchParams?.category ?? '전체'

  // 카테고리 목록
  const categorySet = new Set(allPosts.map((p) => p.category))
  const categories = ['전체', ...Array.from(categorySet)]

  // 댓글 수 계산 (DB 기반)
  const postsWithStats = allPosts.map((post) => {
    const commentCount = dbComments.filter((c) => c.postId === post.id).length
    return { ...post, commentCount }
  })

  // 카테고리 필터링
  const filteredPosts =
    currentCategory === '전체'
      ? postsWithStats
      : postsWithStats.filter((post) => post.category === currentCategory)

  // 최신순 → 댓글순 정렬
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.createdAt && b.createdAt && a.createdAt !== b.createdAt) {
      return b.createdAt.localeCompare(a.createdAt)
    }
    return (b.commentCount ?? 0) - (a.commentCount ?? 0)
  })

  return (
    <div className="page">
      <header className="section-header">
        <h1 className="section-title">커뮤니티</h1>
        <p className="section-description">
          책에 대한 생각을 자유롭게 나누고, 토론과 투표에 참여해 보세요.
        </p>
      </header>

      <nav className="tabs">
        {categories.map((cat) => {
          const isActive = currentCategory === cat
          const href =
            cat === '전체'
              ? '/community'
              : `/community?category=${encodeURIComponent(cat)}`
          return (
            <Link
              key={cat}
              href={href}
              className={'tab-item' + (isActive ? ' tab-item-active' : '')}
            >
              {cat}
            </Link>
          )
        })}
      </nav>

      <div className="section-toolbar">
        <p className="muted-text">
          총 {sortedPosts.length}개의 게시글이 있습니다.
        </p>
        <Link href="/community/new" className="btn btn-outline">
          + 게시글 작성하기
        </Link>
      </div>

      {sortedPosts.length === 0 ? (
        <p className="muted-text">
          아직 이 카테고리에 해당하는 게시글이 없습니다. 첫 글을 남겨보세요!
        </p>
      ) : (
        <ul className="post-list">
          {sortedPosts.map((post) => (
            <li key={post.id} className="card card-post">
              <div className="card-body">
                <div className="card-meta-row">
                  <span className="badge badge-outline">{post.category}</span>
                  {post.hasPoll && (
                    <span className="badge badge-primary">투표글</span>
                  )}
                </div>

                <h2 className="card-title">
                  <Link href={`/community/${post.id}`}>{post.title}</Link>
                </h2>

                {post.excerpt && (
                  <p className="card-text line-clamp-2">{post.excerpt}</p>
                )}

                <div className="card-meta-row">
                  <span className="meta-text">작성자 {post.nickname}</span>
                  <span className="meta-text meta-muted">
                    {post.createdAt ?? ''}
                  </span>
                </div>
              </div>

              <div className="card-footer">
                <div className="post-footer-left">
                  <span className="meta-text">
                    💬 댓글 {post.commentCount ?? 0}개
                  </span>
                </div>
                <div className="post-footer-right">
                  <Link
                    href={`/community/${post.id}`}
                    className="btn btn-sm btn-ghost"
                  >
                    게시글 보기
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
