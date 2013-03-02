function loadGear(contain,character){
    contain.append("<div class='gearouter'></div>")
    var outer = contain.find(".gearouter");
    outer.append("<span class='header'><b>Gear</b></span>");
    outer.append("<div class='gearinner'></div>");
    var inner = contain.find(".gearinner");
    $.get("../characters/"+character+"/equipment",function(content){
        var data = $.parseJSON(content);
        for( x in data){
            inner.append( "<span class='gear'>"+data[x]["note"]+"</span>");
        }
    });
}
