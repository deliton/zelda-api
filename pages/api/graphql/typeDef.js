import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Game {
    name: String
    description: String
    developer: String
    publisher: String
    released_date: String
  }

  type Dungeon {
    name: String
    description: String
    appearances: [Game]
  }

  type Boss {
    name: String
    description: String
    appearances: [Game]
    dungeons: [Dungeon]
  }

  type Character {
    name: String
    description: String
    gender: String
    race: String
    appearances: [Game]
  }

  type Era {
    name: String
    description: String
    games: [Game]
  }

  type Item {
    name: String
    description: String
    games: [Game]
  }

  type Monster {
    name: String
    description: String
    appearances: [Game]
  }

  type Place {
    name: String
    description: String
    appearances: [Game]
    inhabitants: [Character]
  }

  type Staff {
    name: String
    worked_on: [Game]
  }

  type Query {
    games(
      name: String
      description: String
      developer: String
      released_date: String
      page: Int = 0
      limit: Int
    ): [Game]
    getGame(id: String!): Game!

    dungeons(
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Dungeon]
    getDungeon(id: String!): Dungeon!

    bosses(name: String, description: String, page: Int = 0, limit: Int): [Boss]
    getBoss(id: String!): Boss!

    characters(
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Character]
    getCharacter(id: String!): Character!

    eras(name: String, description: String, page: Int = 0, limit: Int): [Era]
    getEra(id: String!): Era!

    items(name: String, description: String, page: Int = 0, limit: Int): [Item]
    getItem(id: String!): Item!

    monsters(
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Monster]
    getMonster(id: String!): Monster!

    places(
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Place]
    getPlace(id: String!): Place!

    staff(name: String, page: Int = 0, limit: Int): [Staff]
    getStaff(id: String!): Staff!
  }
`;
