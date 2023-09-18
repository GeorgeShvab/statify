import mongoose, { Schema, model } from 'mongoose'
import * as types from '@/types'

const TopicSchema = new Schema<types.Topic>(
  {
    id: { type: String, required: false, unique: true },
    value: { type: String, required: false },
  },
  { timestamps: true, versionKey: false }
)

export default mongoose.models.Topics || model('Topics', TopicSchema)
