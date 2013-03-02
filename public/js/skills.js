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

function loadSkills(contain,character){
    contain.append("<div class='skillsouter'></div>");
    var outer = contain.find(".skillsouter");
    outer.append("<span class='header'><b>Skills</b></span>");
    outer.append("<div class='skillsinner'></div>");
    var inner = contain.find(".skillsinner");
    $.get("../characters/"+character+"/skills",function(content){
        var data = $.parseJSON(content);
        for( x in data){
            inner.append("<span class='skill'>"+data[x]["skill"]+": " + data[x]["ga"]+" / "+data[x]["bon"]+" / "+data[x]["av"]+"</span>");
        }
    });
}
