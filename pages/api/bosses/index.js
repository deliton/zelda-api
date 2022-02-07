import { JSONDriver } from "../../../db/driver";
import { parseLimit } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const { method } = req;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseLimit(req.query.limit),
    name: req.query.name || undefined,
  };

  const Boss = new JSONDriver("bosses");
  await Boss.init();

  switch (method) {
    case "GET":
      try {
        var bosses;
        if (pageOptions.name) {
          bosses = Boss.search({ name: pageOptions.name })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        } else {
          bosses = Boss.findMany()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        }
        // replace gameIds with link + ID
        bosses.data = bosses.data.map((entries) => {
          return {
            ...entries,
            appearances: entries.appearances.map(
              (gameId) => process.env.API_URL + "games/" + gameId["$oid"]
            ),
          };
        });
        // replace dungeonIds with link + ID
        bosses.data = bosses.data.map((entries) => {
          return {
            ...entries,
            dungeons: entries.dungeons.map(
              (dungeonId) =>
                process.env.API_URL + "dungeons/" + dungeonId["$oid"]
            ),
          };
        });
        res
          .status(200)
          .json({
            success: true,
            count: bosses.data.length,
            data: bosses.data,
          });
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
