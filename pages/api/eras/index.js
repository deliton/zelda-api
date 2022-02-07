import { JSONDriver } from "../../../db/driver";
import { parseLimit } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const { method } = req;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseLimit(req.query.limit),
    name: req.query.name || undefined,
  };

  const Era = new JSONDriver("eras");
  await Era.init();

  switch (method) {
    case "GET":
      try {
        var eras;
        if (pageOptions.name) {
          eras = Era.search({ name: pageOptions.name })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        } else {
          eras = Era.findMany()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        }
        // replace gameIds with link + ID
        eras.data = eras.data.map((entries) => {
          return {
            ...entries,
            games: entries.games.map(
              (gameId) => process.env.API_URL + "games/" + gameId["$oid"]
            ),
          };
        });
        res
          .status(200)
          .json({ success: true, count: eras.data.length, data: eras.data });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
