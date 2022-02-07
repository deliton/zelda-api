import { JSONDriver } from "../../../db/driver";
import { parseLimit } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const { method } = req;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseLimit(req.query.limit),
    name: req.query.name || undefined,
  };

  const Item = new JSONDriver("items");
  await Item.init();

  switch (method) {
    case "GET":
      try {
        var items;
        if (pageOptions.name) {
          items = Item.search({ name: pageOptions.name })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        } else {
          items = Item.findMany()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        }
        // replace gameIds with link + ID
        items.data = items.data.map((entries) => {
          return {
            ...entries,
            games: entries.games.map(
              (gameId) => process.env.API_URL + "games/" + gameId["$oid"]
            ),
          };
        });
        res
          .status(200)
          .json({ success: true, count: items.data.length, data: items.data });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
