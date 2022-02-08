import { JSONDriver } from "../../../db/driver";
import { parseOneObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const Monster = new JSONDriver("monsters");
  await Monster.init();

  switch (method) {
    case 'GET':
      try {
        const monster = Monster.findById(id);
        monster.data = parseOneObject(monster.data, "games/", "appearances");
        res.status(200).json({ success: true, count: monster.data.length, data: monster.data })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
