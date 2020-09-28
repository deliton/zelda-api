import dbConnect from '../../../utils/dbConnect'
import Monster from '../../../models/Monster'
import { parseAppearances } from '../../../utils/responsePipes'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const monster = await Monster.findById(id)/* find data that contains ID in database */
        monster = parseAppearances(monster)
        res.status(200).json({ success: true, count: monster.length, data: monster })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
