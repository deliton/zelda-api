import dbConnect from '../../../utils/dbConnect'
import Character from '../../../models/Character'
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
        const character = await Character.findById(id)/* find data that contains ID in database */
        character = parseAppearances(character)
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
