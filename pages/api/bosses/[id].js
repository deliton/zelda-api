import dbConnect from '../../../utils/dbConnect'
import Boss from '../../../models/Boss'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const boss = await Boss.findById(id)
          .populate('appearances dungeons', 'url name') /* find data that contains ID in database */
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
