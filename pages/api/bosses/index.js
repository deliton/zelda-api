import dbConnect from '../../../utils/dbConnect'
import Boss from '../../../models/Boss'
import { parseLimit, parseAppearances } from '../../../utils/responsePipes'

export default async function handler(req, res) {
  const { method } = req
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseLimit(req.query.limit),
    name: req.query.name || undefined
  }

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        var bosses
        if (pageOptions.name) {
          bosses = await Boss.find({name: new RegExp(pageOptions.name)})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
        }
        else {
          bosses = await Boss.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
        }
        bosses = parseAppearances(bosses)
        bosses = bosses.map(entries => {
          return {
              ...entries,
              dungeons: entries.dungeons.map(dungeon => process.env.API_URL + 'dungeons/' + dungeon)
          }
      })
        res.status(200).json({ success: true, count: bosses.length, data: bosses })
      } catch (error) {
        res.status(400).json({ success: false })
        console.log(error)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
