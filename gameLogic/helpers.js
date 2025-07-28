// Edit: look through populated players objects intead of document ids
async function roomHasAI(room) {
  for (let i = 0; i < room.teams.length; i++) {
    for (const player of room.teams[i].players) {
      let newPlayerDocument = await User.findOne({ _id: player })
      if (newPlayerDocument.type === 'ai') {
        return true
      }
    }
  }
  return false
}