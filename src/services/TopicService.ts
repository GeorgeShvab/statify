import db from '@/db'
import * as types from '@/types'
import TopicModel from '@/models/Topic'

const TopicService = {
  async create(item: types.Topic) {
    await db

    return await TopicModel.create(item)
  },

  async getAll() {
    await db

    return await TopicModel.find({})
  },
}

export default TopicService
