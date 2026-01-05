//priority: 5


//Array of simple items
const simpleItems = [
    'zygarde_cube', // complex code is implemented in an Entity Interaction event, along with other manual form changes
    'mewtant_genome'
]


//Array of simple blocks
const simpleBlocks = [
    
]

//Blocks for Static Conditional Encounters
// if you want to make it more complex, you can manually define it.
const staticSpawnerBlocks = {
    'cloning_machine': {
        soundType: 'metal',
        hardness: 1.5
    },
    //Regis
    'stone_shrine': {
        soundType: 'stone'
    },
    'ice_shrine': {
        soundType: 'glass'
    },
    'steel_shrine': {
        soundType: 'metal'
    },
    'storm_shrine': {
        soundType: 'amethyst'
    },
    'dragon_shrine': {
        soundType: 'bone_block'
    },
    'regigigas': {
        soundType: 'stone'
    }
}


StartupEvents.registry('item', event => {
    simpleItems.forEach(item => {
        event.create(`cobblemoneternal:${item}`)
            .name(stack => Text.translate(`item.cobblemoneternal.${item}.name`))
    })
})


StartupEvents.registry('block', event => {
    simpleBlocks.forEach(block => {
        event.create(`cobblemoneternal:${block}`)
            //.name(stack => Text.translate(`block.cobblemoneternal.${block}.name`)) // this not work :(
    })

    Object.keys(staticSpawnerBlocks).forEach(block => {
        let properties = staticSpawnerBlocks[block]
        event.create(`cobblemoneternal:${block}_core`, 'cardinal')
            .soundType(properties.soundType)
            .hardness(properties.hardness ? properties.hardness : 50.0)
            .tagBlock('cobblemoneternal:static_spawner_block')
            .placementState(ctx => {
                BlockProperties.FACING, ctx.getClickedFace().getAxis()
            })
            .item(builder => builder.tooltip(Text.translate('cobblemoneternal.intentionally_untextured').color('red')))
    })
})