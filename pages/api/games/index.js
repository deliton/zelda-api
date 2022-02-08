import { JSONDriver } from "../../../db/driver";

export default async function handler(req, res) {
  const { method } = req;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 20,
    name: req.query.name || undefined,
  };

  const Game = new JSONDriver("games");
  await Game.init();

  switch (method) {
    case "GET":
      try {
        var games = [];
        if (pageOptions.name) {
          games = Game.search({ name: pageOptions.name })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        } else {
          games = Game.findMany()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        }

        res
          .status(200)
          .json({ success: true, count: games.data.length, data: games.data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
