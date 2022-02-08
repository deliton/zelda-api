import { JSONDriver } from "../../../db/driver";
import { parseLimit } from "../../../utils/responsePipes";

export const resolvers = {
  Query: {
    games: async (_, args) => {
      try {
        const limit = parseLimit(args.limit);
        const page = args.page || 0;
        delete args.limit;
        delete args.page;
        const Games = new JSONDriver("games");
        await Games.init();
        return Games.findMany(args)
          .skip(page * limit)
          .limit(limit).data;
      } catch (error) {
        throw error;
      }
    },
    getGame: async (_, args) => {
      try {
        const games = new JSONDriver("games");
        await games.init();
        const game = games.findById(args.id);
        return game.data;
      } catch (error) {
        throw error;
      }
    },
    dungeons: async (_, args) => {
      try {
        const limit = parseLimit(args.limit);
        const page = args.page || 0;
        delete args.limit;
        delete args.page;
        const dungeons = new JSONDriver("dungeons");
        await dungeons.init();
        dungeons
          .findMany(args)
          .skip(page * limit)
          .limit(limit);
        await dungeons.join({ model: "games", on: "appearances" });
        return dungeons.data;
      } catch (error) {
        throw error;
      }
    },
    getDungeon: async (_, args) => {
      try {
        const dungeons = new JSONDriver("dungeons");
        await dungeons.init();
        const dungeon = dungeons.findById(args.id);
        await dungeon.join({ model: "games", on: "appearances" });
        return dungeon.data;
      } catch (error) {
        throw error;
      }
    },
    bosses: async (_, args) => {
      try {
        const limit = parseLimit(args.limit);
        const page = args.page || 0;
        delete args.limit;
        delete args.page;
        const bosses = new JSONDriver("bosses");
        await bosses.init();
        bosses
          .findMany(args)
          .skip(page * limit)
          .limit(limit);
        await bosses.join({ model: "games", on: "appearances" });
        await bosses.join({ model: "dungeons", on: "dungeons" });
        return bosses.data;
      } catch (error) {
        throw error;
      }
    },
    getBoss: async (_, args) => {
      try {
        const bosses = new JSONDriver("bosses");
        await bosses.init();
        const boss = bosses.findById(args.id);
        await boss.join({ model: "games", on: "appearances" });
        return boss.data;
      } catch (error) {
        throw error;
      }
    },
    characters: async (_, args) => {
      try {
        const limit = parseLimit(args.limit);
        const page = args.page || 0;
        delete args.limit;
        delete args.page;
        const characters = new JSONDriver("characters");
        await characters.init();
        characters
          .findMany(args)
          .skip(page * limit)
          .limit(limit);
        await characters.join({ model: "games", on: "appearances" });
        return characters.data;
      } catch (error) {
        throw error;
      }
    },
    getCharacter: async (_, args) => {
      try {
        const characters = new JSONDriver("characters");
        await characters.init();
        const character = characters.findById(args.id);
        await character.join({ model: "games", on: "appearances" });
        return character.data;
      } catch (error) {
        throw error;
      }
    },
    eras: async (_, args) => {
      try {
        const limit = parseLimit(args.limit);
        const page = args.page || 0;
        delete args.limit;
        delete args.page;
        const eras = new JSONDriver("eras");
        await eras.init();
        eras
          .findMany(args)
          .skip(page * limit)
          .limit(limit);
        await eras.join({ model: "games", on: "games" });
        return eras.data;
      } catch (error) {
        throw error;
      }
    },
    getEra: async (_, args) => {
      try {
        const eras = new JSONDriver("eras");
        await eras.init();
        const era = eras.findById(args.id);
        await era.join({ model: "games", on: "games" });
        return era.data;
      } catch (error) {
        throw error;
      }
    },
    items: async (_, args) => {
      try {
        const limit = parseLimit(args.limit);
        const page = args.page || 0;
        delete args.limit;
        delete args.page;
        const items = new JSONDriver("items");
        await items.init();
        items
          .findMany(args)
          .skip(page * limit)
          .limit(limit);
        await items.join({ model: "games", on: "games" });
        return items.data;
      } catch (error) {
        throw error;
      }
    },
    getItem: async (_, args) => {
      try {
        const items = new JSONDriver("items");
        await items.init();
        const item = items.findById(args.id);
        await item.join({ model: "games", on: "games" });
        return item.data;
      } catch (error) {
        throw error;
      }
    },
    monsters: async (_, args) => {
      try {
        const limit = parseLimit(args.limit);
        const page = args.page || 0;
        delete args.limit;
        delete args.page;
        const monsters = new JSONDriver("monsters");
        await monsters.init();
        monsters
          .findMany(args)
          .skip(page * limit)
          .limit(limit);
        await monsters.join({ model: "games", on: "appearances" });
        return monsters.data;
      } catch (error) {
        throw error;
      }
    },
    getMonster: async (_, args) => {
      try {
        const monsters = new JSONDriver("monsters");
        await monsters.init();
        const monster = monsters.findById(args.id);
        await monster.join({ model: "games", on: "appearances" });
        return monster.data;
      } catch (error) {
        throw error;
      }
    },
    places: async (_, args) => {
      try {
        const limit = parseLimit(args.limit);
        const page = args.page || 0;
        delete args.limit;
        delete args.page;
        const places = new JSONDriver("places");
        await places.init();
        places
          .findMany(args)
          .skip(page * limit)
          .limit(limit);
        await places.join({ model: "games", on: "appearances" });
        await places.join({ model: "characters", on: "inhabitants" });
        return places.data;
      } catch (error) {
        throw error;
      }
    },
    getPlace: async (_, args) => {
      try {
        const places = new JSONDriver("places");
        await places.init();
        const place = places.findById(args.id);
        await place.join({ model: "games", on: "appearances" });
        return place.data;
      } catch (error) {
        throw error;
      }
    },
    staff: async (_, args) => {
      try {
        const limit = parseLimit(args.limit);
        const page = args.page || 0;
        delete args.limit;
        delete args.page;
        const staff = new JSONDriver("staff");
        await staff.init();
        staff
          .findMany(args)
          .skip(page * limit)
          .limit(limit);
        await staff.join({ model: "games", on: "worked_on" });
        return staff.data;
      } catch (error) {
        throw error;
      }
    },
    getStaff: async (_, args) => {
      try {
        const staff = new JSONDriver("staff");
        await staff.init();
        const staffMember = staff.findById(args.id);
        await staffMember.join({ model: "games", on: "worked_on" });
        return staffMember.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
