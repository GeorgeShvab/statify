import { Indicator } from '@/types'
import mongoose, { Schema, model } from 'mongoose'

const IndicatorSchema = new Schema<Indicator>(
  {
    label: { type: String, required: false },
    description: { type: String, required: false },
    source: { type: String, required: false },
    unit: { type: String, required: false },
    dataset: { type: String, required: false },
    id: { type: String, required: false },
  },
  { versionKey: false, timestamps: true }
)

IndicatorSchema.index({ name: 'text', '$**': 'text' })

export default mongoose.models.Indicators || model('Indicators', IndicatorSchema)
