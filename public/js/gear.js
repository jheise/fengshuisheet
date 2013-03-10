function loadGear(contain,character){
    var outer = $("<div class='gearouter'></div>");
    outer.appendTo(contain);
    outer.append("<span class='header'><b>Gear</b></span>");
    var inner = $("<div class='gearinner'></div>");
    inner.appendTo(outer);
    var notes = $("<div class='notes'></div>");
    notes.appendTo( inner );
    $.get("../characters/"+character+"/equipment",function(content){
        var data = $.parseJSON(content);
        for( x in data){
            addLine(notes,data[x]["note"],character,"equipment",data[x]["id"],true);
        }
    });
    var addgr = $("<div class='addgeardiv'></div>");
    addgr.appendTo(inner);
    var text = $( "<input type='text' placeholder='write stuff here'>");
    text.appendTo(addgr);
    addgr.append("<button class='newgearbutton' id='gr"+character+"'>Add</button>");
    addgr.hide();
    $(".newgearbutton#gr"+character).click(function(event){
        var geartext = text.val();
        var gearjson = JSON.stringify({"equipment":geartext});
        $.post("../characters/"+character+"/equipment",
            {"data":gearjson},
            function(content){
                console.log("got back "+content);
                var newgear = $.parseJSON(content);
                addLine(notes,newgear["note"],character,"equipment",newgear["id"],false);
                text.val('');
            }
        );
    });
}
