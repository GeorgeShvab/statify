import mongoose from 'mongoose'
import * as types from '../types'
import db from '@/db'
import IndicatorModel from '@/models/Indicator'

const IndicatorService = {
  async getById(id: string) {
    await db

    return await IndicatorModel.findOne({ id })
  },
  async create(item: types.Indicator) {
    await db

    return await IndicatorModel.create(item)
  },

  async autocomplete(query: string) {
    await db

    return await IndicatorModel.find({
      $text: { $search: query, $caseSensitive: false },
    }).limit(5)
  },

  async search({ query, topic, page }: { query: string; page: number; topic: string }) {
    await db

    const dataPromise = IndicatorModel.find({
      $text: { $search: query, $caseSensitive: false },
    })
      .sort('label')
      .skip((page - 1) * 45)
      .limit(45)

    const countPromise = IndicatorModel.count({
      $text: { $search: query, $caseSensitive: false },
    })

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return {
      data: data.map((item) => item.toObject()) as types.Indicator[],
      count: count,
      pages: Math.ceil(count / 45),
      page,
    }
  },

  async getAll() {
    await db

    return await IndicatorModel.find({})
  },
}

export default IndicatorService
