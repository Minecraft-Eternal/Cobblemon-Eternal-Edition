
const formeChanges = {
    'cobblemoneternal:forme_change/rotom-fan': (pokemon, player) => setApplianceForm('Fan', pokemon, player),
    'cobblemoneternal:forme_change/rotom-frost': (pokemon, player) => setApplianceForm('Frost', pokemon, player),
    'cobblemoneternal:forme_change/rotom-heat': (pokemon, player) => setApplianceForm('Heat', pokemon, player),
    'cobblemoneternal:forme_change/rotom-mow': (pokemon, player) => setApplianceForm('Mow', pokemon, player),
    'cobblemoneternal:forme_change/rotom-wash': (pokemon, player) => setApplianceForm('Wash', pokemon, player)
}

ItemEvents.entityInteracted(event => {
    if(!(event.target instanceof $PokemonEntity)
        || event.hand == $InteractionHand.OFF_HAND
        || event.entity.isCrouching())
            return;

    let formeChangeTag = event.item.tags.stream().filter(tag => formeChanges[tag] != undefined).findFirst().get() // java streams are cool as hell
    let pokemon = event.target.pokemon
    let player = event.entity

    console.log(`Passed form change preeval for ${pokemon.getDisplayName(true)}`)

    if(formeChangeTag == undefined) return;

    formeChanges[formeChangeTag](pokemon, player)
})



/**
 * shorthand for changing between Rotom forms
 * @param {String} formName name of the target form
 * @param {Pokemon} pokemon pokemon to change form
 * @param {Player} player player to notify of form change
 */
const setApplianceForm = (formName, pokemon, player) => {
    if(pokemon.species.resourceIdentifier == 'cobblemon:rotom'
        && pokemon.form.name != formName) {
        global.changeForme('appliance', formName.toLowerCase(), pokemon, player)
        global.playSoundNear(player, null, 'minecraft:block.piston.extend', 'neutral', 1.0, 1.0)
    }
}