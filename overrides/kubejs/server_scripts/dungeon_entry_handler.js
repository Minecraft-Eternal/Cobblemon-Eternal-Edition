
const $BlockPos = Java.loadClass("net.minecraft.core.BlockPos")
const $Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3")
const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey")
const $Registries = Java.loadClass("net.minecraft.core.registries.Registries")

const $DimensionTransition = Java.loadClass("net.minecraft.world.level.portal.DimensionTransition")

const instanceSpacing = 1024


const enterDungeon = (dungeonData, player) => {
    console.log(`player ${player.username} is entering dungeon ${dungeonData.dungeonName}`)
    let persistent = player.persistentData

    if(!persistent.dungeonInstId) {
        let serverData = player.getServer().persistentData
        persistent.dungeonInstId = serverData.openDungeonInstSlot
        serverData.openDungeonInstSlot = parseInt(serverData.openDungeonInstSlot) + 1
    }

    let instId = parseInt(persistent.dungeonInstId)

    let zPos = dungeonData.index * instanceSpacing
    let xPos = instId * instanceSpacing
    
    player.changeDimension(new $DimensionTransition(
        player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"]("cobblemoneternal:dungeons"),
        new $Vec3(xPos + dungeonData.spawnOffset.x + 0.5, 127 + dungeonData.spawnOffset.y, zPos + dungeonData.spawnOffset.z + 0.5),
        new $Vec3(0, 0, 0), player.getYaw(), player.getPitch(), $DimensionTransition.PLAY_PORTAL_SOUND))

    //TODO: generate Structure on first entry, and find a way to detect if it has already been generated.
}


const exitDungeon = (player) => {
    let server = player.server
    let persistent = player.persistentData
    let returnPosition;
    let returnDimensionKey;

    if(persistent.lastDungeonEntryX && persistent.lastDungeonEntryY && persistent.lastDungeonEntryZ && persistent.lastDungeonEntryDim) {
        returnPosition = new $Vec3(persistent.lastDungeonEntryX.getAsDouble(), persistent.lastDungeonEntryY.getAsDouble(), persistent.lastDungeonEntryZ.getAsDouble())
        returnDimensionKey = $ResourceKey.create($Registries.DIMENSION, persistent.lastDungeonEntryDim.getAsString())
    } else {
        let respawnPos = player.getRespawnPosition()
        if(!respawnPos)
            respawnPos = player.level.getSharedSpawnPos()
        returnPosition = new $Vec3(respawnPos.getX(), respawnPos.getY(), respawnPos.getZ())
        returnDimensionKey = player.getRespawnDimension()
    }

    player.changeDimension(new $DimensionTransition(server["getLevel(net.minecraft.resources.ResourceKey)"](returnDimensionKey), returnPosition,
        new $Vec3(0, 0, 0), player.getYaw(), player.getPitch(), $DimensionTransition.PLAY_PORTAL_SOUND))
}


const markEntryPoint = (player) => {
    let persistent = player.persistentData
    let entryPos = player.position()
    persistent.lastDungeonEntryX = entryPos.x()
    persistent.lastDungeonEntryY = entryPos.y()
    persistent.lastDungeonEntryZ = entryPos.z()
    persistent.lastDungeonEntryDim = player.level.dimension.toString()

    console.log(entryPos, persistent.lastDungeonEntryX, persistent.lastDungeonEntryY, persistent.lastDungeonEntryZ, persistent.lastDungeonEntryDim)
}


BlockEvents.rightClicked(event => {

    if(event.hand == "OFF_HAND"
        || !event.block.hasTag("cobblemoneternal:dungeon_entrance")
        || !event.item.id == "minecraft:air"
        || event.entity.crouching)
            return;
    
    console.log(event.block.id.split(":")[1], event.block.id)

    if(event.entity.level.dimension == "cobblemoneternal:dungeons") {
        exitDungeon(event.entity)
    } else {
        markEntryPoint(event.entity)
        enterDungeon(global.dungeonEntryBlocks[event.block.id.split(":")[1]], event.entity)
    }
})



ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments, builtinSuggestions: Suggestions} = event

    event.register(
        Commands.literal("exitdungeon")
            .then(Commands.argument("player", Arguments.PLAYER.create(event))
                .requires(source => source.hasPermission(2))
                .executes(ctx => {
                    let player = Arguments.PLAYER.getResult(ctx, "player")
                    if(player.level.dimension == "cobblemoneternal:dungeons") {
                        player.tell(Text.translate("message.cobblemoneternal.command.exitdungeon.forced"))
                        exitDungeon(player)
                    } else {
                        ctx.source.sendSystemMessage(Text.translate("message.cobblemoneternal.command.exitdungeon.forced_not_in_dungeon", player.username))
                    }
                    return 1
                }))
            .requires(source => source.isPlayer())
            .executes(ctx => {
                let player = ctx.source.player
                if(player.level.dimension == "cobblemoneternal:dungeons") {
                    let countdown = 10
                    let pos = player.position()
                    player.tell(Text.translate("message.cobblemoneternal.command.exitdungeon", countdown))
                    player.server.scheduleInTicks(20 * countdown, callback => {
                        countdown--
                        //console.log(`ticking countdown at ${countdown}`)
                        if(pos != player.position()) {
                            player.setStatusMessage(Text.translate("message.cobblemoneternal.command.exitdungeon.canceled_by_movement").color("red"))
                        } else if(countdown == 0) {
                            player.tell(Text.translate("message.cobblemoneternal.command.exitdungeon.complete"))
                            console.log("exiting dungeon")
                            exitDungeon(player)
                        } else {
                            player.tell(Text.translate("message.cobblemoneternal.command.exitdungeon", countdown))
                            console.log("rescheduling")
                            callback.reschedule()
                        }
                    })
                    return 1
                } else {
                    player.tell(Text.translate("message.cobblemoneternal.command.exitdungeon.not_in_dungeon").color("red"))
                    return 1
                }
            })
    )
})