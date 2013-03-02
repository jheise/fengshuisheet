function loadAttacks(contain,character){
    contain.append("<div class='attackouter'></div>");
    var outer = contain.find(".attackouter");
    outer.append("<span class='header'><b>Attacks</b></span>");
    outer.append("<div class='attackinner'></div>");
    var inner = contain.find(".attackinner");
    $.get("../characters/"+character+"/attacks",function(content){
        var data = $.parseJSON(content);
        for( x in data){
            inner.append("<span class='attack'>"+data[x]["name"]+": " + data[x]["dmg"]+" / "+data[x]["conceal"]+" / "+data[x]["capacity"]+" / " +data[x]["notes"]+"</span>");
        }
    });
}
