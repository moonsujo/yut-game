export default {
  initialYootPositions: {
    pregame: [
      { x: -0.8, y: 5, z: 2, },
      { x: -0.4, y: 5, z: 2, },
      { x: 0.4, y: 5, z: 2, },
      { x: 0.8, y: 5, z: 2, },
    ],
    game: [
      { x: -0.8, y: 5, z: 1.5, },
      { x: -0.4, y: 5, z: 1.5, },
      { x: 0.4, y: 5, z: 1.5, },
      { x: 0.8, y: 5, z: 1.5, },
    ]
  },
  initialYootRotations: [
    // must be set to non-0 value to reset the rotation
    { x: 0, y: 1, z: 0, w: 1 },
    { x: 0, y: 1, z: 0, w: 1 },
    { x: 0, y: 1, z: 0, w: 1 },
    { x: 0, y: 1, z: 0, w: 1 },
  ],
  resetYootPositions: [
    { x: -1, y: 0.5, z: 0, },
    { x: -0.4, y: 0.5, z: 0, },
    { x: 0.2, y: 0.5, z: 0, },
    { x: 0.8, y: 0.5, z: 0, },
  ]
};
