import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { backdoRuleOnAtom, clientAtom, deviceAtom, hostAtom, settingsOpenAtom, spectatorsAtom, teamsAtom, timerOnAtom } from "./GlobalState";
import HtmlColors from "./HtmlColors";
import layout from './layout'

// global state
// audio
// language
export default function SettingsHtml(props) {
  // #region state setters and getters
  const device = useAtomValue(deviceAtom)
  const client = useAtomValue(clientAtom)
  const host = useAtomValue(hostAtom)

  const [mainMenuOpen, setMainMenuOpen] = useState(true)
  const setSettingsOpen = useSetAtom(settingsOpenAtom)
  // edit players
  const [editGuestsOpen, setEditGuestsOpen] = useState(false)
  const [guestBeingEditted, setGuestBeingEditted] = useState(null)
  const [editAGuestOpen, setEditAGuestOpen] = useState(false)
  // the rest
  const [resetGameOpen, setResetGameOpen] = useState(false)
  const [pauseGame, setPauseGame] = useState(false)
  const [setGameRulesOpen, setSetGameRulesOpen] = useState(false)
  const [viewGuestsOpen, setViewGuestsOpen] = useState(false)
  const [viewGameRulesOpen, setViewGameRulesOpen] = useState(false)
  const [audioOpen, setAudioOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [inviteFriendsOpen, setInviteFriendsOpen] = useState(false)
  // #endregion

  // helper functions
  function formatName(name) {
    if (name.length > 8) {
      return name.slice(0, 8) + '...'
    } else {
      return name
    }
  }

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
      } else if (viewGuestsOpen) {
        setViewGuestsOpen(false)
        setMainMenuOpen(true)
      } else if (viewGameRulesOpen) {
        setViewGameRulesOpen(false)
        setMainMenuOpen(true)
      } else if (audioOpen) {
        setAudioOpen(false)
        setMainMenuOpen(true)
      } else if (languageOpen) {
        setLanguageOpen(false)
        setMainMenuOpen(true)
      } else if (inviteFriendsOpen) {
        setInviteFriendsOpen(false)
        setMainMenuOpen(true)
      }
    }
    return <button 
      className='menu-back-button'
      style={{
        fontFamily: 'Luckiest Guy',
        fontSize: `15px`,
        border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
        margin: '3px',
        padding: '4px',
        color: `${hover ? '#009E14' : '#F1EE92'}`,
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
      setSettingsOpen(false)
      setMainMenuOpen(false)
      setEditGuestsOpen(false)
      setEditAGuestOpen(false)
      setResetGameOpen(false)
      setSetGameRulesOpen(false)
      setViewGuestsOpen(false)
      setViewGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
    return <button 
      className='menu-close-button'
      style={{
        fontFamily: 'Luckiest Guy',
        fontSize: `15px`,
        border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
        margin: '3px',
        padding: '4px',
        color: `${hover ? '#009E14' : '#F1EE92'}`,
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          margin: '3px',
          padding: '5px',
          color: `${hover ? '#009E14' : '#F1EE92'}`,
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
      position={layout[device].game.settings.editGuests.position}
      rotation={layout[device].game.settings.editGuests.rotation}>
      <Html transform>
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: layout[device].game.settings.editGuests.containerWidth,
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
          { guestList().map((value, index) => {
            return <div key={index} style={{
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
                {formatName(value.name)}
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
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
          border: `2px solid ${hover ? '#009E14' : '#FF0000'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#FF0000',
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
          border: `2px solid ${hover ? '#009E14' : '#FF3A27'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#FF3A27',
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
          border: `2px solid ${hover ? '#009E14' : '#A0E1DA'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#A0E1DA',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        SET TEAM TO UFOS
      </button>
    }
    return <Html 
      transform
      position={layout[device].game.settings.editAGuest.position}
      rotation={layout[device].game.settings.editAGuest.rotation}>
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          margin: '3px',
          padding: '5px',
          color: `${hover ? '#009E14' : '#F1EE92'}`,
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
          border: `2px solid ${hover ? '#009E14' : '#FF0000'}`,
          borderRadius: '5px',
          margin: '3px',
          padding: '5px',
          color: `${hover ? '#009E14' : '#FF0000'}`,
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
      position={layout[device].game.settings.resetGame.position}
      rotation={layout[device].game.settings.resetGame.rotation}>
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
              RESET GAME
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
              fontSize: '32px',
            }}>
              ALL PROGRESS WILL BE ERASED. 
              ARE YOU SURE?
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
    const [backdoLaunchOn, setBackdoLaunchOn] = useState(false)
    const [backdoLaunchToggleHover, setBackdoLaunchToggleHover] = useState(false)
    const [timerOn, setTimerOn] = useState(false)
    const [timerToggleHover, setTimerToggleHover] = useState(false)

    function handleBackdoLaunchTogglePointerEnter() {
      setBackdoLaunchToggleHover(true)
    }
    function handleBackdoLaunchTogglePointerLeave() {
      setBackdoLaunchToggleHover(false)
    }
    function handleBackdoLaunchTogglePointerUp() {
      if (!backdoLaunchOn) 
        setBackdoLaunchOn(true)
      else
        setBackdoLaunchOn(false)
    }
    function handleTimerTogglePointerEnter() {
      setTimerToggleHover(true)
    }
    function handleTimerTogglePointerLeave() {
      setTimerToggleHover(false)
    }
    function handleTimerTogglePointerUp() {
      if (!timerOn) 
        setTimerOn(true)
      else
        setTimerOn(false)
    }
    return <Html 
      transform
      position={layout[device].game.settings.setGameRules.position}
      rotation={layout[device].game.settings.setGameRules.rotation}>
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
            <div id='backdoLaunchToggle' style={{
              width: '20px',
              height: '20px',
              backgroundColor: HtmlColors.spaceDark,
              border: '2px solid #F1EE92',
              borderRadius: '5px',
              margin: '3px'
            }}
            onPointerEnter={handleBackdoLaunchTogglePointerEnter}
            onPointerLeave={handleBackdoLaunchTogglePointerLeave}
            onPointerUp={handleBackdoLaunchTogglePointerUp}
            >
              <div id='backdoLaunchToggleState' style={{
                margin: '3px',
                padding: '0px',
                borderRadius: '5px',
                backgroundColor: backdoLaunchOn ? HtmlColors.starYellow : !backdoLaunchToggleHover ? HtmlColors.spaceDark : HtmlColors.starYellowHover,
                width: 'calc(100% - 6px)',
                height: 'calc(100% - 6px)'
              }}>
              </div>
            </div>
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
            <div id='timerToggle' style={{
              width: '20px',
              height: '20px',
              backgroundColor: HtmlColors.spaceDark,
              border: '2px solid #F1EE92',
              borderRadius: '5px',
              margin: '3px'
            }}
            onPointerEnter={handleTimerTogglePointerEnter}
            onPointerLeave={handleTimerTogglePointerLeave}
            onPointerUp={handleTimerTogglePointerUp}
            >
              <div id='timerToggleState' style={{
                margin: '3px',
                padding: '0px',
                borderRadius: '5px',
                backgroundColor: timerOn ? HtmlColors.starYellow : !timerToggleHover ? HtmlColors.spaceDark : HtmlColors.starYellowHover,
                width: 'calc(100% - 6px)',
                height: 'calc(100% - 6px)'
              }}>
              </div>
            </div>
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
  function ViewGuests() {
    return <group name='view-guests' 
      position={layout[device].game.settings.editGuests.position}
      rotation={layout[device].game.settings.editGuests.rotation}>
      <Html transform>
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: layout[device].game.settings.editGuests.containerWidth,
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
              VIEW GUESTS
            </p>
            <div>
              <BackButton/>
              <CloseButton/>
            </div>
          </div>
          { guestList().map((value, index) => {
            return <div key={index} style={{
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
                {formatName(value.name)}
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
            </div>
          })}
        </div>
      </Html>
    </group>
  }
  function ViewGameRules() {
    const backdoRuleOn = useAtomValue(backdoRuleOnAtom)
    const timerOn = useAtomValue(timerOnAtom)
    return <Html 
      transform
      position={layout[device].game.settings.setGameRules.position}
      rotation={layout[device].game.settings.setGameRules.rotation}>
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
            VIEW GAME RULES
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
              margin: '5px',
              fontSize: '20px',
            }}>BACKDO LAUNCH</p>
            <p style={{
              padding: '0px',
              margin: '5px',
              fontSize: '20px',
              color: backdoRuleOn ? HtmlColors.starYellow : HtmlColors.disabledGrey
            }}>{ backdoRuleOn ? "ON" : "OFF"}</p>
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
              margin: '5px',
              fontSize: '20px',
            }}>TIMER</p>
            <p style={{
              padding: '0px',
              margin: '5px',
              fontSize: '20px',
              color: timerOn ? HtmlColors.starYellow : HtmlColors.disabledGrey
            }}>{ timerOn ? "ON" : "OFF"}</p>
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
  function Audio() {
    const [musicSliderPosition, setMusicSliderPosition] = useState({ x: 0 })
    const [musicSliderDragging, setMusicSliderDragging] = useState(false)
    const [musicSliderOffset, setMusicSliderOffset] = useState({ x: 0 })


    const musicSliderRef = useRef(null);

    function handleMusicSliderPointerEnter() {
      document.body.style.cursor = "pointer"
    }
    function handleMusicSliderPointerDown(e) {
      e.preventDefault() // prevent the crossed-out symbol from appearing when mouse leaves the image
      setMusicSliderDragging(true)

      const rect = musicSliderRef.current.getBoundingClientRect();
      setMusicSliderOffset({
        x: e.clientX
      })
    }
    function handleMusicSliderPointerMove(e) {
      if (!musicSliderDragging) return;

      console.log('slider move', e.clientX, musicSliderOffset.x)
      setMusicSliderPosition({
        x: Math.max(0, e.clientX - musicSliderOffset.x)
      })
    }
    function handleMusicSliderPointerUp() {
      setMusicSliderDragging(false)
    }
    function handleMusicSliderPointerLeave() {
      setMusicSliderDragging(false)
      document.body.style.cursor = "default"
    }

    return <Html 
      transform
      position={[-7.5, 0, -2.5]}
      rotation={[-Math.PI/2, 0, 0]}>
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '325px',
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
            AUDIO
          </p>
          <div>
            <BackButton/>
            <CloseButton/>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <p style={{
            color: '#F1EE92',
            textAlign: 'left',
            padding: '0px',
            margin: '3px',
            fontSize: '40px',
          }}>
            MUSIC
          </p>
          <div>
            <div style={{
              backgroundColor: HtmlColors.starYellow,
              width: '170px',
              height: '10px',
              position: 'relative',
              borderRadius: '20px',
              top: '21px',
            }}>
            </div>
            <img src='images/star.png' style={{
                position: 'relative',
                width: '40px',
                top: '-5px',
                left: `${musicSliderPosition.x}px`
              }}
              onPointerEnter={handleMusicSliderPointerEnter}
              onPointerDown={e=>handleMusicSliderPointerDown(e)}
              onPointerMove={e=>handleMusicSliderPointerMove(e)}
              onPointerUp={handleMusicSliderPointerUp}
              onPointerLeave={handleMusicSliderPointerLeave}
              ref={musicSliderRef}
            />
          </div>
        </div>
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
            EFFECTS
          </p>
          <p style={{
            color: '#F1EE92',
            textAlign: 'left',
            padding: '0px',
            margin: '3px',
            fontSize: '22px',
          }}>
            BAR
          </p>
        </div>
      </div>
    </Html>
  }
  function Audio2() {    
    // sync the state with global state
    const [musicOn, setMusicOn] = useState(false)
    const [musicToggleHover, setMusicToggleHover] = useState(false)
    const [effectsOn, setEffectsOn] = useState(false)
    const [effectsToggleHover, setEffectsToggleHover] = useState(false)
    function handleMusicTogglePointerEnter() {
      setMusicToggleHover(true)
    }
    function handleMusicTogglePointerLeave() {
      setMusicToggleHover(false)
    }
    function handleMusicTogglePointerUp() {
      if (!musicOn)
        setMusicOn(true)
      // adjust volume on client
      else
        setMusicOn(false)
        // adjust volume on client
    }
    function handleEffectsTogglePointerEnter() {
      setEffectsToggleHover(true)
    }
    function handleEffectsTogglePointerLeave() {
      setEffectsToggleHover(false)
    }
    function handleEffectsTogglePointerUp() {
      if (!effectsOn)
        setEffectsOn(true)
        // adjust volume on client
      else
        setEffectsOn(false)
        // adjust volume on client
    }

    return <Html 
      transform
      position={layout[device].game.settings.audio.position}
      rotation={layout[device].game.settings.audio.rotation}>
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '250px',
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
            AUDIO
          </p>
          <div>
            <BackButton/>
            <CloseButton/>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <p style={{
            color: '#F1EE92',
            textAlign: 'left',
            padding: '0px',
            margin: '3px',
            fontSize: '20px',
          }}>
            MUSIC
          </p>
          <div id='musicToggle' style={{
            width: '20px',
            height: '20px',
            backgroundColor: HtmlColors.spaceDark,
            border: '2px solid #F1EE92',
            borderRadius: '5px',
            margin: '3px'
          }}
          onPointerEnter={handleMusicTogglePointerEnter}
          onPointerLeave={handleMusicTogglePointerLeave}
          onPointerUp={handleMusicTogglePointerUp}
          >
            <div id='musicToggleState' style={{
              margin: '3px',
              padding: '0px',
              borderRadius: '5px',
              backgroundColor: musicOn ? HtmlColors.starYellow : !musicToggleHover ? HtmlColors.spaceDark : HtmlColors.starYellowHover,
              width: 'calc(100% - 6px)',
              height: 'calc(100% - 6px)'
            }}>
            </div>
          </div>
        </div>
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
            EFFECTS
          </p>
          <div id='effectsToggle' style={{
            width: '20px',
            height: '20px',
            backgroundColor: HtmlColors.spaceDark,
            border: '2px solid #F1EE92',
            borderRadius: '5px',
            margin: '3px'
          }}
          onPointerEnter={handleEffectsTogglePointerEnter}
          onPointerLeave={handleEffectsTogglePointerLeave}
          onPointerUp={handleEffectsTogglePointerUp}
          >
            <div id='effectsToggleState' style={{
              margin: '3px',
              padding: '0px',
              borderRadius: '5px',
              backgroundColor: effectsOn ? HtmlColors.starYellow : !effectsToggleHover ? HtmlColors.spaceDark : HtmlColors.starYellowHover,
              width: 'calc(100% - 6px)',
              height: 'calc(100% - 6px)'
            }}>
            </div>
          </div>
        </div>
      </div>
    </Html>
  }
  function Language() {
    function EnglishButton() {
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
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px',
          whiteSpace: 'pre'
        }}>
          ENGLISH  <img src='images/us-flag.png' width='25px' style={{ position: 'relative', top: '3px', pointerEvents: 'none' }} />    
        </button>
    }
    function KoreanButton() {
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
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px',
          whiteSpace: 'pre'
        }}>
          KOREAN  <img src='images/south-korean-flag.png' width='25px' style={{ position: 'relative', top: '3px', pointerEvents: 'none' }} />    
        </button>
    }
    function SpanishButton() {
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
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px',
          whiteSpace: 'pre'
        }}>
          SPANISH  <img src='images/spanish-flag.png' width='25px' style={{ position: 'relative', top: '3px', pointerEvents: 'none' }} />    
        </button>
    }
    function ChineseButton() {
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
          backgroundColor: '#090F16',
          margin: '3px',
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px',
          whiteSpace: 'pre'
        }}>
          CHINESE  <img src='images/chinese-flag.png' width='25px' style={{ position: 'relative', top: '3px', pointerEvents: 'none' }} />    
        </button>
    }

    return <Html 
      transform
      position={layout[device].game.settings.language.position}
      rotation={layout[device].game.settings.language.rotation}>
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '300px',
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
            SET LANGUAGE
          </p>
          <div>
            <BackButton/>
            <CloseButton/>
          </div>
        </div>
        <div className='language-buttons'>
          <EnglishButton/>
          <KoreanButton/>
          <SpanishButton/>
          <ChineseButton/>
        </div>
      </div>
    </Html>
  }
  function InviteFriends() {
    const [checkmarkVisible, setCheckmarkVisible] = useState(false)
    const [checkmarkTimer, setCheckmarkTimer] = useState(null)
    function CopyButton() {
      const [copyButtonHover, setCopyButtonHover] = useState(false)
  
      function handleMouseOver () {
        setCopyButtonHover(true)
      }
      function handleMouseOut () {
        setCopyButtonHover(false)
      }
      
      function copyURLToClipboard() {
        const url = window.location.href;
      
        if (navigator.clipboard && navigator.clipboard.writeText) {
          // Modern browsers with Clipboard API support
          navigator.clipboard.writeText(url)
            .then(() => {
            })
            .catch(err => {
              console.error("Failed to copy URL: ", err);
            });
        } else {
          // Fallback for older browsers
          const tempInput = document.createElement("input");
          document.body.appendChild(tempInput);
          tempInput.value = url;
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }
      }

      function handleMouseUp() {
        copyURLToClipboard();
        clearTimeout(checkmarkTimer)
        setCheckmarkVisible(true);
        setCheckmarkTimer(setTimeout(() => {
          setCheckmarkVisible(false);
        }, 2000))
      }
  
      return <button 
        className='edit-player-actions-button'
        style={{
          fontFamily: 'Luckiest Guy',
          fontSize: `20px`,
          border: `2px solid ${copyButtonHover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          margin: '3px',
          padding: '1px 5px 1px 5px',
          color: `${copyButtonHover ? '#009E14' : '#F1EE92'}`,
          backgroundColor: '#090F16',
          position: 'relative'}}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        type="submit">
        COPY
      </button>
    }
    return <Html 
      transform
      position={layout[device].game.settings.inviteFriends.position}
      rotation={layout[device].game.settings.inviteFriends.rotation}>
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '400px',
          backgroundColor: '#090F16',
          border: '2px solid #F1EE92',
          borderRadius: '5px',
          fontFamily: 'Luckiest Guy',
          padding: '10px',
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
              INVITE FRIENDS
            </p>
            <div>
              <BackButton/>
              <CloseButton/>
            </div>
          </div>
          <p style={{
            color: '#F1EE92',
            textAlign: 'center',
            padding: '0px',
            margin: '10px',
            fontSize: '30px',
          }}>
            JOIN THIS ROOM!
          </p>
          <div style={{
            display:'flex',
            justifyContent: 'center'
          }}>
            <p style={{
              color: '#F1EE92',
              textAlign: 'center',
              padding: '0px',
              margin: '2px',
              fontSize: '30px',
            }}>
              YUTNORI.APP/<span style={{color:HtmlColors.infoGreen}}>ABCD</span>
            </p>
            <CopyButton/>
            <div style={{
              width: '0px', 
              height: '0px',
              position: 'absolute',
              left: '378px',
              top: '107px'}}>
                {checkmarkVisible && <img src='images/green-checkmark.svg' width='30px'/>}
            </div>
          </div>
          <div style={{display:'flex', padding: '20px'}}>
            <img src="images/qr-code-sample.png" style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '10px',
              marginBottom: '10px',
              width: '200px'
            }}/>
            <p style={{
              color: '#F1EE92',
              textAlign: 'left',
              padding: '0px',
              margin: '10px',
              fontSize: '30px',
              width: '200px'
            }}>
              SCAN THE QR CODE, OR ENTER THE LINK INTO A BROWSER.
            </p>
          </div>
        </div>
    </Html>
  }
  function MainMenuHtml() {
    // for host
    function EditGuestsButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        setEditGuestsOpen(true)
        setMainMenuOpen(false)
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        EDIT GUESTS
      </button>
    }
    function ResetGameButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        setResetGameOpen(true)
        setMainMenuOpen(false)
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        RESET GAME
      </button>
    }
    function PauseGameButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        if (!pauseGame)
          setPauseGame(true)
        else 
          setPauseGame(false)
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px',
          whiteSpace: 'pre'
        }}>
        { !pauseGame && `PAUSE GAME              ||`}
        { pauseGame && `UNPAUSE GAME       \u25BA`}
      </button>
    }
    function SetGameRulesButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        setSetGameRulesOpen(true)
        setMainMenuOpen(false)
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        SET GAME RULES
      </button>
    }
    // for guest
    function ViewGuestsButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        setViewGuestsOpen(true)
        setMainMenuOpen(false)
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        VIEW GUESTS
      </button>
    }
    function ViewGameRulesButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        setViewGameRulesOpen(true)
        setMainMenuOpen(false)
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        VIEW GAME RULES
      </button>
    }

    // for both
    function AudioButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        setMainMenuOpen(false)
        setAudioOpen(true)
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        AUDIO
      </button>
    }
    function LanguageButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        if (!hover) {
          setHover(true)
        }
      }
      function handleMouseOut() {
        if (hover) {
          setHover(false)
        }
      }
      function handleMouseUp() {
        setMainMenuOpen(false)
        setLanguageOpen(true)
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px',
          whiteSpace: 'pre'
        }}>
        LANGUAGE         EN <img src='images/us-flag.png' width='25px' style={{ position: 'relative', top: '3px', pointerEvents: 'none' }} 
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}/>
      </button>
    }
    function InviteFriendsButton() {
      const [hover, setHover] = useState(false);
      function handleMouseEnter() {
        setHover(true)
      }
      function handleMouseOut() {
        setHover(false)
      }
      function handleMouseUp() {
        console.log('button click')
        setMainMenuOpen(false)
        setInviteFriendsOpen(true)
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
          border: `2px solid ${hover ? '#009E14' : '#F1EE92'}`,
          borderRadius: '5px',
          width: 'calc(100% - 6px)', // margin 3px both sides
          padding: '5px',
          color: hover ? '#009E14' : '#F1EE92',
          fontFamily: 'Luckiest Guy',
          fontSize: '20px'
        }}>
        INVITE FRIENDS
      </button>
    }

    return <group name='main-menu'>
      <Html
        transform
        position={layout[device].game.settings.mainMenu.position}
        rotation={layout[device].game.settings.mainMenu.rotation}>
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '200px',
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
              MENU
            </p>
            <div>
              <CloseButton/>
            </div>
          </div>
          <div className='main-menu-buttons'>
            { client.socketId === host.socketId && <EditGuestsButton/> }
            { client.socketId === host.socketId && <ResetGameButton/> }
            { client.socketId === host.socketId && <PauseGameButton/> }
            { client.socketId === host.socketId && <SetGameRulesButton/> }
            { client.socketId !== host.socketId && <ViewGuestsButton/> }
            { client.socketId !== host.socketId && <ViewGameRulesButton/> }
            <AudioButton/>
            <LanguageButton/>
            <InviteFriendsButton/>
          </div> 
        </div>
      </Html>
    </group>
  }

  return <group {...props}>
    { mainMenuOpen && <MainMenuHtml/> }
    { editGuestsOpen && <EditGuests/> }
    { editAGuestOpen && <EditAGuest/> }
    { resetGameOpen && <ResetGame/> }
    { setGameRulesOpen && <SetGameRules/> }
    { viewGuestsOpen && <ViewGuests/> }
    { viewGameRulesOpen && <ViewGameRules/> }
    { audioOpen && <Audio2/> }
    { languageOpen && <Language/> }
    { inviteFriendsOpen && <InviteFriends/> }
  </group>
}

// how to layer elements
// board, pieces, menu, alert, yoot