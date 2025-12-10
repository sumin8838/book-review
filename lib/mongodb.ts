// lib/mongodb.ts

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string
if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI 환경 변수가 설정되지 않았습니다.')
}

declare global {
  var _mongoose: {
    conn: mongoose.Mongoose | null
    promise: Promise<mongoose.Mongoose> | null
  }
}

let cached = global._mongoose
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'book-review',
        bufferCommands: false,
      })
      .then((m) => m)
  }

  cached.conn = await cached.promise
  return cached.conn
}
