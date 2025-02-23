import { useAtomValue, useSetAtom } from "jotai"
import { clientAtom, deviceAtom, hostAtom, languageAtom } from "./GlobalState"
import { useParams } from "wouter"
import { useState } from "react"

export default function Settings({ position, rotation, scale }) {
  // #region state setters and getters
  const device = useAtomValue(deviceAtom)
  const client = useAtomValue(clientAtom)
  const host = useAtomValue(hostAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const pauseGame = useAtomValue(pauseGameAtom)
  const params = useParams()

  const [mainMenuOpen, setMainMenuOpen] = useState(true)
  const setSettingsOpen = useSetAtom(settingsOpenAtom)
  // edit players
  const [editGuestsOpen, setEditGuestsOpen] = useState(false)
  const [guestBeingEditted, setGuestBeingEditted] = useState(null)
  const [editAGuestOpen, setEditAGuestOpen] = useState(false)
  // the rest
  const [resetGameOpen, setResetGameOpen] = useState(false)
  const [setGameRulesOpen, setSetGameRulesOpen] = useState(false)
  const [viewGuestsOpen, setViewGuestsOpen] = useState(false)
  const [viewGameRulesOpen, setViewGameRulesOpen] = useState(false)
  const [audioOpen, setAudioOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [language, setLanguage] = useAtom(languageAtom)
  const [inviteFriendsOpen, setInviteFriendsOpen] = useState(false)
  // #endregion

  return <group position={position} rotation={rotation} scale={scale}>
    <group name='background'></group>
    { mainMenuOpen && <MainMenuHtml/> }
    { editGuestsOpen && <EditGuests/> }
    { editAGuestOpen && <EditAGuest/> }
    { resetGameOpen && <ResetGame/> }
    { setGameRulesOpen && <SetGameRules/> }
    { viewGuestsOpen && <ViewGuests/> }
    { viewGameRulesOpen && <ViewGameRules/> }
    { audioOpen && <Audio2/> }
    { languageOpen && <Language/> }
  </group>
}