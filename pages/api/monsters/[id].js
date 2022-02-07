import { JSONDriver } from "../../../db/driver";

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
        const monster = await Monster.findById(id)/* find data that contains ID in database */
        monster.data.appearances = monster.data.appearances.map(
          (gameId) => process.env.API_URL + "games/" + gameId["$oid"]
        );
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
