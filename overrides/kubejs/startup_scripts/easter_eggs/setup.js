//priority: 8

//const $CobblemonAPI = Java.loadClass('com.cobblemon.mod.common.Cobblemon').INSTANCE

const $CobblemonEvents = Java.loadClass('com.cobblemon.mod.common.api.events.CobblemonEvents')
const $Priority = Java.loadClass('com.cobblemon.mod.common.api.Priority')

const $PokemonProperties = Java.loadClass('com.cobblemon.mod.common.api.pokemon.PokemonProperties')
const $BenchedMove = Java.loadClass('com.cobblemon.mod.common.api.moves.BenchedMove')
const $Moves = Java.loadClass('com.cobblemon.mod.common.api.moves.Moves').INSTANCE

StartupEvents.postInit(event => {
    $CobblemonEvents.POKEMON_NICKNAMED["subscribe(com.cobblemon.mod.common.api.Priority,java.util.function.Consumer)"]($Priority.NORMAL, event => {
        global.handleNicknameEasterEggs(event)
    })
})


global.handleNicknameEasterEggs = (event) => {
    //console.log(`nickname event fired!!! name: ${event.nickname}`, event.nicknameString)
    if(event.nicknameString) {
    let {nicknameString: nicknameString, player: player, pokemon: pokemon} = event
    //let nicknameString = event.nicknameString
    /*
    console.log(
        nicknameString,
        global.nicknameEasterEggs[nicknameString.toLowerCase()],
        nicknameString.toLowerCase() == 'garstomp'
    )
    */

    if(global.nicknameEasterEggs[nicknameString.toLowerCase()])
        global.nicknameEasterEggs[nicknameString.toLowerCase()](pokemon, player, nicknameString)
    }
}


global.nicknameEasterEggs = {
    'emperdog': (pokemon, player, nickname) => {
        //console.log(`evaluating nickname 'emperdog' for ${pokemon.species.resourceIdentifier}`)
        if(pokemon.level >= 80
            && pokemon.species.resourceIdentifier == 'cobblemon:snom')
            global.eternalForm(pokemon, player, nickname)
    },
    'garstomp': (pokemon, player, nickname) => {
        //console.log(`evaluating nickname 'garstomp' for ${pokemon.species.resourceIdentifier}`)
        if(pokemon.species.resourceIdentifier == 'cobblemon:garchomp')
            global.addMove(pokemon, 'eternabeam', player, nickname)
    },
    'thesmartnoob': (pokemon, player, nickname) => {
        if(pokemon.level >= 65
            && pokemon.species.resourceIdentifier == 'cobblemon:rotom')
            global.eternalForm(pokemon, player, nickname)
    }
}
