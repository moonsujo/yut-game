import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";
import initialState from "../../server/initialState";

// export const socket = io("http://192.168.86.158:3000", { query: { 'player': localStorage.getItem('player') ?? "null" } }); // http://192.168.1.181:3000 //http://192.168.86.158:3000
export const socket = io("http://192.168.86.158:3000"); // http://192.168.1.181:3000 //http://192.168.86.158:3000
// doesn't work when another app is running on the same port
const initialYutRotations = JSON.parse(JSON.stringify(initialState.initialYutRotations))
const initialYutPositions = JSON.parse(JSON.stringify(initialState.initialYutPositions))

export const yutThrowValuesAtom = atom([
  {
    rotation: initialYutRotations[0],
    positionInHand: initialYutPositions[0],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: initialYutRotations[1],
    positionInHand: initialYutPositions[1],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: initialYutRotations[2],
    positionInHand: initialYutPositions[2],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: initialYutRotations[3],
    positionInHand: initialYutPositions[3],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
]);

export const selectionAtom = atom(null);
export const charactersAtom = atom([]);
export const tilesAtom = atom(JSON.parse(JSON.stringify(initialState.tiles)));
export const teamsAtom = atom(JSON.parse(JSON.stringify(initialState.teams)));
export const turnAtom = atom(JSON.parse(JSON.stringify(initialState.turn)));
export const readyToStartAtom = atom(false);
export const gamePhaseAtom = atom("lobby");
// info about player
export const clientPlayerAtom = atom(null);
export const displayScoreOptionsAtom = atom(false);
export const legalTilesAtom = atom({});
export const playersAtom = atom({});
export const messagesAtom = atom([]);
export const nameAtom = atom('');
export const clientsAtom = atom({})
export const clientAtom = atom({})

export const SocketManager = () => {
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_tiles, setTiles] = useAtom(tilesAtom);
  const [_teams, setTeams] = useAtom(teamsAtom);
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom);
  const [_yutThrowValues, setYutThrowValues] = useAtom(yutThrowValuesAtom);
  const [_turn, setTurn] = useAtom(turnAtom);
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  // info about player
  const [clientPlayer, setClientPlayer] = useAtom(clientPlayerAtom)
  // UI updates
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom);
  const [_players, setPlayers] = useAtom(playersAtom);
  const [_messages, setMessages] = useAtom(messagesAtom);
  const [_clients, setClients] = useAtom(clientsAtom);
  const [_client, setClient] = useAtom(clientAtom);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onClients({clients}) {
      setClients(clients)
    }
    function onSetUpClient({client}) {
      setClient(client);
    }
    function onSetUpPlayer({player}) {
      console.log("[onSetUpPlayer] player", player)
      setClientPlayer(player);
    }
    function onDisconnect() {
      console.log("disconnected", clientPlayer);
    }
    function onSelect(value) {
      setSelection(value);
    }
    function onCharacters(value) {
      setCharacters(value);
    }
    function onTiles(value) {
      setTiles(value);
    }
    function onTeams(value) {
      setTeams(value);
    }
    function onYutThrow(yutForceVectors) {
      setYutThrowValues(yutForceVectors);
    }
    function onReset({ tiles, selection, gamePhase, teams }) {
      setTiles(tiles);
      setSelection(selection);
      setGamePhase(gamePhase);
      setTeams(teams);
    }
    function onReadyToStart(flag) {
      setReadyToStart(flag);
    }
    function onTurn(turn) {
      setTurn(turn);
    }
    function onGamePhase(gamePhase) {
      setGamePhase(gamePhase)
    }
    //UI events
    function onLegalTiles({ legalTiles }) {
      setLegalTiles(legalTiles)
    }
    function onPlayers(players) {
      setPlayers(players)
    }
    function onMessages(messages) {
      setMessages(messages)
    }
    socket.on("connect", onConnect);
    socket.on("setUpClient", onSetUpClient)
    socket.on("clients", onClients)
    socket.on("setUpPlayer", onSetUpPlayer)
    socket.on("disconnect", onDisconnect);
    socket.on("select", onSelect);
    socket.on("characters", onCharacters);
    socket.on("tiles", onTiles);
    socket.on("teams", onTeams);
    socket.on("throwYuts", onYutThrow);
    socket.on("reset", onReset);
    socket.on("readyToStart", onReadyToStart);
    socket.on("turn", onTurn);
    socket.on("gamePhase", onGamePhase);
    socket.on("legalTiles", onLegalTiles);
    socket.on("players", onPlayers);
    socket.on("messages", onMessages);
    return () => {
      socket.off("connect", onConnect);
      socket.off("setUpClient", onSetUpClient)
      socket.off("clients", onClients)
      socket.off("setUpPlayer", onSetUpPlayer)
      socket.off("disconnect", onDisconnect);
      socket.off("select", onSelect);
      socket.off("characters", onCharacters);
      socket.off("tiles", onTiles);
      socket.off("teams", onTeams);
      socket.off("throwYuts", onYutThrow);
      socket.off("reset", onReset);
      socket.off("readyToStart", onReadyToStart);
      socket.off("turn", onTurn);
      socket.off("gamePhase", onGamePhase);
      socket.off("legalTiles", onLegalTiles);
      socket.off("players", onPlayers);
      socket.off("messages", onMessages);
    };
  }, []);
};
