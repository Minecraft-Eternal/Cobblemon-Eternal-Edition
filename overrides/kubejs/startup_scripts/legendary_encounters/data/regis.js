

const weightModifier = (pokemon) => {
    let modifier = 1.0;
    switch(pokemon.ability.name) {
        case 'heavymetal': 
            modifier = 2.0
            break;
        case 'lightmetal':
            modifier = 0.5
            break;
    }
    return modifier
}

const regiIndexError = (regi, index) => {
    return Error(`No Regi puzzle exists for '${regi}' at case ${global.regiPuzzleIndex[regi]}`)
}



//Determines how many more Regi Puzzles exist for each Regi
// tampering is unadvised and will lead to errors with improper use.
global.totalRegiPuzzles = 4

const regularRegis = ["rock", "ice", "steel", "eleki", "drago"]

global.findRegiPuzzles = (worldSeed) => {

    global.regiPuzzleIndex = {}
    
    regularRegis.forEach(regi => {
        //console.log(`${regi} ${worldSeed % global.totalRegiPuzzles}`)
        global.regiPuzzleIndex[regi] = worldSeed % global.totalRegiPuzzles
        worldSeed >>>= 2
    })
}

global.setRegiPuzzles = (puzzleIndex) => {
    global.regiPuzzleIndex = {}

    regularRegis.forEach(regi => {
        global.regiPuzzleIndex[regi] = puzzleIndex
        //console.log(`${regi} = ${puzzleIndex}`)
    })
}


