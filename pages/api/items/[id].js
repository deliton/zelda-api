import { JSONDriver } from "../../../db/driver";
import { parseOneObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const Item = new JSONDriver("items");
  await Item.init();

  switch (method) {
    case 'GET':
      try {
        const item = Item.findById(id);
        item.data = parseOneObject(item.data, "games/", "games");
        res.status(200).json({ success: true, count: item.data.length, data: item.data })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
