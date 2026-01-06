//priority: 10

const $CobblemonAPI = Java.loadClass('com.cobblemon.mod.common.Cobblemon').INSTANCE


//get the player's Party
/**
* @param {PlayerJS} player 
* @returns {Pokemon[]}
*/
global.partyOf = (player) => {
    return $CobblemonAPI.getStorage().getParty(player)
}


//returns the highest Level among the player's Party.
/**
 * @param {Player}
 */
global.partyLevel = (player) => {
    let highestLevel = 1
    $CobblemonAPI.getStorage().getParty(player).forEach(pokemon => {
        if(pokemon.level > highestLevel)
            highestLevel = pokemon.level
    })
    return highestLevel
}


//check if the player is a Biome which has the given Tag
/**
* @param {PlayerJS} player player to evaluate
* @param {ResourceLocation} biomeTag biome tag ID. no '#' prefix.s
* @returns {boolean}
*/
global.playerIsInBiome = (player, biomeTag) => {
    let biomeHasTag = player.level.getBiome(player.blockPosition())
        .tags()
        .anyMatch((tag) => tag.location().toString() == biomeTag)
    return biomeHasTag
}


global.playSoundNear = (player, sourceEntity, sound, sourceType, volume, pitch) => {
    player.level['playSound(net.minecraft.world.entity.player.Player,double,double,double,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)']
            (sourceEntity, player.x, player.y, player.z, sound, sourceType, volume, pitch)
}


//Changes a pokemon into its Eternal form, and sends a message to the provided player that it has.
/**
 * @param {Pokemon} pokemon the pokemon to change into Eternal form
 * @param {Player} player the player to notify of the form change
 * @param {String} nickname the pokemon's Nickname
 */
global.eternalForm = (pokemon, player, nickname) => {
    console.log(`Setting ${pokemon.species.resourceIdentifier} to Eternal form`)
    if(!pokemon.form.aspects.contains("eternal")) {
        $PokemonProperties.Companion.parse("eternal=true").apply(pokemon)
        player.tell(Text.translate('cobblemoneternal.pokemon.form_change_eternal', nickname).color('light_purple'))
        global.playSoundNear(player, null, 'minecraft:entity.ender_dragon.ambient', 'neutral', 0.5, 1.0)
    }
}


//Changes a pokemon into the form with the specified properties.
/**
 * @param {String} properties Pokemon Properties that parse to the target form
 * @param {Pokemon} pokemon the Pokemon that will be changing form
 * @param {Player} player the player to notify of the form change
 */
global.changeForme = (featureName, properties, pokemon, player) => {
    console.log(`Setting ${pokemon.species.resourceIdentifier} to form with feature: ${featureName}, properties: ${properties}`)
    let feature = pokemon.getFeature(featureName)
    let currentFeature = feature.value
    let newFeature = properties.toLowerCase()
    if(newFeature != null && currentFeature != newFeature) {
        feature.value = newFeature
        pokemon.updateAspects()
        pokemon.markFeatureDirty(feature)
    }
    //$PokemonProperties.Companion.parse(properties).apply(pokemon)
    player.tell(Text.translate('cobblemoneternal.pokemon.form_change', pokemon.getDisplayName(true)))
}


//adds the specified move to the Pokemon, and sends a message to the provided player that it has.
// can and will add moves illegally
/**
 * @param {Pokemon} pokemon the pokemon to teach the move to
 * @param {String} move the move to teach
 * @param {Player} player the player to notify of the move addition
 * @param {String} nickname the pokemon's Nickname
 */
global.addMove = (pokemon, move, player, nickname) => {
    console.log(`Adding special move '${move}' to ${pokemon.species.resourceIdentifier}`)
    let knows = false
    //.stream().anyMatch(move => move.moveTemplate.name == 'eternabeam')
    pokemon.benchedMoves.forEach(benchedMove => {
        if(benchedMove.moveTemplate.name == move)
            knows = true
    })
    if(!knows) {
        pokemon.benchedMoves.add(new $BenchedMove($Moves.getByName(move).create().template, 0))
        player.tell(Text.translate("cobblemon.experience.learned_move", nickname, Text.translate(`cobblemon.move.${move}`)))
    }
}

//instructs the Client to play a message in its preferred location.
/**
 * 
 */
global.playLegendaryMessage = (player, message, species, color) => {
    player.sendData('chatMessage', {
        player: player,
        message: message,
        species: species,
        color: color
    })
}