// lib/data/community.ts
export type CommunityCategory = '자유' | '토론' | '투표' | '책추천'

export type CommunityPost = {
  id: string
  title: string
  content: string
  excerpt?: string
  category: CommunityCategory
  nickname: string
  createdAt?: string
  hasPoll?: boolean
}

export type Comment = {
  id: string
  postId: string
  nickname: string
  content: string
  createdAt?: string
}

export type Poll = {
  id: string
  postId: string
  question: string
}

export type PollOption = {
  id: string
  pollId: string
  text: string
  votes: number
}

export const communityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    title: '함께 자라기 읽고 가장 기억에 남는 부분이 뭐였나요?',
    content:
      '저는 “함께 자라기”에서 개인의 성장이 아니라 팀의 성장을 강조하는 부분이 제일 인상적이었어요.\n\n' +
      '혼자 잘하는 사람보다 팀 전체의 수준을 끌어올리는 사람이 진짜 시니어라는 말이 계속 떠오르더라고요.\n\n' +
      '여러분은 어떤 문장이나 챕터가 가장 기억에 남았나요?',
    excerpt:
      '저는 “함께 자라기”에서 개인의 성장이 아니라 팀의 성장을 강조하는 부분이 제일 인상적이었어요…',
    category: '토론',
    nickname: '가연',
    createdAt: '2025-11-21',
    hasPoll: true,
  },
  {
    id: 'post-2',
    title: 'Clean Code를 처음 읽으려는 사람에게 조언해 준다면?',
    content:
      'Clean Code를 처음 읽으려는 친구가 있다면, 어떤 순서나 방법으로 읽으라고 말해주고 싶나요?\n\n' +
      '처음부터 끝까지 정독? 아니면 필요한 장만 골라서 읽기?\n' +
      '실습 코드랑 같이 따라가는 게 좋은지도 궁금해요.',
    excerpt:
      'Clean Code를 처음 읽으려는 친구에게 어떻게 추천해 줄지 같이 이야기해봐요.',
    category: '자유',
    nickname: '개발자1',
    createdAt: '2025-11-20',
  },
  {
    id: 'post-3',
    title: '요즘 읽은 책 중 “책추천” 하고 싶은 책 공유하기',
    content:
      '최근 한 달 동안 읽은 책 중에서 다른 사람에게 꼭 추천하고 싶은 책이 있다면 자유롭게 공유해주세요!\n\n' +
      '장르 상관없이, 한 줄 이유와 함께 써주면 더 좋을 것 같아요.',
    excerpt:
      '최근 한 달 동안 읽은 책 중에서 꼭 추천하고 싶은 책을 한 줄 이유와 함께 공유해요.',
    category: '책추천',
    nickname: '책덕후',
    createdAt: '2025-11-19',
  },
]

export const comments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    nickname: '책덕후',
    content:
      '저는 “가장 느리게 가는 사람이 기준이 되는 팀”이라는 이야기가 기억에 남아요.',
    createdAt: '2025-11-21',
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    nickname: '개발자1',
    content:
      '코칭이나 피드백을 통해서 서로를 성장시키는 문화가 얼마나 중요한지 계속 생각하게 됐어요.',
    createdAt: '2025-11-22',
  },
  {
    id: 'comment-3',
    postId: 'post-2',
    nickname: '가연',
    content:
      '저라면 내가 자주 마주치는 문제와 관련된 장부터 골라 읽고, 나중에 전체를 정독할 것 같아요.',
    createdAt: '2025-11-20',
  },
]

export const polls: Poll[] = [
  {
    id: 'poll-1',
    postId: 'post-1',
    question: '“함께 자라기”에 대한 전반적인 만족도는 어느 정도인가요?',
  },
]

export const pollOptions: PollOption[] = [
  {
    id: 'opt-1',
    pollId: 'poll-1',
    text: '매우 만족했다',
    votes: 12,
  },
  {
    id: 'opt-2',
    pollId: 'poll-1',
    text: '보통이었다',
    votes: 5,
  },
  {
    id: 'opt-3',
    pollId: 'poll-1',
    text: '기대보다 아쉬웠다',
    votes: 3,
  },
]
