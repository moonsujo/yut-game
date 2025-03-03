import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect, useRef } from 'react';
import { catchPathAtom, gamePhaseAtom, hasTurnAtom, pieceTeam0Id0AnimationPlayingAtom, pieceTeam0Id0Atom, pieceTeam0Id1AnimationPlayingAtom, pieceTeam0Id1Atom, pieceTeam0Id2AnimationPlayingAtom, pieceTeam0Id2Atom, pieceTeam0Id3AnimationPlayingAtom, pieceTeam0Id3Atom, pieceTeam1Id0AnimationPlayingAtom, pieceTeam1Id0Atom, pieceTeam1Id1AnimationPlayingAtom, pieceTeam1Id1Atom, pieceTeam1Id2AnimationPlayingAtom, pieceTeam1Id2Atom, pieceTeam1Id3AnimationPlayingAtom, pieceTeam1Id3Atom, selectionAtom, teamsAtom } from './GlobalState';
import tilePositions from './tilePositions';
import { useSpring } from '@react-spring/three';
import Piece from './components/Piece';
import { roundNum, pieceSelected } from './helpers/helpers';

export default function PiecesOnBoard({ currentMovesRockets, currentMovesUfos, boardOffset }) {
    const [pieceTeam0Id0] = useAtom(pieceTeam0Id0Atom)
    const [pieceTeam0Id1] = useAtom(pieceTeam0Id1Atom)
    const [pieceTeam0Id2] = useAtom(pieceTeam0Id2Atom)
    const [pieceTeam0Id3] = useAtom(pieceTeam0Id3Atom)
    const [pieceTeam1Id0] = useAtom(pieceTeam1Id0Atom)
    const [pieceTeam1Id1] = useAtom(pieceTeam1Id1Atom)
    const [pieceTeam1Id2] = useAtom(pieceTeam1Id2Atom)
    const [pieceTeam1Id3] = useAtom(pieceTeam1Id3Atom)
    const catchPath = useAtomValue(catchPathAtom)
    
    const setPieceTeam0Id0AnimationPlaying = useSetAtom(pieceTeam0Id0AnimationPlayingAtom)
    const setPieceTeam0Id1AnimationPlaying = useSetAtom(pieceTeam0Id1AnimationPlayingAtom)
    const setPieceTeam0Id2AnimationPlaying = useSetAtom(pieceTeam0Id2AnimationPlayingAtom)
    const setPieceTeam0Id3AnimationPlaying = useSetAtom(pieceTeam0Id3AnimationPlayingAtom)
    const setPieceTeam1Id0AnimationPlaying = useSetAtom(pieceTeam1Id0AnimationPlayingAtom)
    const setPieceTeam1Id1AnimationPlaying = useSetAtom(pieceTeam1Id1AnimationPlayingAtom)
    const setPieceTeam1Id2AnimationPlaying = useSetAtom(pieceTeam1Id2AnimationPlayingAtom)
    const setPieceTeam1Id3AnimationPlaying = useSetAtom(pieceTeam1Id3AnimationPlayingAtom)
    const [gamePhase] = useAtom(gamePhaseAtom)
    const responsiveScale = 1.0
    const idOffsets = [
        [-0.3, 0, -0.25],
        [0.3, 0, -0.25],
        [-0.3, 0, 0.25],
        [0.3, 0, 0.25],
    ]
    const heightOffset = 0.9

    function getPositionByTile(tile, pieceId) {
        if (tile === -1 || tile === 29) {
            return [0,0,0]
        } else {
            return [
                roundNum(tilePositions[tile][0] + idOffsets[pieceId][0], 1) * responsiveScale,
                roundNum(tilePositions[tile][1] + heightOffset + idOffsets[pieceId][1], 1) * responsiveScale,
                roundNum(tilePositions[tile][2] + idOffsets[pieceId][2], 1) * responsiveScale,
            ]
        }
    }
    function getScorePosition0(pieceId) {
        return [
            roundNum(0 + idOffsets[pieceId][0]*2, 1) * responsiveScale,
            roundNum(0 + heightOffset + idOffsets[pieceId][1]*2, 1) * responsiveScale,
            roundNum(4.5 + idOffsets[pieceId][2]*2, 1) * responsiveScale,
        ]
    }
    function getScorePosition1(pieceId) {
        return [
            roundNum(0 + idOffsets[pieceId][0]*1, 1) * responsiveScale,
            roundNum(0 + heightOffset + idOffsets[pieceId][1]*1, 1) * responsiveScale,
            roundNum(5 + idOffsets[pieceId][2]*1, 1) * responsiveScale,
        ]
    }
    function getScaleByTile(tile) {
        if (tile === -1 || tile === 29) {
            return 0
        } else {
            return 1
        }
    }

    function calculateCatchDelay(catchPath) {
        if (catchPath[0] === 1 && catchPath[1] === 0) {
            return (catchPath.length-1) * 610
        } if (catchPath[0] === 0 && (catchPath[1] !== 19 && catchPath[1] !== 28)) {
            return (catchPath.length-1) * 610
        } else {
            return (catchPath.length-2) * 610
        }
    }

    const [springs0_0, api0_0] = useSpring(() => ({
        from: {
            position: getPositionByTile(pieceTeam0Id0.tile, 0), 
            scale: getScaleByTile(pieceTeam0Id0.tile),
        }
    }))
    const [springs0_1, api0_1] = useSpring(() => ({        
        from: {
            position: getPositionByTile(pieceTeam0Id1.tile, 1), 
            scale: getScaleByTile(pieceTeam0Id1.tile),
        }
    }))
    const [springs0_2, api0_2] = useSpring(() => ({        
        from: {
            position: getPositionByTile(pieceTeam0Id2.tile, 2), 
            scale: getScaleByTile(pieceTeam0Id2.tile),
        }
    }))
    const [springs0_3, api0_3] = useSpring(() => ({        
        from: {
            position: getPositionByTile(pieceTeam0Id3.tile, 3), 
            scale: getScaleByTile(pieceTeam0Id3.tile),
        }
    }))
    const [springs1_0, api1_0] = useSpring(() => ({        
        from: {
            position: getPositionByTile(pieceTeam1Id0.tile, 0), 
            scale: getScaleByTile(pieceTeam1Id0.tile),
        }
    }))
    const [springs1_1, api1_1] = useSpring(() => ({        
        from: {
            position: getPositionByTile(pieceTeam1Id1.tile, 1), 
            scale: getScaleByTile(pieceTeam1Id1.tile),
        }
    }))
    const [springs1_2, api1_2] = useSpring(() => ({        
        from: {
            position: getPositionByTile(pieceTeam1Id2.tile, 2), 
            scale: getScaleByTile(pieceTeam1Id2.tile),
        }
    }))
    const [springs1_3, api1_3] = useSpring(() => ({        
        from: {
            position: getPositionByTile(pieceTeam1Id3.tile, 3), 
            scale: getScaleByTile(pieceTeam1Id3.tile),
        }
    }))

    function startCheck(tile, lastPath) {
        const condition0 = (tile === 0 && lastPath[0] === 1)
        const condition1 = (tile <= 5 && lastPath[0] === 0)
        return (condition0 || condition1)
    }

    function caughtCheck(gamePhase, tile) {
        return gamePhase === 'game' && tile === -1
    }

    useEffect(() => {
        const path = pieceTeam0Id0.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) { // Score
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: getPositionByTile(value, 0),
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: getScorePosition0(0),
                        scale: 1.5,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    },
                    {
                        position: getScorePosition1(0),
                        scale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 500
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api0_0.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id0AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id0AnimationPlaying(false)
                    }
                })
            } else if (caughtCheck(gamePhase, pieceTeam0Id0.tile)) {
                api0_0.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {
                        setPieceTeam0Id0AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id0AnimationPlaying(false)
                    }
                })
            } else if (startCheck(pieceTeam0Id0.tile, pieceTeam0Id0.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 0),
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_0.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id0AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id0AnimationPlaying(false)
                    }
                })
            } else {
                // save last move's path in piece
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 0),
                        scale: responsiveScale, // fix bug where piece disappears on refresh
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_0.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id0AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id0AnimationPlaying(false)
                    }
                })
            }
        } else {
            api0_0.start({
                from: {
                    position: getPositionByTile(pieceTeam0Id0.tile, 0),
                    scale: getScaleByTile(pieceTeam0Id0.tile),
                },
                to: [],
                loop: false,
                onStart: () => {
                    setPieceTeam0Id0AnimationPlaying(true)
                },
                onRest: () => {
                    setPieceTeam0Id0AnimationPlaying(false)
                }
            })
        }
    }, [pieceTeam0Id0])

    useEffect(() => {
        const path = pieceTeam0Id1.lastPath
        if (path.length > 0) {    
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: getPositionByTile(value, 1),
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: getScorePosition0(1),
                        scale: 1.5,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    },
                    {
                        position: getScorePosition1(1),
                        scale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 500
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api0_1.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id1AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id1AnimationPlaying(false)
                    }
                })
            } else if (caughtCheck(gamePhase, pieceTeam0Id1.tile)) {
                api0_1.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {
                        setPieceTeam0Id1AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id1AnimationPlaying(false)
                    }
                })
            } else if (startCheck(pieceTeam0Id1.tile, pieceTeam0Id1.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 1),
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_1.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id1AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id1AnimationPlaying(false)
                    }
                })
            } else {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 1),
                        scale: responsiveScale, // fix bug where piece disappears on refresh
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_1.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale, // match scale in toAnimations
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id1AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id1AnimationPlaying(false)
                    }
                })
            }
        } else {
            api0_1.start({
                from: {
                    position: getPositionByTile(pieceTeam0Id1.tile, 1),
                    scale: getScaleByTile(pieceTeam0Id1.tile),
                },
                to: [],
                loop: false,
                onStart: () => {
                    setPieceTeam0Id1AnimationPlaying(true)
                },
                onRest: () => {
                    setPieceTeam0Id1AnimationPlaying(false)
                }
            })
        }
    }, [pieceTeam0Id1])

    useEffect(() => {
        const path = pieceTeam0Id2.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: getPositionByTile(value, 2),
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: getScorePosition0(2),
                        scale: 1.5,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    },
                    {
                        position: getScorePosition1(2),
                        scale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 500
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api0_2.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id2AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id2AnimationPlaying(false)
                    }
                })
            } else if (caughtCheck(gamePhase, pieceTeam0Id2.tile)) {
                api0_2.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {
                        setPieceTeam0Id2AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id2AnimationPlaying(false)
                    }
                })
            } else if (startCheck(pieceTeam0Id2.tile, pieceTeam0Id2.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 2),
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_2.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id2AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id2AnimationPlaying(false)
                    }
                })
            } else {
                const toAnimations = path.map((value) => (
                    // on score, move to Earth and add an additional animation
                    {
                        position: getPositionByTile(value, 2),
                        scale: responsiveScale, // fix bug where piece disappears on refresh
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                ))
                api0_2.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id2AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id2AnimationPlaying(false)
                    }
                })
            }
        } else {
            api0_2.start({
                from: {
                    position: getPositionByTile(pieceTeam0Id2.tile, 2),
                    scale: getScaleByTile(pieceTeam0Id2.tile),
                },
                to: [],
                loop: false,
                onStart: () => {
                    setPieceTeam0Id2AnimationPlaying(true)
                },
                onRest: () => {
                    setPieceTeam0Id2AnimationPlaying(false)
                }
            })
        }
    }, [pieceTeam0Id2])

    useEffect(() => {        
        const path = pieceTeam0Id3.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: getPositionByTile(value, 3),
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: getScorePosition0(3),
                        scale: 1.5,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    },
                    {
                        position: getScorePosition1(3),
                        scale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 500
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api0_3.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id3AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id3AnimationPlaying(false)
                    }
                })
            } else if (caughtCheck(gamePhase, pieceTeam0Id3.tile)) {
                api0_3.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {
                        setPieceTeam0Id3AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id3AnimationPlaying(false)
                    }
                })
            } else if (startCheck(pieceTeam0Id3.tile, pieceTeam0Id3.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 3),
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_3.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id3AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id3AnimationPlaying(false)
                    }
                })
            } else {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 3),
                        scale: responsiveScale, // fix bug where piece disappears on refresh
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api0_3.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam0Id3AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam0Id3AnimationPlaying(false)
                    }
                })
            }
        } else {
            api0_3.start({
                from: {
                    position: getPositionByTile(pieceTeam0Id3.tile, 3),
                    scale: getScaleByTile(pieceTeam0Id3.tile),
                },
                to: [],
                loop: false,
                onStart: () => {
                    setPieceTeam0Id3AnimationPlaying(true)
                },
                onRest: () => {
                    setPieceTeam0Id3AnimationPlaying(false)
                }
            })
        }
    }, [pieceTeam0Id3])

    useEffect(() => {        
        const path = pieceTeam1Id0.lastPath        
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: getPositionByTile(value, 0),
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: getScorePosition0(0),
                        scale: 1.5,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    },
                    {
                        position: getScorePosition1(0),
                        scale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 500
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api1_0.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id0AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id0AnimationPlaying(false)
                    }
                })
            } else if (caughtCheck(gamePhase, pieceTeam1Id0.tile)) {
                api1_0.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {
                        setPieceTeam1Id0AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id0AnimationPlaying(false)
                    }
                })
            } else if (startCheck(pieceTeam1Id0.tile, pieceTeam1Id0.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 0),
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_0.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id0AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id0AnimationPlaying(false)
                    }
                })
            } else {
                // save last move's path in piece
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 0),
                        scale: responsiveScale, // fix bug where piece disappears on refresh
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_0.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id0AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id0AnimationPlaying(false)
                    }
                })
            }
        } else {
            api1_0.start({
                from: {
                    position: getPositionByTile(pieceTeam1Id0.tile, 0),
                    scale: getScaleByTile(pieceTeam1Id0.tile),
                },
                to: [],
                loop: false,
                onStart: () => {
                    setPieceTeam1Id0AnimationPlaying(true)
                },
                onRest: () => {
                    setPieceTeam1Id0AnimationPlaying(false)
                }
            })
        }
    }, [pieceTeam1Id0])

    useEffect(() => {
        const path = pieceTeam1Id1.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: getPositionByTile(value, 1),
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: getScorePosition0(1),
                        scale: 1.5,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    },
                    {
                        position: getScorePosition1(1),
                        scale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 500
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api1_1.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id1AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id1AnimationPlaying(false)
                    }
                })
            } else if (caughtCheck(gamePhase, pieceTeam1Id1.tile)) {
                api1_1.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {
                        setPieceTeam1Id1AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id1AnimationPlaying(false)
                    }
                })
            } else if (startCheck(pieceTeam1Id1.tile, pieceTeam1Id1.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 1),
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_1.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id1AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id1AnimationPlaying(false)
                    }
                })
            } else {
                // save last move's path in piece
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 1),
                        scale: responsiveScale, // fix bug where piece disappears on refresh
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_1.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id1AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id1AnimationPlaying(false)
                    }
                })
            }
        } else {
            api1_1.start({
                from: {
                    position: getPositionByTile(pieceTeam1Id1.tile, 1),
                    scale: getScaleByTile(pieceTeam1Id1.tile),
                },
                to: [],
                loop: false,
                onStart: () => {
                    setPieceTeam1Id1AnimationPlaying(true)
                },
                onRest: () => {
                    setPieceTeam1Id1AnimationPlaying(false)
                }
            })
        }
    }, [pieceTeam1Id1])

    useEffect(() => {
        const path = pieceTeam1Id2.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: getPositionByTile(value, 2),
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: getScorePosition0(2),
                        scale: 1.5,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    },
                    {
                        position: getScorePosition1(2),
                        scale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 500
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api1_2.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id2AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id2AnimationPlaying(false)
                    }
                })
            } else if (caughtCheck(gamePhase, pieceTeam1Id2.tile)) {
                api1_2.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {
                        setPieceTeam1Id2AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id2AnimationPlaying(false)
                    }
                })
            } else if (startCheck(pieceTeam1Id2.tile, pieceTeam1Id2.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 2),
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_2.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id2AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id2AnimationPlaying(false)
                    }
                })
            } else {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 2),
                        scale: responsiveScale, // fix bug where piece disappears on refresh
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_2.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id2AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id2AnimationPlaying(false)
                    }
                })
            }
        } else {
            api1_2.start({
                from: {
                    position: getPositionByTile(pieceTeam1Id2.tile, 2),
                    scale: getScaleByTile(pieceTeam1Id2.tile),
                },
                to: [],
                loop: false,
                onStart: () => {
                    setPieceTeam1Id2AnimationPlaying(true)
                },
                onRest: () => {
                    setPieceTeam1Id2AnimationPlaying(false)
                }
            })
        }
    }, [pieceTeam1Id2])

    useEffect(() => {
        const path = pieceTeam1Id3.lastPath
        if (path.length > 0) {
            if (path[path.length-1] === 29) {
                const pathToEarth = path.slice(0, path.length-1)
                const toAnimations = pathToEarth.map((value) => {
                    return {
                        position: getPositionByTile(value, 3),
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                const scoreAnimation = [
                    {
                        position: getScorePosition0(3),
                        scale: 1.5,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    },
                    {
                        position: getScorePosition1(3),
                        scale: 0,
                        config: {
                            tension: 170,
                            friction: 26
                        },
                        delay: 500
                    },
                ]
                let animations = toAnimations.concat(scoreAnimation)
                api1_3.start({
                    from: {
                        position: animations[0].position,
                        scale: responsiveScale,
                    },
                    to: animations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id3AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id3AnimationPlaying(false)
                    }
                })
            } else if (caughtCheck(gamePhase, pieceTeam1Id3.tile)) {
                api1_3.start({
                    from: {
                        scale: responsiveScale,
                    },
                    to: [
                        {
                            scale: 0,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {
                        setPieceTeam1Id3AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id3AnimationPlaying(false)
                    }
                })
            } else if (startCheck(pieceTeam1Id3.tile, pieceTeam1Id3.lastPath)) {
                const toAnimations = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 3),
                        scale: responsiveScale,
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_3.start({
                    from: {
                        position: toAnimations[0].position,
                        scale: 0,
                    },
                    to: toAnimations,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id3AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id3AnimationPlaying(false)
                    }
                })
            } else {
                const toAnimations13 = path.map((value) => {
                    // on score, move to Earth and add an additional animation
                    return {
                        position: getPositionByTile(value, 3),
                        scale: responsiveScale, // fix bug where piece disappears on refresh
                        config: {
                            tension: 170,
                            friction: 26
                        }
                    }
                })
                api1_3.start({
                    from: {
                        position: toAnimations13[0].position,
                        scale: responsiveScale,
                    },
                    to: toAnimations13,
                    loop: false,
                    onStart: () => {
                        setPieceTeam1Id3AnimationPlaying(true)
                    },
                    onRest: () => {
                        setPieceTeam1Id3AnimationPlaying(false)
                    }
                })
            }
        } else {
            api1_3.start({
                from: {
                    position: getPositionByTile(pieceTeam1Id3.tile, 3),
                    scale: getScaleByTile(pieceTeam1Id3.tile),
                },
                to: [],
                loop: false,
                onStart: () => {
                    setPieceTeam1Id3AnimationPlaying(true)
                },
                onRest: () => {
                    setPieceTeam1Id3AnimationPlaying(false)
                }
            })
        }
    }, [pieceTeam1Id3])
    
    function hasValidMoveBoard(currentMoves) {
        for (const move in currentMoves) {
            if (parseInt(move) !== 0 && currentMoves[move] > 0) {
                return true;
            }
        }
        return false;
    }

    const selection = useAtomValue(selectionAtom)
    const hasTurn = useAtomValue(hasTurnAtom)

    return <group position={[0,0,boardOffset]}>
        <Piece 
            team={0} 
            id={0} 
            tile={pieceTeam0Id0.tile} 
            position={springs0_0.position} 
            scale={springs0_0.scale} 
            selectable={hasTurn && hasValidMoveBoard(currentMovesRockets)}
            selected={pieceSelected(selection, 0, 0)}
            onBoard={true}
            animation='onBoard'
        />
        <Piece 
            team={0} 
            id={1} 
            tile={pieceTeam0Id1.tile} 
            position={springs0_1.position} 
            scale={springs0_1.scale} 
            selectable={hasTurn && hasValidMoveBoard(currentMovesRockets)}
            selected={pieceSelected(selection, 1, 0)}
            onBoard={true}
            animation='onBoard'
        />
        <Piece 
            team={0} 
            id={2} 
            tile={pieceTeam0Id2.tile} 
            position={springs0_2.position} 
            scale={springs0_2.scale} 
            selectable={hasTurn && hasValidMoveBoard(currentMovesRockets)}
            selected={pieceSelected(selection, 2, 0)}
            onBoard={true}
            animation='onBoard'
        />
        <Piece 
            team={0} 
            id={3} 
            tile={pieceTeam0Id3.tile} 
            position={springs0_3.position} 
            scale={springs0_3.scale} 
            selectable={hasTurn && hasValidMoveBoard(currentMovesRockets)}
            selected={pieceSelected(selection, 3, 0)}
            onBoard={true}
            animation='onBoard'
        />
        <Piece 
            team={1} 
            id={0} 
            tile={pieceTeam1Id0.tile} 
            position={springs1_0.position}
            scale={springs1_0.scale} 
            selectable={hasTurn && hasValidMoveBoard(currentMovesUfos)}
            selected={pieceSelected(selection, 0, 1)}
            onBoard={true}
            animation='onBoard'
        />
        <Piece 
            team={1} 
            id={1} 
            tile={pieceTeam1Id1.tile} 
            position={springs1_1.position} 
            scale={springs1_1.scale} 
            selectable={hasTurn && hasValidMoveBoard(currentMovesUfos)}
            selected={pieceSelected(selection, 1, 1)}
            onBoard={true}
            animation='onBoard'
        />
        <Piece 
            team={1} 
            id={2} 
            tile={pieceTeam1Id2.tile} 
            position={springs1_2.position} 
            scale={springs1_2.scale} 
            selectable={hasTurn && hasValidMoveBoard(currentMovesUfos)}
            selected={pieceSelected(selection, 2, 1)}
            onBoard={true}
            animation='onBoard'
        />
        <Piece 
            team={1} 
            id={3} 
            tile={pieceTeam1Id3.tile} 
            position={springs1_3.position} 
            scale={springs1_3.scale} 
            selectable={hasTurn && hasValidMoveBoard(currentMovesUfos)}
            selected={pieceSelected(selection, 3, 1)}
            onBoard={true}
            animation='onBoard'
        />
    </group>
}
