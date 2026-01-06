ServerEvents.tags('item', event => {

    //Tags for Quests

    event.add('cobblemoneternal:backpacks', /sophisticatedbackpacks:.*backpack/)

    event.add('cobblemoneternal:pokefinder', /cobblenav:pokefinder_item_.*/)


    //Berry util tags

    event.add('cobblemoneternal:berry/status_cure', [
        'cobblemon:cheri_berry',
        'cobblemon:chesto_berry',
        'cobblemon:pecha_berry',
        'cobblemon:rawst_berry',
        'cobblemon:aspear_berry',
        'cobblemon:lum_berry'
    ])

    event.add('cobblemoneternal:berry/healing', [
        'cobblemon:oran_berry',
        'cobblemon:sitrus_berry',
        'cobblemon:figy_berry',
        'cobblemon:wiki_berry',
        'cobblemon:mago_berry',
        'cobblemon:aguav_berry',
        'cobblemon:iapapa_berry',
        'cobblemon:enigma_berry'
    ])

    event.add('cobblemoneternal:berry/effectiveness_reducing', [
        'cobblemon:chilan_berry',
        'cobblemon:occa_berry',
        'cobblemon:passho_berry',
        'cobblemon:wacan_berry',
        'cobblemon:rindo_berry',
        'cobblemon:yache_berry',
        'cobblemon:chople_berry',
        'cobblemon:kebia_berry',
        'cobblemon:shuca_berry',
        'cobblemon:coba_berry',
        'cobblemon:papaya_berry',
        'cobblemon:tanga_berry',
        'cobblemon:charti_berry',
        'cobblemon:kasib_berry',
        'cobblemon:haban_berry',
        'cobblemon:colbur_berry',
        'cobblemon:babiri_berry',
        'cobblemon:roseli_berry'
    ])

    event.add('cobblemoneternal:berry/pinch_boost', [
        'cobblemon:liechi_berry',
        'cobblemon:ganlon_berry',
        'cobblemon:salac_berry',
        'cobblemon:petaya_berry',
        'cobblemon:apicot_berry',
        'cobblemon:lansat_berry',
        'cobblemon:starf_berry',
        'cobblemon:micle_berry'
    ])

    event.add('cobblemoneternal:berry/ev_reducing', [
        'cobblemon:pomeg_berry',
        'cobblemon:kelpsy_berry',
        'cobblemon:qualot_berry',
        'cobblemon:hondew_berry',
        'cobblemon:grepa_berry',
        'cobblemon:tamato_berry'
    ])


    //Form change item tags
    // for instances where multiple items should change a form
    //event.add('cobblemoneternal:forme_change/rotom-fan', [/refurbished_furniture:.*_ceiling_fan/])
    //event.add('cobblemoneternal:forme_change/rotom-frost', [/refurbished_furniture:.*_fridge/])
    //event.add('cobblemoneternal:forme_change/rotom-heat', [/refurbished_furniture:.*_stove/])
    //event.add('cobblemoneternal:forme_change/rotom-mow', [])
    //event.add('cobblemoneternal:forme_change/rotom-wash', [])


    //tag for hiding unfinished

    event.add('cobblemoneternal:unfinished', [
        /cobblemoneternal:.*_core/,
        'cobblemoneternal:zygarde_cube',
        'cobblemoneternal:mewtant_genome'
    ])

})


ServerEvents.tags('block', event => {
    event.add('cobblemon:berry_soil', 'farmersdelight:rich_soil_farmland')
})