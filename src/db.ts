import mongoose from 'mongoose'

const db = mongoose.connect(
  'mongodb+srv://Admin:U0PFF6wefqBzZsA3@statifyinstance1.ymhaydg.mongodb.net/?retryWrites=true&w=majority',
  {
    dbName: 'main',
  }
)

export default db