global.loadRegis = () => {

    //Regirock
    global.staticConditionalEncounters.regirock = {
        species: 'cobblemon:regirock',
        properties: {
            level: 40,
            moveSet: [
                'rockslide',
                'bodypress',
                'zapcannon',
                'irondefense'
            ],
            maxedIVs: 3
        },
        interactWith: 'cobblemoneternal:stone_shrine_core',
        spawnSound: 'minecraft:block.note_block.bell',
        spawnOffset: {
            x: 0,
            y: 1,
            z: 0
        },
        multiblockName: 'stone_shrine',
        condition: (player, block, rotation) => {
            if(global.validateMultiblock('stone_shrine', block, rotation)) {
                if(global.partyLevel(player) < 40) {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_level', '40'))
                    return 'fail_party_level';
                }
                let passes = false

                console.log(`Puzzle for rock: ${global.regiPuzzleIndex['rock']}`)
                switch (global.regiPuzzleIndex["rock"]) {
                    case 0: // 150+ DEF mon with Sandstorm
                        global.partyOf(player).forEach(pokemon => {
                            console.log(`DEF stat of ${pokemon.getDisplayName(true)}: ${pokemon.getDefence()}`)
                            if(pokemon.getDefence() >= 150
                                && pokemon.moveSet.getMoves().stream().anyMatch(move => move.name == 'sandstorm'))
                                passes = true
                        })
                        break;
                    case 1:
                        // TODO
                        break;
                    case 2:
                        // TODO
                        break;
                    case 3:
                        // TODO
                        break;
                    case 4:
                        // TODO
                        break;
                    default: 
                        throw regiIndexError('rock');
                }

                if(passes)
                    return 'pass';
                else {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_condition'))
                    return 'fail_party_condition';
                }
            } else {
                player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock')
                    .color('red')) 
                return 'fail_multiblock'
            }
        }
    }


    //Regice
    global.staticConditionalEncounters.regice = {
        species: 'cobblemon:regice',
        properties: {
            level: 40,
            moveSet: [
                'icebeam',
                'zapcannon',
                'irondefense',
                'recover'
            ],
            maxedIVs: 3
        },
        interactWith: 'cobblemoneternal:ice_shrine_core',
        spawnSound: 'minecraft:block.note_block.bell',
        spawnOffset: {
            x: 0,
            y: 1,
            z: 0
        },
        multiblockName: 'ice_shrine',
        condition: (player, block, rotation) => {
            if(global.validateMultiblock('ice_shrine', block, rotation)) {
                if(global.partyLevel(player) < 40) {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_level', '40'))
                    return 'fail_party_level';
                }
                let passes = false

                console.log(global.regiPuzzleIndex['ice'])
                switch (global.regiPuzzleIndex['ice']) {
                    case 0:
                        global.partyOf(player).forEach(pokemon => {
                            console.log(`Ice Shrine result ${pokemon.getDisplayName(true)}: ${pokemon.species.nationalPokedexNumber}, ${pokemon.ability.name}`)
                            if(pokemon.species.nationalPokedexNumber == 584
                                && pokemon.ability.name == 'snowwarning')
                                passes = true
                        })
                        break;
                    case 1:

                        break;
                    case 2:

                        break;
                    case 3:

                        break;
                    case 4:

                        break;
                    default: 
                        throw regiIndexError('ice');
                }

                if(passes)
                    return 'pass';
                else {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_condition'))
                    return 'fail_party_condition';
                }
            } else {
                player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock')
                    .color('red')) 
                return 'fail_multiblock'
            }
        }
    }


    //Registeel
    global.staticConditionalEncounters.registeel = {
        species: 'cobblemon:registeel',
        properties: {
            level: 40,
            moveSet: [
                'ironhead',
                'hammerarm',
                'curse',
                'amnesia'
            ],
            maxedIVs: 3
        },
        interactWith: 'cobblemoneternal:steel_shrine_core',
        spawnSound: 'minecraft:block.note_block.bell',
        spawnOffset: {
            x: 0,
            y: 1,
            z: 0
        },
        multiblockName: 'steel_shrine',
        condition: (player, block, rotation) => {
            if(global.validateMultiblock('steel_shrine', block, rotation)) {
                if(global.partyLevel(player) < 40) {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_level', '40'))
                    return 'fail_party_level';
                }
                let passes = false

                console.log(global.regiPuzzleIndex['steel'])
                switch (global.regiPuzzleIndex['steel']) {
                    case 0:
                        global.partyOf(player).forEach(pokemon => {
                            console.log(`Weight of ${pokemon.getDisplayName(true)}: ${pokemon.form.weight}`)
                            if((pokemon.form.weight * weightModifier(pokemon)) >= 2500) //250.0kg
                                passes = true
                        })
                        break;
                    case 1:
                        global.partyOf(player).forEach(pokemon => {
                            if(pokemon.shiny)
                                passes = true
                        })
                        break;
                    case 2:
                        // TODO
                        break;
                    case 3:
                        // TODO
                        break;
                    case 4:
                        // TODO
                        break;
                    default: 
                        throw regiIndexError('steel');
                }

                if(passes)
                    return 'pass';
                else {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_condition'))
                    return 'fail_party_condition';
                }
            } else {
                player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock')
                    .color('red')) 
                return 'fail_multiblock'
            }
        }
    }
    

    //Regigigas
    global.staticConditionalEncounters.regigigas = {
        species: 'cobblemon:regigigas',
        properties: {
            level: 70,
            moveSet: [
                'crushgrip',
                'knockoff',
                'earthquake',
                'protect'
            ],
            maxedIVs: 3,
            heldItem: Item.of('cobblemon:leftovers')
        },
        interactWith: 'cobblemoneternal:regigigas_core',
        spawnSound: 'minecraft:block.note_block.bell',
        spawnOffset: {
            x: 0,
            y: 3,
            z: 0
        },
        multiblockName: 'sleeping_giant',
        condition: (player, block, rotation) => {
            if(global.validateMultiblock('sleeping_giant', block, rotation)){
                if(global.partyLevel(player) < 70) {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_level', '70'))
                    return 'fail_party_level';
                }
                let hasRegis = [false, false, false, false, false]

                global.partyOf(player).forEach(pokemon => {
                    console.log(pokemon.species.resourceIdentifier)
                    switch (pokemon.species.resourceIdentifier) {
                        case 'cobblemon:regirock':
                            hasRegis[0] = true
                            break;
                        case 'cobblemon:regice':
                            hasRegis[1] = true
                            break;
                        case 'cobblemon:registeel':
                            hasRegis[2] = true
                            break;
                        case 'cobblemon:regieleki':
                            hasRegis[3] = true
                            break;
                        case 'cobblemon:regidrago':
                            hasRegis[4] = true
                            break;
                        default:
                            break;
                    }
                })
                
                console.log(hasRegis, !hasRegis.includes(false))

                if(!hasRegis.includes(false))
                    return 'pass';
                else {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_condition')
                        .color('red')) 
                    return 'fail_party_condition';
                }
            } else {
                player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock')
                    .color('red')) 
                return 'fail_multiblock';
            }
        }
    }


    //Regieleki
    global.staticConditionalEncounters.regieleki = {
        species: 'cobblemon:regieleki',
        properties: {
            level: 40,
            moveSet: [
                'thundercage',
                'electroball',
                'extremespeed',
                'magnetrise'
            ],
            maxedIVs: 3
        },
        interactWith: 'cobblemoneternal:storm_shrine_core',
        spawnSound: 'minecraft:block.note_block.bell',
        spawnOffset: {
            x: 0,
            y: 1,
            z: 0
        },
        multiblockName: 'storm_shrine',
        condition: (player, block, rotation) => {
            if(global.validateMultiblock('storm_shrine', block, rotation)) {
                if(global.partyLevel(player) < 40) {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_level', '40'))
                    return 'fail_party_level';
                }
                let passes = false;

                console.log(global.regiPuzzleIndex['eleki'])
                switch (global.regiPuzzleIndex['eleki']) {
                    case 0:
                        global.partyOf(player).forEach(pokemon => {
                            if(pokemon.species.nationalPokedexNumber == 310
                                    && pokemon.heldItem.id == 'cobblemon:cell_battery')
                                passes = true
                        })
                        break;
                    case 1:
                        // TODO
                        break;
                    case 2:
                        // TODO
                        break;
                    case 3:
                        // TODO
                        break;
                    case 4:
                        // TODO
                        break;
                    default: 
                        throw regiIndexError('eleki');
                }

                if(passes)
                    return 'pass';
                else {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_condition'))
                    return 'fail_party_condition';
                }
            } else {
                player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock')
                    .color('red')) 
                return 'fail_multiblock'
            }
        }
    }


    //Regidrago
    global.staticConditionalEncounters.regidrago = {
        species: 'cobblemon:regidrago',
        properties: {
            level: 40,
            moveSet: [
                'dragonenergy',
                'hyperbeam',
                'earthquake',
                'dragondance'
            ],
            maxedIVs: 3
        },
        interactWith: 'cobblemoneternal:dragon_shrine_core',
        spawnSound: 'minecraft:block.note_block.bell',
        spawnOffset: {
            x: 0,
            y: 1,
            z: 0
        },
        multiblockName: 'dragon_shrine',
        condition: (player, block, rotation) => {
            if(global.validateMultiblock('dragon_shrine', block, rotation)) {
                if(global.partyLevel(player) < 40) {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_level', '40'))
                    return 'fail_party_level';
                }
                let passes = false;

                console.log(global.regiPuzzleIndex['drago'])
                switch (global.regiPuzzleIndex['drago']) {
                    case 0: // Pseudo-Legendary with Draco Meteor
                        global.partyOf(player).forEach(pokemon => {
                            console.log(pokemon.form.labels)
                            if(pokemon.form.labels.contains('powerhouse')
                                && pokemon.moveSet.getMoves().stream().anyMatch(move => move.name == 'dracometeor'))
                                passes = true
                        })
                        break;
                    case 1: // 4+ Dragon-type pokemon
                        let dragons = 0
                        global.partyOf(player).forEach(pokemon => {
                            if(pokemon.form.types.stream().anyMatch(type => type.name == 'dragon'))
                                dragons++
                        })
                        if(dragons >= 4)
                            passes = true
                        break;
                    case 2:
                        // TODO
                        break;
                    case 3:
                        // TODO
                        break;
                    case 4:
                        // TODO
                        break;
                    default: 
                        throw regiIndexError('drago');
                }

                if(passes)
                    return 'pass';
                else {
                    player.setStatusMessage(Text.translate('message.cobblemoneternal.fail_party_condition'))
                    return 'fail_party_condition';
                }
            } else {
                player.setStatusMessage(Text.translate('message.cobblemoneternal.missing_multiblock')
                    .color('red')) 
                return 'fail_multiblock'
            }
        }
    }

    return true;
}