function addsubstat(data,stat,target){
    var expanded = "blank";
    switch(stat){
        case "mov":
            expanded = "Move";
            break;
        case "str":
            expanded = "Strength";
            break;
        case "con":
            expanded = "Constitution";
            break;
        case "tgh":
            expanded = "Toughness";
            break;
        case "agl":
            expanded = "Agility";
            break;
        case "dex":
            expanded = "Dexterity";
            break;
        case "spd":
            expanded = "Speed";
            break;
        case "cha":
            expanded = "Charisma";
            break;
        case "int":
            expanded = "Intelligence";
            break;
        case "per":
            expanded = "Perception";
            break;
        case "wil":
            expanded = "Will Power";
            break;
        case "fort":
            expanded = "Fortune";
            break;
        case "kfu":
            expanded = "Kung Fu";
            break;
        case "mag":
            expanded = "Magic";
            break;
    }
    if( data[stat] ){
        target.append("<span class='substat'>" + expanded + ": " + data[stat] + "</span>");
    }
}

function loadInfo(contain,character){
    var info = $("<div class='char_info'></div>");
    var stats = $("<div class='char_stats'></div>");
    info.appendTo(contain);
    stats.appendTo(contain);
    stats.append( '<span class="header"><b>Stats</b></span>');
    var bod = $( '<div class="stat" id="bod"></div>' );
    var ref = $( '<div class="stat" id="ref"></div>' );
    var mnd = $( '<div class="stat" id="mnd"></div>' );
    var chi = $( '<div class="stat" id="chi"></div>' );
    bod.appendTo(stats)
    ref.appendTo(stats)
    mnd.appendTo(stats)
    chi.appendTo(stats)
    $.get("../characters/" + character,function(content){
        var data = $.parseJSON(content);
        /* put in the most required types */
        info.append( 'Character Type: ' + data["char_type"]+ '<br/>');
        info.append( 'Juncture: ' + data["juncture"]+ '<br/>');

        /* body stats */
        bod.append("<span class='mainstat' id='bod'><b>BODY: "+data["bod"]+"</b></span>");
        addsubstat(data,"mov",bod);
        addsubstat(data,"str",bod);
        addsubstat(data,"con",bod);
        addsubstat(data,"tgh",bod);

        /* reflex stats */
        ref.append("<span class='mainstat' id='ref'><b>REFLEX: "+data["ref"]+"</b></span>");
        addsubstat(data,"agl",ref);
        addsubstat(data,"dex",ref);
        addsubstat(data,"spd",ref);

        /* Mind stats */
        mnd.append("<span class='mainstat' id='mnd'><b>MIND: "+data["mnd"]+"</b></span>");
        addsubstat(data,"cha",mnd);
        addsubstat(data,"int",mnd);
        addsubstat(data,"per",mnd);
        addsubstat(data,"wil",mnd);

        /* Chi stats */
        chi.append("<span class='mainstat' id='chi'><b>CHI: "+data["chi"]+"</b></span>");
        addsubstat(data,"fort",chi);
        addsubstat(data,"kfu",chi);
        addsubstat(data,"mag",chi);
    });

}
