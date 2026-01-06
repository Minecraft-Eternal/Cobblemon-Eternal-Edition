//priority: 4

//(re)Load encounter data on script (re)load
global.reloadEncounterData()

ServerEvents.loaded(event => {
    let server = event.getServer()
    let seed = server.worldData.worldGenOptions().seed()
    if(seed < 0)
        seed *= -1.0
    //console.log(seed)
    global.findRegiPuzzles(seed)
    //Object.keys(global.regiPuzzleIndex).forEach(regi => console.log(`${regi} = ${global.regiPuzzleIndex[regi]}`))

    if(!server.persistentData.openDungeonInstSlot) {
        server.persistentData.openDungeonInstSlot = 0
    }
})


PlayerEvents.loggedIn(event => {
    if(global.playerRoamerOffsets[event.player.uuid]) return;

    let player = event.player
    let offset = Math.abs(mangleUUID(player.uuid))
    //console.log(player.uuid, offset, Math.abs(offset))
    global.addPlayerRoamerOffset(player.uuid, offset)
    //console.log(global.playerRoamerOffsets[player.uuid])
})

const mangleUUID = (uuid) => {
    return uuid.hashCode() % roamerOffsetMaximum
}


//Debug event handler for mangleUUID
// how else do you want me to test it in singleplayer?
/*
ItemEvents.entityInteracted(event => {
    console.log(Math.abs(mangleUUID(event.target.uuid)))
})
*/