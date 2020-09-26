import dbConnect from '../../../utils/dbConnect'
import Game from '../../../models/Game'

export default async function handler(req, res) {
  const { method } = req
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 20,
    name: req.query.name || undefined
  }

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        var games
        if (pageOptions.name) {
          games = await Game.find({name: new RegExp(pageOptions.name)})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
        }
        else {
          games = await Game.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)

        }

        res.status(200).json({ success: true, count: games.length, data: games })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
