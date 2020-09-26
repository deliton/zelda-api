import dbConnect from '../../../utils/dbConnect'
import Dungeon from '../../../models/Dungeon'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const dungeon = await Dungeon.findById(id)
          .populate('appearances', 'url name') /* find data that contains ID in database */
        res.status(200).json({ success: true, count: dungeon.length, data: dungeon })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
