import { Html, Image, Text3D } from "@react-three/drei";
import Star from "./meshes/Star";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { clientAtom, hostAtom, spectatorsAtom, teamsAtom } from "./GlobalState";

export default function SettingsHostHtml(props) {
  // #region state setters and getters
  const [mainMenuOpen, setMainMenuOpen] = useState(true)
  // edit players
  const [editGuestsOpen, setEditGuestsOpen] = useState(false)
  const [editGuestsHover, setEditGuestsHover] = useState(false)
  const [guestBeingEditted, setGuestBeingEditted] = useState(null)
  const [editAGuestOpen, setEditAGuestOpen] = useState(false)
  // the rest
  const [resetGameOpen, setResetGameOpen] = useState(false)
  const [resetGameHover, setResetGameHover] = useState(false)
  const [pauseGame, setPauseGame] = useState(false)
  const [pauseGameHover, setPauseGameHover] = useState(false)
  const [setGameRulesOpen, setSetGameRulesOpen] = useState(false)
  const [setGameRulesHover, setSetGameRulesHover] = useState(false)
  const [audioOpen, setAudioOpen] = useState(false)
  const [audioHover, setAudioHover] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [languageHover, setLanguageHover] = useState(false)
  const [inviteFriendsOpen, setInviteFriendsOpen] = useState(false)
  const [inviteFriendsHover, setInviteFriendsHover] = useState(false)
  // #endregion

  // #region pointer handlers
  function handleEditGuestsPointerEnter(e) {
    e.stopPropagation();
    setEditGuestsHover(true)
  }
  function handleEditGuestsPointerLeave(e) {
    e.stopPropagation();
    setEditGuestsHover(false)
  }
  function handleEditGuestsPointerUp(e) {
    e.stopPropagation();
    if (editGuestsOpen) {
      setEditGuestsOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditGuestsOpen(true)
      setEditGuestsHover(false)
      setResetGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
  }
  function handleResetGamePointerEnter(e) {
    e.stopPropagation();
    setResetGameHover(true)
  }
  function handleResetGamePointerLeave(e) {
    e.stopPropagation();
    setResetGameHover(false)
  }
  function handleResetGamePointerUp(e) {
    e.stopPropagation();
    if (resetGameOpen) {
      setResetGameOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditGuestsOpen(false)
      setResetGameOpen(true)
      setResetGameHover(false)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
  }
  function handlePauseGamePointerEnter(e) {
    e.stopPropagation();
    setPauseGameHover(true)
  }
  function handlePauseGamePointerLeave(e) {
    e.stopPropagation();
    setPauseGameHover(false)
  }
  function handlePauseGamePointerUp(e) {
    e.stopPropagation();
    if (pauseGame) {
      setPauseGame(false)
    } else {
      setEditGuestsOpen(false)
      setResetGameOpen(false)
      setPauseGame(true)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
  }
  function handleSetGameRulesPointerEnter(e) {
    e.stopPropagation();
    setSetGameRulesHover(true)
  }
  function handleSetGameRulesPointerLeave(e) {
    e.stopPropagation();
    setSetGameRulesHover(false)
  }
  function handleSetGameRulesPointerUp(e) {
    e.stopPropagation();
    if (setGameRulesOpen) {
      setSetGameRulesOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditGuestsOpen(false)
      setResetGameOpen(false)
      setSetGameRulesOpen(true)
      setSetGameRulesHover(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
  }
  function handleAudioPointerEnter(e) {
    e.stopPropagation();
    setAudioHover(true)
  }
  function handleAudioPointerLeave(e) {
    e.stopPropagation();
    setAudioHover(false)
  }
  function handleAudioPointerUp(e) {
    e.stopPropagation();
    if (audioOpen) {
      setAudioOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditGuestsOpen(false)
      setResetGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(true)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
  }
  function handleLanguagePointerEnter(e) {
    e.stopPropagation();
    setLanguageHover(true)
  }
  function handleLanguagePointerLeave(e) {
    e.stopPropagation();
    setLanguageHover(false)
  }
  function handleLanguagePointerUp(e) {
    e.stopPropagation();
    if (languageOpen) {
      setLanguageOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditGuestsOpen(false)
      setResetGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(true)
      setInviteFriendsOpen(false)
    }
  }
  function handleInviteFriendsPointerEnter(e) {
    e.stopPropagation();
    setInviteFriendsHover(true)
  }
  function handleInviteFriendsPointerLeave(e) {
    e.stopPropagation();
    setInviteFriendsHover(false)
  }
  function handleInviteFriendsPointerUp(e) {
    e.stopPropagation();
    if (inviteFriendsOpen) {
      setInviteFriendsOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditGuestsOpen(false)
      setResetGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(true)
    }
  }
  // #endregion

  function BackButton() {
    const [hover, setHover] = useState(false)

    function handleMouseOver () {
      setHover(true)
    }
    function handleMouseOut () {
      setHover(false)
    }
    function handleMouseUp() {
      if (editGuestsOpen) {
        setEditGuestsOpen(false)
        setMainMenuOpen(true)
      } else if (editAGuestOpen) {
        setEditAGuestOpen(false)
        setEditGuestsOpen(true)
      } else if (resetGameOpen) {
        setResetGameOpen(false)
        setMainMenuOpen(true)
      } else if (setGameRulesOpen) {
        setSetGameRulesOpen(false)
        setMainMenuOpen(true)
      }
    }
    return <button 
      className='menu-back-button'
      style={{
        fontFamily: 'Luckiest Guy',
        fontSize: `15px`,
        border: `2px solid ${hover ? 'white' : '#F1EE92'}`,
        margin: '3px',
        padding: '4px',
        color: `${hover ? 'white' : '#F1EE92'}`,
        backgroundColor: '#090F16',
        borderRadius: '5px',
        position: 'relative'}}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseUp={handleMouseUp}
      type="submit">
      &lt;&lt; BACK
    </button>
  }
  function CloseButton() {
    const [hover, setHover] = useState(false)

    function handleMouseOver () {
      setHover(true)
    }
    function handleMouseOut () {
      setHover(false)
    }
    function handleMouseUp() {
      setMainMenuOpen(false)
      setEditGuestsOpen(false)
      setEditAGuestOpen(false)
      setResetGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
    return <button 
      className='menu-close-button'
      style={{
        fontFamily: 'Luckiest Guy',
        fontSize: `15px`,
        border: `2px solid ${hover ? 'white' : '#F1EE92'}`,
        margin: '3px',
        padding: '4px',
        color: `${hover ? 'white' : '#F1EE92'}`,
        backgroundColor: '#090F16',
        borderRadius: '5px',
        position: 'relative'}}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseUp={handleMouseUp}
      type="submit">
      X CLOSE
    </button>
  }

  const teams = useAtomValue(teamsAtom)
  const client = useAtomValue(clientAtom)
  const host = useAtomValue(hostAtom)
  const spectators = useAtomValue(spectatorsAtom)
  function guestList() {
    // you first, host, team rockets, team ufos, and spectators
    const guests = [] // includes host (and you)

    // -1 team: spectator
    function formatGuest({ name, connectionState, isHost, isYou, team }) {
      return { name, connectionState, isHost, isYou, team }
    }
    if (client.socketId === host.socketId) {
      guests.push(formatGuest({ 
        name: client.name,
        connectionState: client.connectedToRoom,
        isYou: true,
        isHost: true,
        team: client.team
      })) // 'host, you'
    } else {
      guests.push(formatGuest({
        name: client.name,
        connectionState: client.connectedToRoom,
        isYou: true,
        isHost: false,
        team: client.team
      })) // 'you'
      guests.push(formatGuest({
        name: host.name,
        connectionState: host.connectedToRoom,
        isYou: false,
        isHost: true,
        team: host.team
      })) // 'host'
    }
    for (let teamId = 0; teamId < 2; teamId++) {
      for (const player of teams[teamId].players) {
        if (player.socketId !== client.socketId && player.socketId !== host.socketId) {
          guests.push(formatGuest({
            name: player.name,
            connectionState: player.connectedToRoom,
            isYou: false,
            isHost: false,
            team: player.team
          }))
        }
      }
    }
    for (const spectator of spectators) {
      if (spectator.socketId !== client.socketId && spectator.socketId !== host.socketId) {
        guests.push(formatGuest({
          name: spectator.name,
          connectionState: spectator.connectedToRoom,
          isYou: false,
          isHost: false,
          team: spectator.team
        }))
      }
    }
    return guests
  }
  function mapTeamToBackgroundColor(team) {
    if (team === -1) {
      return '#313131'
    } else if (team === 0) {
      return '#3A0404'
    } else if (team === 1) {
      return '#04363A'
    }
  }
  function mapTeamToPlayerColor(team) {
    if (team === -1) {
      return '#9F9F9F'
    } else if (team === 0) {
      return '#FF3A27'
    } else if (team === 1) {
      return '#A0E1DA'
    }
  }
  function EditGuests() {
    function ActionsButton({ guestInfo }) {
      const [hover, setHover] = useState(false)
  
      function handleMouseOver () {
        setHover(true)
      }
      function handleMouseOut () {
        setHover(false)
      }
      function handleMouseUp() {
        setGuestBeingEditted(guestInfo)
        setEditAGuestOpen(true)
        
        setMainMenuOpen(false)
        setEditGuestsOpen(false)
        setResetGameOpen(false)
        setSetGameRulesOpen(false)
        setAudioOpen(false)
        setLanguageOpen(false)
        setInviteFriendsOpen(false)
      }
  
      return <button 
        className='edit-player-actions-button'
        style={{
          fontFamily: 'Luckiest Guy',
          fontSize: `20px`,
          border: `2px solid ${hover ? 'white' : '#F1EE92'}`,
          borderRadius: '5px',
          margin: '3px',
          padding: '5px',
          color: `${hover ? 'white' : '#F1EE92'}`,
          backgroundColor: '#090F16',
          position: 'relative'}}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        type="submit">
        ACTIONS
      </button>
    }
    return <group name='edit-guests' 
      position={[-7.5, 0, -2.5]}
      rotation={[-Math.PI/2, 0, 0]}>
      {/* title */}
      {/* back button - history array */}
      {/* close button */}
      {/* for each player, map */}
      <Html transform>
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '350px',
          backgroundColor: '#090F16',
          border: '2px solid #F1EE92',
          borderRadius: '5px',
          padding: '5px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <p style={{
              fontFamily: 'Luckiest Guy',
              color: '#F1EE92',
              textAlign: 'left',
              padding: '0px',
              margin: '3px',
              fontSize: '22px',
            }}>
              EDIT Guests
            </p>
            <div>
              <BackButton/>
              <CloseButton/>
            </div>
          </div>
          { guestList().map((value, _index) => {
            return <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: mapTeamToBackgroundColor(value.team),
              margin: '3px',
              borderRadius: '5px',
              fontSize: '20px'
            }}>
              <p style={{
                fontFamily: 'Luckiest Guy',
                color: mapTeamToPlayerColor(value.team),
                padding: '5px',
                margin: '5px'
              }}>
                {value.name}
              </p>
              { value.isYou && !value.isHost && <p style={{
                fontFamily: 'Luckiest Guy',
                color: mapTeamToPlayerColor(-1), // grey
                padding: '5px',
                margin: '5px'
              }}>
                YOU
              </p>}
              { !value.isYou && value.isHost && <p style={{
                fontFamily: 'Luckiest Guy',
                color: mapTeamToPlayerColor(-1), // grey
                padding: '5px',
                margin: '5px'
              }}>
                HOST
              </p>}
              { value.isYou && value.isHost && <p style={{
                fontFamily: 'Luckiest Guy',
                color: mapTeamToPlayerColor(-1), // grey
                padding: '5px',
                margin: '5px'
              }}>
                HOST&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; YOU
              </p>}
              { !value.isYou && !value.isHost && <ActionsButton guestInfo={value}/>}
            </div>
          })}
        </div>
      </Html>
    </group>
  }
  function EditAGuest() {
    function SetAwayButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        // set player as away (skip to next player when he's chosen)
      }
      return <button 
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? 'white' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? 'white' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        SET AWAY
      </button>
    }
    function SetSpectatorButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        // set player to spectator
      }
      return <button 
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? 'white' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? 'white' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        SET SPECTATOR
      </button>
    }
    function AssignHostButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        // assign player to host
      }
      return <button 
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? 'white' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? 'white' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        ASSIGN HOST
      </button>
    }
    function KickButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        // remove player from the room
      }
      return <button 
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? 'white' : '#FF0000'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? 'white' : '#FF0000',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        KICK
      </button>
    }
    function SetTeamToRocketsButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        // remove player from the room
      }
      return <button 
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? 'white' : '#FF3A27'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? 'white' : '#FF3A27',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        SET TEAM TO ROCKETS
      </button>
    }
    function SetTeamToUfosButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        // remove player from the room
      }
      return <button 
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? 'white' : '#A0E1DA'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? 'white' : '#A0E1DA',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        SET TEAM TO UFOS
      </button>
    }

    return <Html 
      transform
      position={[-7.5, 0, -2.5]}
      rotation={[-Math.PI/2, 0, 0]}>
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '350px',
        backgroundColor: '#090F16',
        border: '2px solid #F1EE92',
        borderRadius: '5px',
        padding: '5px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <p style={{
            fontFamily: 'Luckiest Guy',
            color: '#F1EE92',
            textAlign: 'left',
            padding: '0px',
            margin: '3px',
            fontSize: '22px',
          }}>
            EDIT <span style={{
              color: mapTeamToPlayerColor(guestBeingEditted.team)
            }}>
              {guestBeingEditted.name}
            </span>
          </p>
          <div>
            <BackButton/>
            <CloseButton/>
          </div>
        </div>
        { guestBeingEditted.team === -1 ? <div className='spectator-buttons'>
          <SetTeamToRocketsButton/>
          <SetTeamToUfosButton/>
          <AssignHostButton/>
          <KickButton/>
        </div> : <div className='player-buttons'>
          <SetAwayButton/>
          <SetSpectatorButton/>
          <AssignHostButton/>
          <KickButton/>
        </div> }
      </div>
    </Html>
  }
  function ResetGame() {
    function YesButton() {
      const [hover, setHover] = useState(false)

      function handleMouseOver () {
        setHover(true)
      }
      function handleMouseOut () {
        setHover(false)
      }
      function handleMouseUp() {
        // reset game
      }

      return <button 
        className='reset-game-yes-button'
        style={{
          fontFamily: 'Luckiest Guy',
          fontSize: `20px`,
          border: `2px solid ${hover ? 'white' : '#F1EE92'}`,
          borderRadius: '5px',
          margin: '3px',
          padding: '5px',
          color: `${hover ? 'white' : '#F1EE92'}`,
          backgroundColor: '#090F16',
          position: 'relative',
          flexGrow: 1
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        type="submit">
        YUP
      </button>
    }
    function NoButton() {
      const [hover, setHover] = useState(false)

      function handleMouseOver () {
        setHover(true)
      }
      function handleMouseOut () {
        setHover(false)
      }
      function handleMouseUp() {
        // reset game
      }

      return <button 
        className='reset-game-no-button'
        style={{
          fontFamily: 'Luckiest Guy',
          fontSize: `20px`,
          border: `2px solid ${hover ? 'white' : '#FF0000'}`,
          borderRadius: '5px',
          margin: '3px',
          padding: '5px',
          color: `${hover ? 'white' : '#FF0000'}`,
          backgroundColor: '#090F16',
          position: 'relative',
          flexGrow: 1
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        type="submit">
        NOPE
      </button>
    }
    return <Html 
      transform
      position={[-7.5, 0, -2.5]}
      rotation={[-Math.PI/2, 0, 0]}>
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '350px',
          backgroundColor: '#090F16',
          border: '2px solid #F1EE92',
          borderRadius: '5px',
          fontFamily: 'Luckiest Guy',
          padding: '5px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <p style={{
              color: '#F1EE92',
              textAlign: 'left',
              padding: '0px',
              margin: '3px',
              fontSize: '22px',
            }}>
              EDIT Guests
            </p>
            <div>
              <BackButton/>
              <CloseButton/>
            </div>
          </div>
          <div>
            <p style={{
              color: '#F1EE92',
              padding: '0px',
              margin: '3px',
              fontSize: '22px',
            }}>
              ALL PROGRESS WILL BE ERASED. ARE YOU SURE?
            </p>
          </div>
          <div style={{
            display: 'flex',
          }}>
            <YesButton/>
            <NoButton/>
          </div>
        </div>
    </Html>
  }
  function SetGameRules() {
    return <Html 
      transform
      position={[-7.5, 0, -2.5]}
      rotation={[-Math.PI/2, 0, 0]}>
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '350px',
        backgroundColor: '#090F16',
        border: '2px solid #F1EE92',
        borderRadius: '5px',
        fontFamily: 'Luckiest Guy',
        padding: '5px',
        color: '#F1EE92',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <p style={{
            color: '#F1EE92',
            textAlign: 'left',
            padding: '0px',
            margin: '3px',
            fontSize: '22px',
          }}>
            SET GAME RULES
          </p>
          <div>
            <BackButton/>
            <CloseButton/>
          </div>
        </div>
        <div style={{
          backgroundColor: '#313131',
          borderRadius: '5px',
          margin: '5px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <p style={{
              padding: '0px',
              margin: '3px',
              fontSize: '20px',
            }}>BACKDO LAUNCH</p>
            <p style={{
              padding: '0px',
              margin: '3px',
              fontSize: '20px',
            }}>TOGGLE</p>
          </div>
          <p style={{
            padding: '3px',
            margin: '3px',
          }}>
            IF A TEAM THROWS A BACKDO (-1) AND HAS NO PIECES ON THE BOARD, THEY CAN PUT A PIECE ON THE STAR BEHIND EARTH.
          </p>
        </div>
        <div style={{
          backgroundColor: '#313131',
          borderRadius: '5px',
          margin: '5px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <p style={{
              padding: '0px',
              margin: '3px',
              fontSize: '20px',
            }}>TIMER</p>
            <p style={{
              padding: '0px',
              margin: '3px',
              fontSize: '20px',
            }}>TOGGLE</p>
          </div>
          <p style={{
            padding: '3px',
            margin: '3px',
          }}>
            1 MINUTE AFTER EVERY THROW. ON EXPIRE, ONE OF THE AVAILABLE MOVES WILL BE CHOSEN RANDOMLY.
          </p>
        </div>
      </div>
    </Html>
  }
  return <group {...props}>
    { mainMenuOpen && <group name='main-menu'>
      <group name='background'>
        <mesh
          position={[0,0,0]} // temporary
          rotation={[0, 0, 0]}
          scale={[4,0.01,5.1]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0,0,0]} // temporary
          rotation={[0, 0, 0]}
          scale={[3.95,0.02, 5.05]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='#090f16'/>
        </mesh>
        <Star 
        position={[-1.98, 0, -2.51]}
        scale={0.23}/>
      </group>
      <group name='buttons'> 
        <group name='edit-guests-button' position={[0, 0.1, -2.08]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.01,0.6]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ (editGuestsOpen || editGuestsHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleEditGuestsPointerEnter(e)}
            onPointerLeave={e => handleEditGuestsPointerLeave(e)}
            onPointerUp={e => handleEditGuestsPointerUp(e)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0,0.15]}
            rotation={[-Math.PI/4,0,0]}
            size={0.3}
            height={0.01}
          >
            EDIT GUESTS
            <meshStandardMaterial color={ (editGuestsOpen || editGuestsHover) ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
        <group name='reset-game-button' position={[0, 0.1, -1.38]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.01,0.6]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleResetGamePointerEnter(e)}
            onPointerLeave={e => handleResetGamePointerLeave(e)}
            onPointerUp={e => handleResetGamePointerUp(e)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0,0.15]}
            rotation={[-Math.PI/4,0,0]}
            size={0.3}
            height={0.01}
          >
            RESET GAME
            <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
        <group name='pause-game-button' position={[0, 0.1, -0.68]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.01,0.6]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ pauseGameHover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handlePauseGamePointerEnter(e)}
            onPointerLeave={e => handlePauseGamePointerLeave(e)}
            onPointerUp={e => handlePauseGamePointerUp(e)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
          { !pauseGame && <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0,0.15]}
            rotation={[-Math.PI/4,0,0]}
            size={0.3}
            height={0.01}
          >
            PAUSE GAME          ||
            <meshStandardMaterial color={ pauseGameHover ? 'green' : 'yellow' }/>
          </Text3D>}
          { pauseGame && <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0,0.15]}
            rotation={[-Math.PI/4,0,0]}
            size={0.3}
            height={0.01}
          >
            UNPAUSE GAME
            <meshStandardMaterial color={ pauseGameHover ? 'green' : 'yellow' }/>
          </Text3D>}
        </group>
        <group name='set-game-rules-button' position={[0, 0.1, 0.02]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.01,0.6]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ (setGameRulesOpen || setGameRulesHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleSetGameRulesPointerEnter(e)}
            onPointerLeave={e => handleSetGameRulesPointerLeave(e)}
            onPointerUp={e => handleSetGameRulesPointerUp(e)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0,0.15]}
            rotation={[-Math.PI/4,0,0]}
            size={0.3}
            height={0.01}
          >
            SET GAME RULES
            <meshStandardMaterial color={ (setGameRulesOpen || setGameRulesHover) ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
        <group name='audio-button' position={[0, 0.1, 0.72]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.01,0.6]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ (audioOpen || audioHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleAudioPointerEnter(e)}
            onPointerLeave={e => handleAudioPointerLeave(e)}
            onPointerUp={e => handleAudioPointerUp(e)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0,0.15]}
            rotation={[-Math.PI/4,0,0]}
            size={0.3}
            height={0.01}
          >
            AUDIO
            <meshStandardMaterial color={ (audioOpen || audioHover) ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
        <group name='language-button' position={[0, 0.1, 1.42]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.01,0.6]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ (languageOpen || languageHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleLanguagePointerEnter(e)}
            onPointerLeave={e => handleLanguagePointerLeave(e)}
            onPointerUp={e => handleLanguagePointerUp(e)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0.02,0.15]}
            rotation={[-Math.PI/2,0,0]}
            size={0.3}
            height={0.01}
          >
            LANGUAGE      EN<Image url='images/us-flag.png' position={[3.25,0.15,0]} scale={0.35}/>
            <meshStandardMaterial color={ (languageOpen || languageHover) ? 'green' : 'yellow' }/>
          </Text3D>
        </group>
        <group name='invite-friends-button' position={[0, 0.1, 2.12]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.01,0.6]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ (inviteFriendsOpen || inviteFriendsHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleInviteFriendsPointerEnter(e)}
            onPointerLeave={e => handleInviteFriendsPointerLeave(e)}
            onPointerUp={e => handleInviteFriendsPointerUp(e)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0,0.15]}
            rotation={[-Math.PI/4,0,0]}
            size={0.3}
            height={0.01}
          >
            INVITE FRIENDS
            <meshStandardMaterial color={ (inviteFriendsOpen || inviteFriendsHover) ? 'green' : 'yellow' }/>
          </Text3D>
        </group> 
      </group>
    </group> }
    { editGuestsOpen && <EditGuests/> }
    { editAGuestOpen && <EditAGuest/> }
    { resetGameOpen && <ResetGame/> }
    { setGameRulesOpen && <SetGameRules/> }
  </group>
}

// how to layer elements
// board, pieces, menu, alert, yoot