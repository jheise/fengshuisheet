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
    contain.append("<div class='char_info'></div>");
    contain.append("<div class='char_stats'></div>");
    var info  = contain.find(".char_info");
    var stats = contain.find(".char_stats");
    stats.append( '<span class="header"><b>Stats</b></span>');
    stats.append( '<div class="stat" id="bod"></div>' );
    stats.append( '<div class="stat" id="ref"></div>' );
    stats.append( '<div class="stat" id="mnd"></div>' );
    stats.append( '<div class="stat" id="chi"></div>' );
    $.get("../characters/" + character,function(content){
        var data = $.parseJSON(content);
        /* put in the most required types */
        info.append( 'Character Type: ' + data["char_type"]+ '<br/>');
        info.append( 'Juncture: ' + data["juncture"]+ '<br/>');

        /* body stats */
        bod = stats.find(".stat#bod");
        bod.append("<span class='mainstat' id='bod'><b>BODY:"+data["bod"]+"</b></span>");
        addsubstat(data,"mov",bod);
        addsubstat(data,"str",bod);
        addsubstat(data,"con",bod);
        addsubstat(data,"tgh",bod);

        /* reflex stats */
        ref = stats.find(".stat#ref");
        ref.append("<span class='mainstat' id='ref'><b>REFLEX: "+data["ref"]+"</b></span>");
        addsubstat(data,"agl",ref);
        addsubstat(data,"dex",ref);
        addsubstat(data,"spd",ref);

        /* Mind stats */
        mnd = stats.find(".stat#mnd");
        mnd.append("<span class='mainstat' id='mnd'><b>MIND: "+data["mnd"]+"</b></span>");
        addsubstat(data,"cha",mnd);
        addsubstat(data,"int",mnd);
        addsubstat(data,"per",mnd);
        addsubstat(data,"wil",mnd);

        /* Chi stats */
        chi = stats.find(".stat#chi");
        chi.append("<span class='mainstat' id='chi'><b>CHI: "+data["chi"]+"</b></span>");
        addsubstat(data,"fort",chi);
        addsubstat(data,"kfu",chi);
        addsubstat(data,"mag",chi);
    });

}
