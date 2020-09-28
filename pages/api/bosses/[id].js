import dbConnect from '../../../utils/dbConnect'
import Boss from '../../../models/Boss'
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
        const boss = await Boss.findById(id)/* find data that contains ID in database */
        boss = parseAppearances(boss)
        bosses = bosses.map(entries => {
          return {
              ...entries,
              dungeons: entries.dungeons.map(dungeon => process.env.API_URL + 'dungeons/' + dungeon)
          }
      })
        res.status(200).json({ success: true, count: boss.length, data: boss })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
