// models/Post.ts

import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, default: '기타' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  nickname: { type: String, default: '익명 사용자' },
  hasPoll: { type: Boolean, default: false },
})

export default models.Post || model('Post', PostSchema)
