import { JSONDriver } from "../../../db/driver";

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
        const item = Item.findById(id)/* find data that contains ID in database */
        item.data.games = item.data.games.map(
          (gameId) => process.env.API_URL + "games/" + gameId["$oid"]
        );
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
