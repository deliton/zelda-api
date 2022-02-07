import { JSONDriver } from "../../../db/driver";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const Era = new JSONDriver("eras");
  await Era.init();

  switch (method) {
    case "GET":
      try {
        const era = await Era.findById(id);
        era.data.games = era.data.games.map(
          (gameId) => process.env.API_URL + "games/" + gameId["$oid"]
        );
        res.status(200).json({ success: true, count: era.data.length, data: era.data });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
