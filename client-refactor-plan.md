Plan: Client Refactor Ticket Roadmap
Refactor in six phases so each ticket is AI-executable, low-risk, and independently verifiable.
Recommendation: keep Jotai as the core state layer now, modularize SocketManager first, then reassess whether Redux Toolkit is still needed.

Ticket Queue (ordered)
C0.1 Baseline and Safety Nets
Goal: lock current behavior before refactor.
Main files: App.jsx, Experience.jsx, SocketManager.jsx, Game.jsx.
Done when: route flow, join flow, and turn flow are documented as acceptance snapshots.

C1.1 Route Ownership Split
Goal: formalize route architecture for five pages.
Main files: App.jsx, Experience.jsx.
Done when: landing and how-to-play are public routes, lobby/game/finish remain room-bound under /game/:id.

C1.2 Public Routes Must Not Connect Socket
Goal: prevent any socket side-effects on landing/how-to-play.
Main files: socket.js, App.jsx, Experience.jsx.
Done when: no socket connect happens unless user enters a room route.

C1.3 Room Guard and Recovery
Goal: handle invalid room id, failed join, kick/disconnect recovery cleanly.
Main files: Experience.jsx, DisconnectModal.jsx, Home2.jsx.
Done when: user always lands in a valid state after room errors.

C1.4 Animated Route and Room Loading Transitions
Goal: add transition/loading scene for landing and route switches.
Main files: App.jsx, Home2.jsx, Experience.jsx.
Done when: joining room and scene transitions are animated and non-jarring.

C2.1 Decompose SocketManager by Domain
Goal: split monolith into focused handler modules.
Main files: SocketManager.jsx, GlobalState.jsx.
Done when: event handlers are grouped by room sync, turn flow, movement/scoring, player membership, chat/settings, connectivity.

C2.2 Centralize Event-to-State Translation
Goal: remove ad hoc previous-state calculations from event handlers.
Main files: SocketManager.jsx, helpers.js.
Done when: each incoming event is translated once, then applied via focused state actions.

C2.3 State Slice Cleanup
Goal: organize atoms/actions into feature slices.
Main files: GlobalState.jsx, useGameHelpers.js.
Done when: board, teams, alerts, session/ui states are clearly separated and easier to navigate.

C3.1 Unify Token Selection Logic
Goal: replace duplicate selection code in piece and tile click handlers with one shared selector.
Main files: Piece.jsx, Tile.jsx, legalTiles.jsx.
Done when: one path computes selection, legal tiles, helper tiles, tokenChoices updates.

C3.2 Simplify Pieces On Board State
Goal: reduce per-piece repetition while preserving animations.
Main files: PiecesOnBoard.jsx, GlobalState.jsx, SocketManager.jsx.
Done when: piece updates use indexed helpers/collections instead of repetitive per-piece blocks.

C3.3 Token Choice Flow Consolidation
Goal: clean duplicated tokenChoices/tokenChoice resets across game loop.
Main files: Game.jsx, Piece.jsx, Tile.jsx, useGameHelpers.js.
Done when: token choice lifecycle is consistent and centralized.

C4.1 Alert Payload Normalization
Goal: replace string-encoded alerts with structured objects and a parser compatibility layer.
Main files: SocketManager.jsx, Alert.jsx, GlobalState.jsx.
Done when: alert data shape is explicit and no new logic depends on string slicing conventions.

C4.2 Alert Queue Manager
Goal: stop duplicate/retrigger issues caused by unrelated state changes.
Main files: Alert.jsx, JoinAlert.jsx, AllClearAlert.jsx.
Done when: alerts are enqueued/dequeued idempotently and replay only when intended.

C5.1 Responsive Device Model Upgrade
Goal: replace width-only device detection with orientation + viewport model.
Main files: GlobalState.jsx, useResponsiveSetting.jsx, mediaValues.js.
Done when: portrait/landscape transitions are handled deterministically.

C5.2 Stable Token Coordinates Across Rotation
Goal: keep token positions stable during orientation change.
Main files: PiecesOnBoard.jsx, layout.js, tilePositions.js.
Done when: tokens return to correct board coordinates after rotate.

C5.3 Camera and Scale Canonicalization
Goal: one canonical scale baseline + centralized camera config by scene/device profile.
Main files: GameCamera.jsx, Game.jsx, LobbyNew.jsx, RocketsWin2.jsx.
Done when: camera framing and token scale are consistent in both orientations.

C6.1 Regression, Perf, and Cleanup
Goal: stabilize, remove dead paths, and verify no multiplayer regressions.
Main files: SocketManager.jsx, components, alerts.
Done when: tests/build pass and manual matrix passes for route, turn flow, alert flow, and rotate/reconnect scenarios.

Dependency Map
Do first: C0.1, C1.1, C1.2
Then: C1.3 and C1.4 in parallel
Then: C2.1 → C2.2 → C2.3
Then parallel: C3.1/C3.2/C3.3 and C4.1/C4.2
Then: C5.1 → C5.2 → C5.3
Finish with: C6.1
Verification Standard Per Ticket
Build passes: npm run build
Tests pass (where applicable): npm test
Manual checks include:
Public routes never open socket
Room route joins and reconnects correctly
Turn, move, score, and finish behavior unchanged
Alerts do not replay unexpectedly
Orientation change keeps token positions and camera stable
Plan is saved in session memory and ready to be split into individual AI prompts next.

-------------------------------------------------------------------------

Ticket C1.1 Prompt (paste into AI)
Title: Route architecture split for public vs room pages

Goal:
Refactor route ownership so landing and how-to-play are fully public/offline, while lobby/game/finish remain room-bound under the game route. Do not change gameplay behavior yet.

Context:
Current routing and room orchestration are in App.jsx and Experience.jsx. Socket lifecycle is in socket.js.

Requirements:

Keep these routes:
/ -> landing page
/how-to-play -> how-to-play page
/game/:id -> room-bound experience
Ensure public routes do not require room id.
Keep existing visuals and behavior for lobby, game, and finish scenes.
Keep current gamePhase-driven scene switching inside the room experience.
Do not perform SocketManager decomposition in this ticket.
Implementation tasks:

Create clear route shells:
Public shell for landing/how-to-play
Room shell for /game/:id
Move room-only logic to room shell if any logic currently leaks into public route rendering.
Keep SEO behavior for home/how-to-play intact.
Keep Canvas-based rendering behavior unchanged unless needed for routing separation.
Acceptance criteria:

Visiting / loads landing successfully.
Visiting /how-to-play loads how-to-play successfully.
Visiting /game/ABCD loads room experience and still transitions lobby -> pregame/game -> finished based on gamePhase.
No regressions in existing route paths.
Build passes with npm run build.
Out of scope:

Socket connect gating logic for public routes (next ticket C1.2).
State refactor and SocketManager split.
Alert/refponsive fixes.
Files likely touched:

App.jsx
Experience.jsx
index.js if needed for shell/provider boundaries
Deliverables:

Code changes for route ownership split.
Short change summary listing what moved and why.
Verification notes for the 4 route checks plus build result.
Next after this ticket
Run C1.2 immediately after: enforce no socket creation/connection on public routes.