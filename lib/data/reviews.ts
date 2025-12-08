// lib/data/reviews.ts

export type Review = {
  id: string
  bookId: string
  nickname: string
  rating: number
  content: string
  createdAt?: string
}

export const reviews: Review[] = [
  {
    id: 'review-1',
    bookId: 'TRpHDgAAQBAJ',
    nickname: '가연',
    rating: 5,
    content:
      '스토리가 신선하고 그림체도 너무 예뻐서 금방 빠져들었다. 추천하고 싶은 책!',
    createdAt: '2025-12-07',
  },
]
