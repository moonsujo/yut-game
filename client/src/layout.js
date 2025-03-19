let floorPosition = [0,1.5,0]
let outOfBoundsPosition = [
  floorPosition[0]-1,
  floorPosition[1],
  floorPosition[2]
]
let throwPosition = [
  floorPosition[0]-0.9,
  floorPosition[1],
  floorPosition[2]+1.5
]

export default {
  yoot: {
    floor: floorPosition, // change value on top
    outOfBounds: outOfBoundsPosition,
    throwPos: throwPosition
  },
  portrait: {
    center: [0,0,0],
    camera: {
      position: [0, 25, 10.3],
      zoomMin: 0,
      zoomMax: 55,
    },
    title: {
      camera: {
        position: [0,17,7],
        lookAt: [0, 0, 0]
      },
      text: {
        position: [-4.2,0,-10.4],
        rotation: [-Math.PI/2,0,0],
        scale: 3.5
      },
      yoots: {
        position: [2.4, 0, -8.4],
        rotation: [0,Math.PI/2,0],
        scale: 0.35
      },
      tiles: {
        position: [0, 0, -0.1],
        rotation: [0, -Math.PI/16, 0],
        scale: 0.4
      },
      about: {
        show: false,
        position: [0, 0, 7.4],
        rotation: [0,0,0],
        scale: 2
      },
      howToPlay: {
        position: [0, 0, 8],
        rotation: [0,0,0],
        scale: 1.8
      },
      joinGame: {
        position: [0, 0, 9.2],
        rotation: [0,0,0],
        scale: 1.8
      },
      rocketHome: {
        position: [-4.3,0,5.2],
        scale: [1.2, 0.01, 1.2]
      },
      ufoHome: {
        position: [4.5,0,5.2],
        scale: [1.2, 0.01, 1.2]
      },
      joinGameModal: {
        position: [-3.8, 0, -2.1],
        rotation: [-Math.PI/2, 0, 0],
        scale: [1.7, 1.7, 1.7]
      },
      letsPlay: {
        position: [0, 0, 10.4],
        rotation: [0,0,0],
        scale: 1.8
      },
      pieces: {
        position: [0,0,0],
        scale: 0.5,
        rocketHome0: {
          position: [-4.7,2,5.6],
          rotation: [-Math.PI/8, 0, 0],
          scale: 1
        },
        rocketHome1: {
          position: [-4.1,2,6.2],
          rotation: [-Math.PI/8, 0, 0],
          scale: 1
        },
        ufoHome: {
          position: [4.2, 0, 4.9],
          rotation: [-Math.PI/16,0,0],
          scale: 1
        }
      },
      board: {
        position: [0, 0, -0.2],
        scale: 1
      },
      milkyWay: {
        rotation: [-Math.PI/2, 0, -35.0],
        position: [0, -1, -0.7],
        scale: 5,
        brightness: 0.3,
        colorTint1: [
          0.0, 1.0, 1.0, 1.0
        ],
        colorTint2: [
          0.0, 1.0, 1.0, 1.0
        ],
        colorTint3: [
          0.0, 1.0, 1.0, 1.0
        ]
      },
      disconnectModal: {
        position: [0, 10, 3.7],
        rotation: [0,0,0],
      },
    },
    howToPlay: {
      position: [-2.5,0,-2.2],
      rotation: [0,0,0],
      scale: 0.9,
      pickingTheTeamsPage: {
        cursorPos: [
          [4,0,0],
          [-0.5, 0.5, -1.4],
          [-0.5, 0.5, 2.3],
        ],
        text: {
          position: [-5,0,-4],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01
        },
        rockets: {
          position: [-5, 0, -2.5],
          text: {
            position: [0,0,0],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.5,
            height: 0.01
          },
          piece0: {
            position: [0.4,0,0.6]
          },
          piece1: {
            position: [1.2,0,0.6]
          },
          piece2: {
            position: [2.0,0,0.6]
          },
          piece3: {
            position: [2.8,0,0.6]
          },
          joinButton: {
            position: [3, 0, 0.8],
            text: {
              position: [0.7,0,0],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            }
          },
          names: [
            {
              position: [0,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,3.4],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,4.1],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,4.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
          ]
        },
        ufos: {
          position: [0.6, 0, -2.5],
          text: {
            position: [0,0,0],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.5,
            height: 0.01
          },
          piece0: {
            position: [0.4,0,0.6]
          },
          piece1: {
            position: [1.4,0,0.6]
          },
          piece2: {
            position: [2.4,0,0.6]
          },
          piece3: {
            position: [3.4,0,0.6]
          },
          joinButton: {
            position: [3.7, 0, 0.8],
            text: {
              position: [0.7,0,0],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            }
          },
          names: [
            {
              position: [0,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,3.4],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,4.1],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,4.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,5.5],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,6.2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
          ]
        },
        inputModal: {
          position: [0, 0.1, 1]
        }
      },
      throwingTheDicePage: {
        text: {
          position: [-3, 0, 6.5],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.43,
          height: 0.01
        },
        moveText: {
          text: "JUMP\n3 STARS",
          position: [0.3, 0.7, -3.3],
          size: 0.5
        },
        gulToken: {
          position: [3.1, 0, 0.7],
          rotation: [0, Math.PI/2, 0],
          scale: 0.9
        },
        yut: {
          initialYutPosition: [-4.5,8,9],
          initialYutRotation: [Math.PI/16,Math.PI/2+Math.PI/32,-Math.PI/2],
          animationYutPosition: [-2,-1.5,-3],
          animationYutRotation: [0,0,0],
        },
        yootButtonModel: {
          position: [7, 0, 3.5],
          rotation: [0, Math.PI/2, 0, "ZXY"]
        },
        cursor: {
          position: [8, 0.3, 5.1],
          rotation: [0, 0, 0],
          scale: [3, 3, 0.1]
        },
      },
      readingTheDicePage: {
        text: {
          position: [-2.9, 0, 7],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.45,
          height: 0.01,
        },
        do: {
          position: [-2.4, 0, -2.4],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        ge: {
          position: [2, 0, -2.4],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        gul: {
          position: [6, 0, -2.4],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        yoot: {
          position: [-2.4, 0, 3.8],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
        mo: {
          position: [2, 0, 3.8],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
        backdo: {
          position: [6, 0, 3.8],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/4, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
      },
      scoringPage: {
        board: {
          position: [6, 0, -4.4],
          scale: 1.3,
        },
        rocketHome: {
          position: [-0.5, 0, 3],
          scale: 1.3
        },
        text: {
          position: [-3,0,6.5],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.45,
          lineHeight: 1,
          height: 0.01
        },
        fireworks: {
          size: 0.1
        },
        tilesPos0: [0,0,-1.5],
        tilesPos1: [-1, 0.5, -5],
        tilesScale0: 1,
        tilesScale1: 1.3,
        rocketHomeScale1: 1,
        rocket0Pos: [0.8, 0, 0],
        rocket1Pos: [1.6, 0, 0],
        rocket2Pos: [0.8, 0, 1],
        checkPos: [1.5, 0, 1],
        moveText: {
          rotation: [-Math.PI/2, 0, 0],
          position: [0.7,0,2],
          fontSize: 22
        },
        scoreText: {
          rotation: [-Math.PI/2, 0, 0],
          position: [0.7, 0, 2.8],
          size: 0.4
        },
        letsGoText: {
          position: [0.8,0,2.2],
          rotation: [-Math.PI/8, 0, 0],
          fontSize: 22
        },
        fireworks: {
          initialPosition: {
            x: -1,
            y: 2,
            z: -3,
          },
          positionRange: {
            x: 0.5,
            y: 0,
            z: 0.5
          }
        },
        welcomeBackText: {
          position: [2.5, 0, 2],
          rotation: [-Math.PI/2,0,0]
        }
      },
      catchingPiecesPage: {
        text: {
          position: [-3,0,7],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.45,
          height: 0.01,
          lineHeight: 0.9
        },
        firstCornerTiles: {
          position: [0,0,-6.5],
          scale: 1.3
        },
        rocketPos: [
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ]
        ],
        ufoPos: [
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
            1.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [-1.1, 0, 8.5]
        ],
        pointer: {
          position: [0.1,2.5,-1]
        },
        ufoHome: {
          position: [-0.7, 0, 3.5],
          scale: 1.4
        },
        yootButtonModel: {
          position: [2.9, 0, 3.5],
          scale: 1.2
        },
        bonusAlert: {
          position: [6.2, 0, 3.5],
        },
        moveText: {
          position: [-3,0,0.5]
        },
        gulToken: {
          position: [-0.5,0,0.25],
          rotation: [0, Math.PI/2, 0]
        }
      },
      combiningPiecesPage: {
        text: {
          position: [-2.9,0,5.5],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.43,
          height: 0.01,
          lineHeight: 0.9
        },
        rocket0Pos: [
          [
            -Math.cos(((-1+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((-1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5-0.4,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-0.4,
            1,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5-0.4,
            1.1,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5,
          ],
        ],
        rocket1Pos: [
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5+0.4,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5+0.5,
            1,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5+0.4,
            1.1,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5,
          ],
        ],
        firstCornerTiles: {
          position: [0.8, 0, -5.5]
        },
        moveText0: {
          position: [-2, 0, 3.5],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        moveText1: {
          position: [-3, 0, 0.5],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        gulToken: {
          position: [0.9, 0, 3.2],
          rotation: [0, Math.PI/2, 0],
        },
        geToken0: {
          position: [1.8, 0, 3.2],
          rotation: [0, Math.PI/2, 0]
        },
        geToken1: {
          position: [-0.2, 0, 0.25],
          rotation: [0, Math.PI/2, 0]
        }
      },
      shortcutsPage: {
        text: {
          position: [-2.1,0,6.5],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01,
          lineHeight: 0.9,
          scales: [1, 0] 
        },
        board: {
          position: [2.8, 0, -0.5],
          scale: 0.83
        },
        scoreText: {
          position: [0.7, 2, 3.5],
          rotation: [-Math.PI/2, 0, 0]
        },
        moveText: {
          position: [20,0,1],
          rotation: [-Math.PI/2, 0, 0],
          scale: [0, 1]
        },
        noteText: {
          position: [1,0,2.5],
          rotation: [-Math.PI/2, 0, 0]
        },
        rocket0Scale: [
          1.7,
          2.3,
          1.7,
          0,
          1.7,
          2.3,
          1.7,
          0,
          2,
          2.8,
          2,
        ],
        rocket0Pos: [
          [
            -Math.cos(((5+5) * (Math.PI * 2)) / 20) * 5,
            0 + 2,
            Math.sin(((5+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) * 3.5,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) * 3.5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) * 1.7,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) * 1.7,
          ],
          [
            0,
            2.5,
            0,
          ],
          [
            0,
            3,
            0,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((13 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((13 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((14 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((14 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5,
            2.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            0,
            2,
            0
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((8 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((8 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((9 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((9 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((11 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((11 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
        ],
        cursor: {
          position: [
            [1, 0.3, 2],
            [0, 0, 4],
            [0, 0, 2.2]
          ],
          scale: [
            [0,0,0],
            [2, 2, 2]
          ],
          effectOpacity: [
            0,
            1,
            0
          ]
        },
        yootToken: {
          position: [2.5, 0.2, 0],
          rotation: [Math.PI/2, Math.PI/2, 0]
        },
        tileHelper: {
          position: [1.7, 0, -2.7],
          rotation: [0, Math.PI/2, 0]
        }
      },
      pagination: {
        pageRadius: 0.5,
        arrowRadius: 0.8,
        arrowHeight: 1,
        elementSpace: 1.5,
        startX: -6,
        position: [2.8, 0, 4.7],
        scale: 0.8
      },
      tileRadius: {
        ring: 5,
        shortcut1: 3.5,
        shortcut2: 1.7
      },
      star: {
        scale: 0.5,
        rocketScale: 0.6,
        ufoScale: 0.3,
      }
    },
    about: {
      position: [-4.9, 0, -4.2],
      rotation: [-Math.PI/2,0,0],
      scale: 0.6,
      mainDescription: {
        size: 0.6,
        line0Position: [0,0.5,0],
      },
      board: {
        position: [6.5, -7.5, 0],
        rotation: [Math.PI/2, 0, 0],
        scale: 0.7,
        text: {
          position: [0,-5.5,0],
          size: 0.6
        }
      },
      pieces: {
        position: [-1,-13,0],
        size: 0.6,
        rockets: {
          position: [4, -14, 0]
        },
        ufos: {
          position: [7.5, -14, 0]
        }
      },
      yoot: {
        position: [14.5, -8.5, 0],
        text: {
          position: [11.5,-5.5,0],
          size: 0.6
        }
      },
      playersText: {
        position: [11.5,-13,0],
        size: 0.6
      },
      ageText: {
        position: [10,-1.5,0],
        size: 0.6
      }
    },
    lobby: {
      disconnectModal: {
        position: [0, 10, 3.7],
        rotation: [0,0,0],
      },
      joinTeamModal: {
        position: [-4.5, 0, -3],
        rotation: [-Math.PI/2, 0, 0],
        scale: 2
      },
      readyTextRocket: {
        position: [1.7, 0, 0],
        scale: 2,
        background: {
          opacity: 0.2
        }
      },
      readyTextUfo: {
        position: [1.5, 0, 0],
        scale: 2,
        background: {
          opacity: 0.1
        }
      },
      joinTeamButtonRocket: {
        position: [1.7, 0, 0],
        scale: 1.8
      },
      joinTeamButtonUfo: {
        position: [1.5,0,0],
        scale: 1.8
      },
      teamSwitchButtonRocket: {
        position: [1.7,0,0],
        scale: 2
      },
      teamSwitchButtonUfo: {
        position: [1.5,0,0],
        scale: 2
      }
    },
    game: {
      letsPlayButton: {
        position: [3.9,0,7.2],
        rotation: [-Math.PI / 2, 0, 0],
        disabledButton: {
          position: [-0.1,0,1.2],
          scale: 1,
          text: {
            position: [-1.3,0.1,-0.6],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.45,
            height: 0.01,
            lineHeight: 0.9
          },
          border: {
            position: [0,0,0],
            scaleInner: [1.6, 0.02, 1.6],
            scaleOuter: [1.7, 0.01, 1.7],
            rotation: [-Math.PI, 0, -Math.PI],
          }
        },
        waitingForHostButton: {
          position: [-0.2,0,1.2],
          scale: 1,
          text: {
            position: [-1.3,0.1,-0.6],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.45,
            height: 0.01,
            lineHeight: 0.9
          },
          border: {
            position: [0,0,0],
            scaleInner: [1.6, 0.02, 1.6],
            scaleOuter: [1.7, 0.01, 1.7],
            rotation: [-Math.PI, 0, -Math.PI],
          }
        },
        activeButton: {
          backdropWidth: 1.4,
          backdropHeight: 1.3,
          scale: 1.25,
          position: [-0.1, 0, 0.8],
          text: {
            position: [-0.9,0,-0.15],
            rotation: [-Math.PI/2,0,0],
            size: 0.5,
            height: 0.01,
            lineHeight: 0.7
          }
        }
      },
      spectating: {
        position: [-5.7, 0, -6.4],
        rotation: [-Math.PI/2, 0, 0],
        size: 0.37,
        height: 0.01
      },
      spectatingAndHosting: {
        line0Pos: [-5.7, 0, -6.4],
        line1Pos: [-5.7, 0, -4.7],
        rotation: [-Math.PI/2, 0, 0],
        size: 0.37,
        height: 0.01
      },
      hosting: {
        position: [-5.7, 0, -6.4],
        rotation: [-Math.PI/2, 0, 0],
        size: 0.37,
        height: 0.01
      },
      team0: {
        position: [-5.7,0,-10.7],
        scale: 1.3,
        title: {
          position: [0,0,0],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        pieces: {
          position: [0.23, 0, 0],
          positionStartX: 0,
          positionStartY: 0,
          positionStartZ: 0.8,
          rotation: [0, 0, 0],
          scale: 1.4,
          space: 1.1,
          sectionScale: 0.5
        },
        names: {
          position: [0, 0, 1.3],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01,
          maxLength: 8
        },
        join: {
          position: [3.2, 0, -0.1],
          rotation: [-Math.PI / 2, 0, 0],
          scale: 1.2,
          size: 0.3,
          height: 0.01
        },
        pregameRoll: {
          position: [3.4, 0, 0.5],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      team1: {
        position: [0.2,0,-10.7],
        scale: 1.3,
        title: {
          position: [0,0,0],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        pieces: {
          position: [0.23, 0, 0.1],
          positionStartX: 0,
          positionStartY: 0,
          positionStartZ: 0.8,
          rotation: [0, 0, 0],
          scale: 1.2,
          space: 1.2,
          sectionScale: 0.5
        },
        names: {
          position: [0, 0, 1.3],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01,
          maxLength: 8
        },
        join: {
          position: [3.2, 0, -0.1],
          rotation: [-Math.PI / 2, 0, 0],
          scale: 1.2,
          size: 0.3,
          height: 0.01
        },
        pregameRoll: {
          position: [3.5, 0, 0.6],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      joinTeamModal: {
        position: [-2.9, 0, -1.7],
        rotation: [-Math.PI/2, 0, 0],
        scale: [1.3, 1.3, 1.3]
      },
      chat: {
        position: [-5.4,0,6.7],
        rotation: [-Math.PI/2, 0, 0],
        scale: [0.5, 0.5, 0.5],
        box: {
          borderRadius: '5px',
          height: '330px',
          width: '270px',
          padding: '10px',
          fontSize: '30px',
        },
        input: {
          height: '15px',
          fontSize: '20px',
          borderRadius: '5px',
          padding: '10px',
          border: 0,
        }
      },
      invite: {
        position: [-5.5, 0, 7.2],
        button: {
          position: [1.68, -0.5, 0.7]
        },
        scale: 0.9,
        text: {
          content: `Tap here to\ncopy the link.\nShare to\ninvite`,
          position: [-1.58,0.5,-0.7],
          size: 0.35
        },
        border: {
          position: [0,0,0],
          rotation: [-Math.PI, 0, -Math.PI],
          scaleOuter: [2, 0.01, 1.75],
          scaleInner: [1.9, 0.02, 1.65]
        },
        copiedText: {
          size: 0.4,
          height: 0.01,
          position: [0,0,-1.3]
        },
      },
      discord: {
        position: [-3.75, 0, 5.8],
        scale: 0.9,
        size: 0.3,
        height: 0.01
      },
      disconnectModal: {
        position: [0, 10, 3.7],
        rotation: [0,0,0],
      },
      board: {
        lobby: {
          scale: 1,
          position: [0, 0, 0]
        },
        pregame: {
          scale: 0.7,
          position: [0, -13, -4]
        },
        game: {
          scale: 1,
          position: [0, 0, -1]
        },
        finished: {
          scale: 0.2,
          position: [5, 0, 1]
        },
      },
      yutBonus: {
        position: [1.3, 0, 1.4],
        scale: 1
      },
      whoGoesFirst: {
        title: {
          position: [-5.7, 0, -4.6],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01
        },
        description: {
          position: [-5.7, 0, -4],
          rotation: [-Math.PI/2,0,0],
          size: 0.3,
          height: 0.01,
          lineHeight: 0.7
        }
      },
      settings: {
        mainButton: {
          position: [4.6, 0, -6.5],
          scale: 1.1,
          text: {
            position: [-0.9, 0.025, 0.15],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.3,
            height: 0.01,
          }
        },
        mainMenu: {
          position: [0.5, 0, 1.7],
        },
        editGuests: {
          position: [0.5, 0, 0],
          rotation: [-Math.PI/2, 0, 0],
          containerWidth: '350px'
        },
        editOneGuest: {
          position: [0.5, 0, 0.3],
          rotation: [-Math.PI/2, 0, 0]
        },
        resetGame: {
          position: [0.5, 0, -0.5],
          rotation: [-Math.PI/2, 0, 0]
        },
        setGameRules: {
          position: [0.5, 0, 2.5],
          rotation: [-Math.PI/2, 0, 0]
        },
        audio: {
          position: [0.5, 0, -1],
          rotation: [-Math.PI/2, 0, 0]
        },
        language: {
          position: [0.5, 0, 0.5],
          rotation: [-Math.PI/2, 0, 0]
        },
        inviteFriends: {
          position: [-6, 0, -1],
          rotation: [-Math.PI/2, 0, 0]
        }
      },
      rulebookButton: {
        position: [4.95, 0, -5.7],
        scale: 1.1,
      },
      rulebook: {
        position: [-2, 3, -0.5],
        scale: 0.75,
        content: {
          position: [0, 0, 0.2]
        },
        blocker: {
          innerScale: [13.5, 0.02, 18],
          outerScale: [13.6, 0.01, 18.1],
          position: [2.8, -1.5, 1.2]
        },
        closeButton: {
          position: [9,0,-6.8],
          scale: 1
        },
        title: {
          position: [-3.6, 9.1, -2.6],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.5,
          height: 0.01
        }
      },
      piecesSection: {
        position: [-0.7, 0, 8],
        emptyPieces: {
          positions: [
            [0, 0, -1],
            [1.5, 0, -1],
            [0, 0, 0.6],
            [1.5, 0, 0.6]
          ]
        },
        pieces: {
          rotation: [0, 0, 0],
          positions: [
            [0, 0, -1],
            [1.5, 0, -1],
            [0, 0, 0.4],
            [1.5, 0, 0.4]
          ],
          scale: 1.6
        }
      },
      moveList: {
        position: [-1.3, 0, 10.1],
        rotation: [-Math.PI/2, 0, 0],
        tokenScale: 1,
        tokenPosition: [0.6, 0, 0.7],
        size: 0.43,
        piecePosition: [2.5, 0, -0.3],
        pieceScale: 0.8
      },
      currentPlayer: {
        position: [3.2, 0, 5],
        rotation: [0,0,0],
        text: {
          position: [0.7, 0.025, 0.15],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      practiceYootButton: {
        position: [3.3, 0, 8.5],
        scale: 1.2
      },
      yootButton: {
        position: [3.9, 0, 9.1],
        rotation: [0, Math.PI/2, 0],
        scale: 1.4
      },
      timer: {
        position: [5.6,0,10],
        scaleX: 1,
        heightMultiplier: 0.6,
        boxArgs: [0.25, 0.03, 4],
      },
      throwCount: {
        position: [-1.2, 0, 1.25],
        // position: [1.7, 0, -0.8],
        orientation: 'downUp'
        // orientation: 'leftRight'
      },
      scoreButtons: {
        single: {
          text: 'touch\ndown',
          position: [0, 0, 8.1],
          size: 0.5,
        },
        multiple: {
          text: 'touch\ndown\nwith',
          position: [-1.1, 0, 7.5],
          size: 0.6,
          buttons: {
            position: [0, -1.7, 0],
            scale: 1
          }
        },
        rotation: [-Math.PI/2, 0, 0],
        lineHeight: 0.7,
        height: 0.01,
      },
      mainAlert: {
        position: [0, 0.3, 7],
        rotation: [0, Math.PI/2, 0]
      },
      pregameAlert: {
        position: [-2, 0, -3.5],
        initialScale: 1.7,
        rocketsGoFirst: {
          position: [0.5, 2, 1],
          rotation: [0, Math.PI/2, 0],
        },
        ufosGoFirst: {
          position: [0.5, 2, 1],
          rotation: [0, Math.PI/2, 0],
        },
        tie: {
          position: [0.5, 3, 1],
          rotation: [0, Math.PI/2, 0],
        }
      },
      throwAlert: {
        position: [0,0,5.5],
        rotation: [0, Math.PI/2, 0],
        initialScale: 1
      },
      ufo: {
        selectedAdditionalScale: 0.3,
        selectedAnimatedScaleRange: 0.15
      },
      welcomeBackText: {
        position: [0, 1, 0],
        rotation: [-Math.PI/2,0,0]
      }
    },
    board: {
      startEarth: {
        position: [2.5, 0, 5.5],
        text: {
          position: [-0.9,0,0.2],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 15,
        },
        helperArrow: {
          position: [0.3, 0, -0.4],
          rotation: [Math.PI, -Math.PI/2 - Math.PI/8 - Math.PI/32, 0],
          color: 'limegreen',
          scale: [0.2, 0.1, 0.5]
        },
      },
      finish: {
        position: [2.5, 0, 5.5],
        text: {
          position: [-1.6,0,4.1],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 15,
        },
        helperArrow: {
          position: [0.3, 0, -0.4],
          rotation: [Math.PI, -Math.PI/2 - Math.PI/8 - Math.PI/32, 0],
          color: 'limegreen',
          scale: [0.2, 0.1, 0.5]
        },
      },
    },
    meteors: {
      initialPosition: {
        x: 0,
        y: 3,
        z: 0,
      }
    },
    winScreen: {
      fireworks: {
        emitters: [
          { // left
            initialPosition: {
              x: -8,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // left
            initialPosition: {
              x: -11,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // right
            initialPosition: {
              x: 8,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // right
            initialPosition: {
              x: 11,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          }
        ],
        timePanA: 1,
      },
      dust: {          
        initialPosition: {
          x: 0,
          y: -4,
          z: 0
        },
        positionRange: {
          x: 3,
          y: 1,
          z: 3
        }
      }
    }
  },
  landscapeDesktop: {
    center: [0,0,0],
    camera: {
      position: [0,17,7],
      zoomMin: 30,
      zoomMax: 150,
      lookAtOffset: [0, 0, 0]
    },
    title: {
      camera: {
        position: [-4,17,7],
        lookAt: [-4, 0, 0]
      },
      text: {
        position: [-14, 0, -5.5],
        rotation: [-Math.PI/2,0,0],
        scale: 4,
      },
      about: {
        show: true,
        position: [-12.3, 0, 0.8],
        rotation: [0,0,0],
        scale: 2.2
      },
      howToPlay: {
        position: [-10.87, 0, 0.8],
        rotation: [0, 0, 0],
        scale: 2.2
      },      
      joinGame: {
        position: [-11.24, 0, 2.3],
        rotation: [0,0,0],
        scale: 2
      },
      rocketHome: {
        position: [-4.3,0,5.2],
        scale: [1.2, 0.01, 1.2]
      },
      ufoHome: {
        position: [4.5,0,5.2],
        scale: [1.2, 0.01, 1.2]
      },
      joinGameModal: {
        position: [-6, 0, -0.8],
        rotation: [-Math.PI/2, 0, 0],
        scale: [1.7, 1.7, 1.7]
      },
      letsPlay: {
        position: [-10.8, 0, 3.79],
        rotation: [0, 0, 0],
        scale: 2.2
      },
      pieces: {
        position: [0,0,0],
        scale: 1,
        rocketHome0: {
          position: [-4.7,2,5.6],
          rotation: [-Math.PI/8, 0, 0],
          scale: 1
        },
        rocketHome1: {
          position: [-4.1,2,6.2],
          rotation: [-Math.PI/8, 0, 0],
          scale: 1
        },
        ufoHome: {
          position: [4.2, 0, 4.9],
          rotation: [-Math.PI/16,0,0],
          scale: 1
        }
      },
      yoots: {
        position: [-7.2,0,-3.3],
        rotation: [Math.PI/2,Math.PI/2,-Math.PI/2],
        scale: 0.37
      },
      board: {
        position: [0, 0, -0.6],
        scale: 1
      },
      milkyWay: {
        rotation: [-Math.PI/2, 0, -35.0],
        position: [3.7, -1, -0.5],
        scale: 4,
        brightness: 0.5,
        colorTint1: [
          0.0, 1.0, 1.0, 1.0
        ],
        colorTint2: [
          0.0, 1.0, 1.0, 1.0
        ],
        colorTint3: [
          0.0, 1.0, 1.0, 1.0
        ]
      },
      disconnectModal: {
        position: [-4, 10, 3.7],
        rotation: [0,0,0],
      },
    },
    about: {
      position: [-3, 0, -4],
      rotation: [-Math.PI/2,0,0],
      scale: 0.6,
      mainDescription: {
        size: 0.6,
        line0Position: [-1,0.5,0],
      },
      board: {
        position: [5.5, -7, 0],
        rotation: [Math.PI/2, 0, 0],
        scale: 0.6,
        text: {
          position: [-1,-5,0],
          size: 0.6
        }
      },
      pieces: {
        position: [-1,-13,0],
        size: 0.6,
        rockets: {
          position: [4, -13, 0]
        },
        ufos: {
          position: [7.5, -13, 0]
        }
      },
      yoot: {
        position: [14.2, -8, 0],
        text: {
          position: [11.1,-5,0],
          size: 0.6
        },
      },
      playersText: {
        position: [11.5,-12.5,0],
        size: 0.6
      },
      ageText: {
        position: [10.5,-12.5,-1],
        size: 0.6
      }
    },
    howToPlay: {
      position: [-1.9,0,-1],
      rotation: [0,Math.PI/32,Math.PI/64],
      scale: 0.8,
      pickingTheTeamsPage: {
        cursorPos: [
          [4,0,0],
          [1.5, 0.5, -1.4],
          [-0.5, 0.5, 1.3],
        ],
        text: {
          position: [-3,0,-4],
          rotation: [-Math.PI/2,0,0],
          size: 0.4,
          height: 0.01
        },
        rockets: {
          position: [-3, 0, -2.5],
          text: {
            position: [0,0,0],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.4,
            height: 0.01
          },
          piece0: {
            position: [0.4,0,0.6]
          },
          piece1: {
            position: [1.2,0,0.6]
          },
          piece2: {
            position: [2.0,0,0.6]
          },
          piece3: {
            position: [2.8,0,0.6]
          },
          joinButton: {
            position: [3, 0, 0.8],
            text: {
              position: [0.7,0,0],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            }
          },
          names: [
            {
              position: [0,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [2,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [3.8,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [5.8,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
          ]
        },
        ufos: {
          position: [-3, 0, 1.5],
          text: {
            position: [0,0,0],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.4,
            height: 0.01
          },
          piece0: {
            position: [0.4,0,0.6]
          },
          piece1: {
            position: [1.4,0,0.6]
          },
          piece2: {
            position: [2.4,0,0.6]
          },
          piece3: {
            position: [3.4,0,0.6]
          },
          joinButton: {
            position: [3.5, 0, 0.8],
            text: {
              position: [0.7,0,0],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            }
          },
          names: [
            {
              position: [0,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [2.5,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [4.5,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [6,0,2],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [0,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [3.5,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
            {
              position: [5.5,0,2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.4,
              height: 0.01
            },
          ]
        },
        inputModal: {
          position: [0, 0.1, 0]
        }
      },
      throwingTheDicePage: {
        text: {
          position: [-2.5, 0, 5.5],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        moveText: {
          text: "JUMP\n3-STARS",
          position: [0, 0.7, -3.5],
          size: 0.5
        },
        gulToken: {
          position: [3.1, 0, 0.7],
          rotation: [0, Math.PI/2, 0],
          scale: 1
        },
        yut: {
          initialYutPosition: [-5.5,8,9],
          initialYutRotation: [Math.PI/16,Math.PI/2+Math.PI/32,-Math.PI/2],
          animationYutPosition: [-2,0,-3],
          animationYutRotation: [0,0,0],
        },
        yootButtonModel: {
          position: [6.5, 0, 2],
          rotation: [0,Math.PI/2,0]
        },
        cursor: {
          position: [7.3, 0.3, 3.5],
          rotation: [0, 0, 0],
          scale: [3, 3, 0.1]
        },
      },
      movingPiecesPage: {
        text: {
          position: [-3,0,-4],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4
        },
        firstCornerTiles: {
          position: [-2, 0, -1]
        },
        homePieces: {
          position: [-2, 0.7, -1.5]
        },
        moveDisplay: {
          position: [-3.3, 0, 1.7]
        },
        cursorPos0: [1, 0.3, 1.7],
        cursorPos1: [-0.6, 0.3, 0],
        cursorPos2: [2.4, 1.3, 2.8],
        rocket3Pos0: [0.8,-0.5,0.7],
        rocket3Pos1: [
          -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
          1.5,
          Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
        ],
        rocket3Pos2: [
          -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
          1,
          Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
        ],
        rocket3Pos3: [
          -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
          1,
          Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
        ],
        rocket3Pos4: [
          -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
          1,
          Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
        ],
      },
      scoringPage: {
        board: {
          position: [6, 0, -4],
          scale: 1.2,
        },
        rocketHome: {
          position: [-0.5, 0, 2.5],
          scale: 1.2
        },
        text: {
          position: [-2.2,0,6],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          lineHeight: 1,
          height: 0.01
        },
        fireworks: {
          size: 0.25
        },
        tilesPos0: [0,0,0],
        tilesPos1: [-0.5, 0.5, -3],
        tilesScale0: 0.8,
        tilesScale1: 1,
        rocketHomeScale1: 1.1,
        rocket0Pos: [0.8,0.5,-0.1],
        rocket1Pos: [1.8,0.5,-0.1],
        rocket2Pos: [0.8,0.5,0.8],
        checkPos: [1.6, 0.5,0.8],
        cursorPos: [
          [1, 0, 4],
          [0, 1.5, 5.8],
          [1.8, 0.2, 3.5],
          [1, 0.2, 4.2]
        ],
        moveText: {
          position: [1,0,2],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 26
        },
        scoreText: {
          position: [1, 0, 3.1],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.5
        },
        letsGoText: {
          position: [0,0,2.2],
          rotation: [-Math.PI/8, -Math.PI/16, 0],
          fontSize: 26
        },
        fireworks: {
          initialPosition: {
            x: -1,
            y: 2,
            z: -1,
          },
          positionRange: {
            x: 1,
            y: 0,
            z: 1
          }
        },
        welcomeBackText: {
          position: [2.5, 0, 2],
          scale: 1.2
        }
      },
      catchingPiecesPage: {
        text: {
          position: [-2.5,0,6.3],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01,
          lineHeight: 0.9
        },
        firstCornerTiles: {
          position: [-0.2,0,-6.5],
          scale: 1.3
        },
        ufoHome: {
          position: [-0.5, 0, 3],
          scale: 1.2
        },
        cursorPos: [
          [0, 0.3, 1],
          [-1,2,5],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5-1.2,
            2,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5 + 0.5,
          ],
          [5,2,3.5],
        ],
        rocketPos: [
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
            2,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ]
        ],
        ufoPos: [
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5,
            1.5,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [0.7, 1.5, 8]
        ],
        pointer: {
          position: [-0.5,2.5,0]
        },
        yootButtonModel: {
          position: [2.8, 0, 3],
          scale: 1.2
        },
        bonusAlert: {
          position: [6.1, 0, 3],
        },
        moveText: {
          position: [-3, 0, 0]
        },
        gulToken: {
          position: [-0.5,0,-0.25],
          rotation: [0, Math.PI/2, 0]
        }
      },
      combiningPiecesPage: {
        text: {
          position: [-2.5,0,6],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01,
          lineHeight: 0.9
        },
        rocket0Pos: [
          [
            -Math.cos(((-1+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((-1+5) * (Math.PI * 2)) / 20) * 5 ,
          ],
          [
            -Math.cos(((0+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((0+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((1+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((1+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5 - 0.45,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5 - 0.45,
            1,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5 - 0.45,
            1,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5,
          ],
        ],
        rocket1Pos: [
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((2+5) * (Math.PI * 2)) / 20) * 5 + 0.45,
            1,
            Math.sin(((2+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((3+5) * (Math.PI * 2)) / 20) * 5 + 0.45,
            1,
            Math.sin(((3+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            -Math.cos(((4+5) * (Math.PI * 2)) / 20) * 5 + 0.45,
            1,
            Math.sin(((4+5) * (Math.PI * 2)) / 20) * 5,
          ],
        ],
        firstCornerTiles: {
          position: [1, 0, -5]
        },
        moveText0: {
          position: [-2.5, 0, 4],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        moveText1: {
          position: [0, 0, 3],
          rotation: [-Math.PI/2,0,0],
          size: 0.5,
          height: 0.01,
          lineHeight: 0.9
        },
        gulToken: {
          position: [1.3, 0, 3.7],
          rotation: [0, Math.PI/2, 0],
        },
        geToken0: {
          position: [0.4, 0, 3.7],
          rotation: [0, Math.PI/2, 0]
        },
        geToken1: {
          position: [3, 0, 3.7],
          rotation: [0, Math.PI/2, 0]
        }
      },
      shortcutsPage: {
        text: {
          position: [-2.2,0,7],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01,
          lineHeight: 0.9,
          scales: [1, 0] 
        },
        board: {
          position: [2.8, 0, -0.5],
          scale: 0.9
        },
        tilesPos: [
          [0,0,1.7],
          [-3, 0, -1.5]
        ],
        tilesScale: [
          0.6,
          1
        ],
        scoreText: {
          position: [0.5, 0, 3.5],
          rotation: [-Math.PI/2, 0, 0]
        },
        moveText: {
          position: [0, 0, 4],
          rotation: [-Math.PI/2, 0, 0],
          scale: [0, 0.8]
        },
        noteText: {
          position: [3,0,2],
          rotation: [-Math.PI/2, 0, 0]
        },
        rocket0Scale: [
          1.2,
          1.8,
          1.2,
          0,
          1.2,
          1.6,
          1.2,
          0,
          1.4,
          1.9,
          1.4,
        ],
        rocket0Pos: [
          [
            -Math.cos(((5+5) * (Math.PI * 2)) / 20) * 5,
            1.5,
            Math.sin(((5+5) * (Math.PI * 2)) / 20) * 5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) * 3.5,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) * 3.5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) * 1.7,
            1.5,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) * 1.7,
          ],
          [
            0,
            2.5,
            0,
          ],
          [
            0,
            3,
            0,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((13 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((13 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((14 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((14 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              5,
            2.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((15 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((15 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            0,
            2,
            0
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              1.7,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
            1.5,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              3.5,
          ],
          [
            Math.sin(((5 -5) * (Math.PI * 2)) / 20) *
              5,
            2,
            Math.cos(((5 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((8 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((8 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((9 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((9 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((10 -5) * (Math.PI * 2)) / 20) *
              5,
            2.6,
            Math.cos(((10 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((11 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((11 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
          [
            Math.sin(((12 -5) * (Math.PI * 2)) / 20) *
              5,
            1.5,
            Math.cos(((12 -5) * (Math.PI * 2)) / 20) *
              5,
          ],
        ],
        cursor: {
          position: [
            [1, 0.3, 3],
            [3, 0, 5],
            [0.7, 0.5, 2.6]
          ],
          scale: [
            [0,0,0],
            [2, 2, 2]
          ],
          effectOpacity: [
            0,
            1,
            0
          ]
        },
        yootToken: {
          position: [2.5,0.2,0],
          rotation: [Math.PI/2, Math.PI/2, 0]
        },
        tileHelper: {
          position: [2.7, 0, -2.7],
          rotation: [0, Math.PI/2, 0]
        }
      },
      readingTheDicePage: {
        text: {
          position: [-2.4,0,7.7],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.4,
          height: 0.01,
        },
        do: {
          position: [-2.4, 0, -2.7],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.7,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        ge: {
          position: [1.7, 0, -2.7],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.7,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        gul: {
          position: [5.8, 0,  -2.7],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-2.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.7,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-1.8],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.55
          }
        },
        yoot: {
          position: [-2.4, 0, 4],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.7,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
        mo: {
          position: [1.7, 0, 4],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.7,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
        backdo: {
          position: [5.7, 0, 4],
          scale: 0.8,
          text: {
            line0: {
              position: [-0.2,0,-3.5],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.7,
              height: 0.01,
            },
            line1: {
              position: [-0.2,0,-2.6],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            },
            line2: {
              position: [-0.2,0,-1.7],
              rotation: [-Math.PI/2, 0, 0],
              size: 0.5,
              height: 0.01,
            }
          },
          yootSet: {
            position: [0, 0, 0.5],
            scale: 0.5
          }
        },
      },
      pagination: {
        pageRadius: 0.2,
        arrowRadius: 0.4
      },
      tileRadius: {
        ring: 5,
        shortcut1: 3.5,
        shortcut2: 1.7
      },
      star: {
        scale: 0.4,
        rocketScale: 0.6,
        ufoScale: 0.3,
      },
    },
    lobby: {
      disconnectModal: {
        position: [0, 10, 3.7],
        rotation: [0,0,0],
      },
      joinTeamModal: {
        position: [-4, 0, -2.5],
        rotation: [-Math.PI/2, 0, 0],
        scale: [1.8, 1.8, 1.8]
      },
      readyTextRocket: {
        position: [1.7, 0, 0],
        scale: 2,
        background: {
          opacity: 0.1
        }
      },
      readyTextUfo: {
        position: [1.7, 0, 0],
        scale: 2,
        background: {
          opacity: 0.1
        }
      },
      joinTeamButtonRocket: {
        position: [1.7, 0, 0],
        scale: 1.8
      },
      joinTeamButtonUfo: {
        position: [1.7,0,0],
        scale: 1.8
      },
      teamSwitchButtonRocket: {
        position: [1.7,0,0],
        scale: 2
      },
      teamSwitchButtonUfo: {
        position: [1.7,0,0],
        scale: 2
      }
    },
    game: {
      letsPlayButton: {
        position: [-7.8,0,5.3],
        rotation: [-Math.PI / 2, 0, 0],
        disabledButton: {
          position: [0.3,0,0.2],
          scale: 1,
          text: {
            position: [-1.3,0.1,-0.6],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.45,
            height: 0.01,
            lineHeight: 0.9
          },
          border: {
            position: [0,0,0],
            scaleInner: [1.6, 0.02, 1.6],
            scaleOuter: [1.7, 0.01, 1.7],
            rotation: [-Math.PI, 0, -Math.PI],
          }
        },
        waitingForHostButton: {
          position: [0.3,0,0.2],
          scale: 1,
          text: {
            position: [-1.3,0.1,-0.6],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.45,
            height: 0.01,
            lineHeight: 0.9
          },
          border: {
            position: [0,0,0],
            scaleInner: [1.6, 0.02, 1.6],
            scaleOuter: [1.7, 0.01, 1.7],
            rotation: [-Math.PI, 0, -Math.PI],
          }
        },
        activeButton: {
          backdropWidth: 1.4,
          backdropHeight: 1.1,
          scale: 1.2,
          position: [0.1, 0, 0],
          text: {
            position: [-0.8,0,-0.1],
            rotation: [-Math.PI/2,0,0],
            size: 0.45,
            height: 0.01,
            lineHeight: 0.7
          }
        }
      },
      spectating: {
        position: [7.8, 0, -4.0],
        rotation: [-Math.PI/2, 0, 0],
        size: 0.3,
        height: 0.01
      },
      spectatingAndHosting: {
        line0Pos: [7.8, 0, -4.0],
        line1Pos: [9.1, 0, -3.5],
        rotation: [-Math.PI/2, 0, 0],
        size: 0.3,
        height: 0.01
      },
      hosting: {
        position: [9.1, 0, -4.0],
        rotation: [-Math.PI/2, 0, 0],
        size: 0.3,
        height: 0.01
      },
      team0: {
        position: [-11,0,-5.1],
        scale: 1,
        title: {
          position: [0,0,0],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        pieces: {
          position: [0.23, 0, 0],
          positionStartX: 0,
          positionStartY: 0,
          positionStartZ: 0.8,
          rotation: [0, 0, 0],
          scale: 1.4,
          space: 1.1,
          sectionScale: 0.5
        },
        names: {
          position: [0, 0, 1.3],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01,
          maxLength: 8
        },
        join: {
          position: [3.3, 0, 0.45],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.3,
          height: 0.01,
          scale: 1.2,
        },
        pregameRoll: {
          position: [3.4, 0, 0.5],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      team1: {
        scale: 1,
        position: [-11,0,-1],
        title: {
          position: [0,0,0],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.4,
          height: 0.01
        },
        pieces: {
          position: [0.23, 0, 0.1],
          positionStartX: 0,
          positionStartY: 0,
          positionStartZ: 0.8,
          rotation: [0, 0, 0],
          scale: 1.2,
          space: 1.2,
          sectionScale: 0.45
        },
        names: {
          position: [0, 0, 1.3],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01,
          maxLength: 8
        },
        join: {
          position: [3.45, 0, 0.5],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.3,
          height: 0.01,
          scale: 1.2,
        },
        pregameRoll: {
          position: [3.5, 0, 0.6],
          rotation: [-Math.PI / 2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      joinTeamModal: {
        position: [-3.4, 0, -2.5],
        rotation: [-Math.PI/2, 0, 0],
        scale: [1.5, 1.5, 1.5]
      },
      chat: {
        position: [-11.05,0,3.3],
        rotation: [-Math.PI/2, 0, 0],
        scale: [0.5, 0.5, 0.5],
        box: {
          borderRadius: '5px',
          height: '230px',
          width: '420px',
          padding: '10px',
          fontSize: '24px',
        },
        input: {
          height: '15px',
          fontSize: '20px',
          borderRadius: '5px',
          padding: '10px',
          border: 0,
        }
      },
      invite: {
        position: [-10.7, 0, 3.8],
        button: {
          position: [1.68, -0.5, 0.7]
        },
        scale: 0.9,
        text: {
          content: `Click here to\ncopy the link.\nShare to\ninvite`,
          position: [-1.58,0.5,-0.7],
          size: 0.35
        },
        border: {
          position: [0,0,0],
          rotation: [-Math.PI, 0, -Math.PI],
          scaleOuter: [2, 0.01, 1.75],
          scaleInner: [1.9, 0.02, 1.65]
        },
        copiedText: {
          size: 0.4,
          height: 0.01,
          position: [0,0,-1.3]
        },
      },
      discord: {
        position: [-8.5, 0, 2.7],
        size: 0.3,
        height: 0.01
      },
      disconnectModal: {
        position: [0, 10, 3.7],
        rotation: [0,0,0],
      },
      board: {
        lobby: {
          scale: 1,
          position: [0, 0, 0]
        },
        pregame: {
          scale: 0.7,
          position: [0, -13, -3.5]
        },
        game: {
          scale: 0.9,
          position: [0, 0, -0.5]
        },
        finished: {
          scale: 0.2,
          position: [5, 0, 1]
        }
      },
      yutBonus: {
        position: [1.1, 0, 1.7],
        scale: 0.9
      },
      whoGoesFirst: {
        title: {
          position: [-4.5, 0, -5],
          rotation: [-Math.PI/2,0,0],
          size: 0.7,
          height: 0.01
        },
        description: {
          position: [-4.5, 0, -4.3],
          rotation: [-Math.PI/2,0,0],
          size: 0.35,
          height: 0.01,
          lineHeight: 0.8
        }
      },
      settings: {
        mainButton: {
          position: [9, 0, -5.5],
          scale: 1,
          text: {
            position: [-0.9, 0.025, 0.15],
            rotation: [-Math.PI/2, 0, 0],
            size: 0.3,
            height: 0.01,
          }
        },
        mainMenu: {
          position: [-0.5, 0, -0.075],
        },
        editGuests: {
          position: [-2.5, 0, -1.6],
          rotation: [-Math.PI/2, 0, 0],
          containerWidth: '350px'
        },
        editOneGuest: {
          position: [-2, 0, -1.4],
          rotation: [-Math.PI/2, 0, 0]
        },
        resetGame: {
          position: [-2, 0, -2.3],
          rotation: [-Math.PI/2, 0, 0]
        },
        setGameRules: {
          position: [-1.25, 0, 0.8],
          rotation: [-Math.PI/2, 0, 0]
        },
        audio: {
          position: [-0.5, 0, -2.75],
          rotation: [-Math.PI/2, 0, 0]
        },
        language: {
          position: [-1.5, 0, -1.4],
          rotation: [-Math.PI/2, 0, 0]
        },
        inviteFriends: {
          position: [-11, 0, -2.5],
          rotation: [-Math.PI/2, 0, 0]
        }
      },
      rulebookButton: {
        position: [9.3, 0, -4.8],
        scale: 1,
      },
      rulebook: {
        position: [6.9, 3, -0.5],
        scale: 0.6,
        content: {
          position: [0, 0, 0.2]
        },
        blocker: {
          innerScale: [13.5, 0.02, 20],
          outerScale: [13.6, 0.01, 20.1],
          position: [2.8, -1.5, 2.2]
        },
        closeButton: {
          position: [9,0,-6.8],
          scale: 1
        },
        title: {
          position: [-3.6, 9.1, -2.6],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.5,
          height: 0.01
        }
      },
      piecesSection: {
        position: [7.8, 0, 0.7],
        emptyPieces: {
          positions: [
            [0.5, 0, -0.5],
            [1.8, 0, -0.5],
            [0.5, 0, 0.7],
            [1.8, 0, 0.7]
          ],
        },
        pieces: {
          rotation: [0, 0, 0],
          positions: [
            [0.5, 0, -0.5],
            [1.8, 0, -0.5],
            [0.5, 0, 0.7],
            [1.8, 0, 0.7]
          ],
          scale: 1.4
        }
      },
      moveList: {
        position: [7.8, 0, -1.6],
        rotation: [-Math.PI/2, 0, 0],
        tokenScale: 0.9,
        tokenPosition: [0.6, 0, 0.6],
        size: 0.35,
        piecePosition: [2.05, 0, -0.3],
        pieceScale: 0.8
      },
      currentPlayer: {
        position: [8.4, 0, -3],
        rotation: [0,0,0],
        text: {
          position: [0.7, 0.025, 0.15],
          rotation: [-Math.PI/2, 0, 0],
          size: 0.35,
          height: 0.01
        }
      },
      practiceYootButton: {
        position: [9, 0, 3],
      },
      yootButton: {
        position: [9, 0, 4.8],
        rotation: [0, Math.PI/2, 0],
        scale: 1.2
      },
      timer: {
        position: [10.5,0,5.1],
        scaleX: 1,
        heightMultiplier: 0.7,
        boxArgs: [0.3, 0.03, 4],
      },
      throwCount: {
        position: [-1.2, 0, -1.3],
        orientation: 'downUp'
      },
      scoreButtons: {
        single: {
          text: 'touch\ndown',
          position: [5.9, 0, 4.5],
          size: 0.5,
        },
        multiple: {
          text: 'touch\ndown\nwith',
          position: [4.9, 0, 3],
          size: 0.45,
          buttons: {
            position: [0, -1.2, 0],
            scale: 0.9
          }
        },
        rotation: [-Math.PI/2, 0, 0],
        lineHeight: 0.7,
        height: 0.01,
      },
      mainAlert: {
        position: [0, 0.3, 6],
        rotation: [0, Math.PI/2, 0]
      },
      pregameAlert: {
        position: [-2, 0, -4.5],
        initialScale: 1.7,
        rocketsGoFirst: {
          position: [0.5, 2, 1],
          rotation: [0, Math.PI/2, 0],
        },
        ufosGoFirst: {
          position: [0.5, 2, 1],
          rotation: [0, Math.PI/2, 0],
        },
        tie: {
          position: [0.5, 3, 1],
          rotation: [0, Math.PI/2, 0],
        }
      },
      throwAlert: {
        position: [0,0,4.5],
        rotation: [0, Math.PI/2, 0],
        initialScale: 1
      },
      ufo: {
        selectedAdditionalScale: 0.5,
        selectedAnimatedScaleRange: 0.15
      },
      welcomeBackText: {
        position: [0, 1, 0],
        rotation: [-Math.PI/2,0,0]
      }
    },
    board: {
      startEarth: {
        position: [2.5, 0, 5.5],
        text: {
          position: [-0.9,0,0.2],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 15,
        },
        helperArrow: {
          position: [0.5, 0, -0.6],
          rotation: [Math.PI, -Math.PI/2 - Math.PI/8 - Math.PI/32, 0],
          color: 'limegreen',
          scale: [0.2, 0.1, 0.5]
        },
      },
      finish: {
        position: [2.5, 0, 5.5],
        text: {
          position: [-1.6,0,4.1],
          rotation: [-Math.PI/2, 0, 0],
          fontSize: 15,
        },
        helperArrow: {
          position: [0.3, 0, -0.4],
          rotation: [Math.PI, -Math.PI/2 - Math.PI/8 - Math.PI/32, 0],
          color: 'limegreen',
          scale: [0.2, 0.1, 0.5]
        },
      },
    },
    meteors: {
      initialPosition: {
        x: 0,
        y: 3,
        z: 0,
      }
    },
    winScreen: {
      fireworks: {
        emitters: [
          { // left
            initialPosition: {
              x: -8,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // left
            initialPosition: {
              x: -11,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // right
            initialPosition: {
              x: 8,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          },
          { // right
            initialPosition: {
              x: 11,
              y: 0,
              z: 0
            },
            positionRange: {
              x: 2,
              y: 2,
              z: 2
            }
          }
        ],
        timePanA: 1,
      },
      dust: {          
        initialPosition: {
          x: 0,
          y: -4,
          z: 0
        },
        positionRange: {
          x: 3,
          y: 1,
          z: 3
        }
      }
    }
  },
};