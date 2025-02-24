
const $IronsSounds = Java.loadClass('io.redspace.ironsspellbooks.registries.SoundRegistry')

global.loadLegendaryBirds = () => {

    //Moltres
    global.roamingConditionalEncounters.moltres = {
        species: 'cobblemon:moltres',
        group: 'legendaryBirds',
        weight: 10,
        flyingHeight: 6,
        spawnSound: {
            event: 'minecraft:entity.blaze.shoot'
        },
        textColor: 'red',
        properties: {
            level: 50,
            moveSet: [
                'temperflare',
                'hurricane',
                'ancientpower',
                'sunnyday'
            ],
            maxedIVs: 3
        },
        condition: (player) => {
            /*
            console.log(
                !player.level.raining,
                player.level.getBrightness('sky', player.blockPosition()) > 10,
                playerIsInBiome(player, 'forge:is_desert')
            )
            */
            if(global.partyLevel(player) >= 40
            && !player.level.raining // Clear weather
            && player.level.getBrightness('sky', player.blockPosition()) > 10 // Skylight level 10
            && global.playerIsInBiome(player, 'cobblemon:is_desert')){ // in a Desert biome
                return true;
            } else {
                return false;
            }
        },
        getOddsModifier: (player) => {
            return groupOddsModifier('moltres', global.legendaryGroups.legendaryBirds, 0.5, player)
        }
    }


    //Zapdos
    global.roamingConditionalEncounters.zapdos = {
        species: 'cobblemon:zapdos',
        weight: 10,
        flyingHeight: 6,
        spawnSound: {
            event: 'minecraft:entity.lightning_bolt.impact'
        },
        textColor: 'yellow',
        properties: {
            level: 50,
            moveSet: [
                'electroball',
                'hurricane',
                'thunderwave',
                'raindance'
            ],
            maxedIVs: 3
        },
        condition: (player) => {
            if(global.partyLevel(player) >= 40 
            && player.level.thundering // during a Thunderstorm
            && global.playerIsInBiome(player, 'cobblemon:is_mountain')){ // in a Mountainous biome
                return true;
            } else {
                return false;
            }
        },
        getOddsModifier: (player) => {
            return groupOddsModifier('zapdos', global.legendaryGroups.legendaryBirds, 0.5, player)
        }
    }


    //Articuno
    global.roamingConditionalEncounters.articuno = {
        species: 'cobblemon:articuno',
        weight: 10,
        flyingHeight: 6,
        spawnSound: {
            event: $IronsSounds.THUNDERSTORM_PREPARE.get()
        },
        textColor: 'blue',
        properties: {
            level: 50,
            moveSet: [
                'blizzard',
                'roost',
                'auroraveil',
                'snowscape'
            ],
            maxedIVs: 3
        },
        condition: (player) => {
            if(global.partyLevel(player) >= 40 
            && player.level.raining
            && global.playerIsInBiome(player, 'cobblemon:is_snowy')){
                return true;
            } else {
                return false
            }
        },
        getOddsModifier: (player) => {
            return groupOddsModifier('articuno', global.legendaryGroups.legendaryBirds, 0.5, player)
        }
    }

    return true;
}