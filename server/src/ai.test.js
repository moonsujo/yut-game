import { calculateScore } from "./ai"
import initialState from "../initialState"

// calculate possible moves
describe("calculate possible moves", () => {

})

// calculateSmartMove
describe("calculate smart move", () => {
  // if you have gul and ge, with token from s10, it should take you to s28
})

describe("calculate score", () => {
  describe("start", () => {
    it("should return 2 if you start and send a ship to star 1", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 2,
        team: 0,
        id: 0,
        history: [1, 2],
        lastPath: [0, 1, 2]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(2)
    })
    it("should return 2 if you start and send a ship to star 2", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 2,
        team: 0,
        id: 0,
        history: [1, 2],
        lastPath: [0, 1, 2]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(2)
    })
    it("should return 1 if you start and send a ship to star 3", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 3,
        team: 0,
        id: 0,
        history: [1, 2, 3],
        lastPath: [0, 1, 2, 3]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(1)
    })
    it("should return 1 if you start and send a ship to star 4", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 4,
        team: 0,
        id: 0,
        history: [1, 2, 3, 4],
        lastPath: [0, 1, 2, 3, 4]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(-2)
    })
    it("should return 1 if you start and send a ship to star 5", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 5,
        team: 0,
        id: 0,
        history: [1, 2, 3, 4, 5],
        lastPath: [0, 1, 2, 3, 4, 5]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(-4)
    })
    it("should return -20 if you use a backdo to send a ship to Earth", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 0,
        team: 0,
        id: 0,
        history: [],
        lastPath: [0, 1]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(-20)
    })
  })
  describe("piggyback", () => {
    it("should return -16 if you have two ships on star 2", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 2,
        team: 0,
        id: 0,
        history: [1, 2],
        lastPath: [0, 1, 2]
      }
      friendlyPieces[1] = {
        tile: 2,
        team: 0,
        id: 0,
        history: [1, 2],
        lastPath: [0, 1, 2]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(-16)
    })
    it("should return -17 if you have two ships on star 7 and an enemy on star 4", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 7,
        team: 0,
        id: 0,
        history: [1, 2, 3, 4, 5, 6, 7],
        lastPath: [0, 1, 2, 3, 4, 5, 6, 7]
      }
      friendlyPieces[1] = {
        tile: 7,
        team: 0,
        id: 0,
        history: [1, 2, 3, 4, 5, 6, 7],
        lastPath: [0, 1, 2, 3, 4, 5, 6, 7]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      enemyPieces[0] = {
        tile: 4,
        team: 1,
        id: 0,
        history: [1, 2, 3, 4],
        lastPath: [0, 1, 2, 3, 4]
      }
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(-17)
    })
  })
  describe("multiple friendlies", () => {
    // stack
    // separated
    it("should return 4 if you have a ship at s1 and another ship at s2", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 1,
        team: 0,
        id: 0,
        history: [1],
        lastPath: [0]
      }
      friendlyPieces[1] = {
        tile: 2,
        team: 0,
        id: 0,
        history: [1, 2],
        lastPath: [0, 1, 2]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(4)
    })
    it("should return -14 if you have a ship at s6 and another ship at s8", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 6,
        team: 0,
        id: 0,
        history: [1, 2, 3, 4, 5, 6],
        lastPath: [0, 1, 2, 3, 4, 5, 6]
      }
      friendlyPieces[1] = {
        tile: 8,
        team: 0,
        id: 0,
        history: [1, 2, 3, 4, 5, 6, 7, 8],
        lastPath: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let tiles = JSON.parse(JSON.stringify(initialState.initialTiles))
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch, tiles })
      expect(score).toEqual(-14)
    })
  })
  describe("fork", () => {
    it.only("should return -4 if you have a ship at s5", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 5,
        team: 0,
        id: 0,
        history: [3, 4, 5],
        lastPath: [2, 3, 4, 5]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch })
      expect(score).toEqual(-4)
    })
    it("should return -12 if you have a ship at s10 (saturn)", () => {
      let friendlyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      friendlyPieces[0] = {
        tile: 10,
        team: 0,
        id: 0,
        history: [8, 9, 10],
        lastPath: [7, 8, 9, 10]
      }
      let enemyPieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      let backdoLaunch = true
      let score = calculateScore({ pieces: friendlyPieces, enemyPieces, backdoLaunch })
      expect(score).toEqual(-12)
    })
  })
  describe("compare two scores", () => {
    // set up: u0 on s10 and u1 on s6 vs u0 on s9 and u1 on s7
    it("should favor a token on s10 and token on s6 over a token on s9 and another one on s7", () => {
      // board 1: u0 on s10, u1 on s6
      // board 2: u0 on s9, u1 on s7
      // expect score_board 1 < score_board 2
    })
  })
})