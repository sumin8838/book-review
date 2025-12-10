// models/Comment.ts

import { Schema, model, models } from 'mongoose'

const CommentSchema = new Schema({
  postId: { type: String, required: true },
  content: { type: String, required: true },
  nickname: { type: String, default: '익명 사용자' },
  createdAt: { type: Date, default: Date.now },
})

export default models.Comment || model('Comment', CommentSchema)
