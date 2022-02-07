import { JSONDriver } from "../../../db/driver";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const Game = new JSONDriver("games");
  await Game.init();

  switch (method) {
    case "GET":
      try {
        const game = await Game.findById(id);
        res
          .status(200)
          .json({ success: true, count: game.data.length, data: game.data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
