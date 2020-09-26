import dbConnect from '../../../utils/dbConnect'
import Character from '../../../models/Character'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const character = await Character.findById(id)
        .populate('appearances','url name') /* find data that contains ID in database */
        res.status(200).json({ success: true, count: character.length, data: character })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
