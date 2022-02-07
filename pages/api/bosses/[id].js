import { JSONDriver } from "../../../db/driver";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const Boss = new JSONDriver("bosses");
  await Boss.init();

  switch (method) {
    case "GET":
      try {
        const boss = Boss.findById(id);
        boss.data.appearances = boss.data.appearances.map(
          (gameId) => process.env.API_URL + "games/" + gameId["$oid"]
        );
        boss.data.dungeons = boss.data.dungeons.map(
          (dungeonId) => process.env.API_URL + "dungeons/" + dungeonId["$oid"]
        );
        res
          .status(200)
          .json({ success: true, count: boss.data.length, data: boss.data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
