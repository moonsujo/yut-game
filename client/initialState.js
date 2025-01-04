export default {
  selection: undefined,
  gamePhase: "lobby",
  initialTiles: [
    [], // { [ { team: Number, id: Number, tile: Number, history: [Number], status: String } ] }
    [],
    [],
    [],
    [],
    [], // 5
    [],
    [],
    [],
    [],
    [], // 10
    [],
    [],
    [],
    [],
    [], // 15
    [],
    [],
    [],
    [],
    [], // 20
    [],
    [],
    [],
    [],
    [], // 25
    [],
    [],
    [],
  ],
  initialTurn: {
    team: -1,
    players: [0, 0]
  },
  initialTeams: [
    {
      pieces: [
        { tile: -1, team: 0, id: 0, history: [], lastPath: [] },
        { tile: -1, team: 0, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 0, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 0, id: 3, history: [], lastPath: [] },
      ],
      throws: 0,
      moves: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '-1': 0
      },
      players: [],
      pregameRoll: null
    },
    {
      pieces: [
        { tile: -1, team: 1, id: 0, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 1, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
        { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
      ],
      throws: 0,
      moves: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '-1': 0
      },
      players: [],
      pregameRoll: null
    }
  ]
};