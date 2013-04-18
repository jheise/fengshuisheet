function loadAttacks(contain,character){
    var outer = $("<div class='attackouter'></div>");
    outer.appendTo(contain);
    outer.append("<span class='header'><b>Attacks</b></span>");
    var inner = $("<div class='attackinner'></div>");
    inner.appendTo(outer);
    var attacks = $("<div class='attacks'></div>");
    attacks.appendTo(inner);
    $.get("../characters/"+character+"/attacks",function(content){
        var data = $.parseJSON(content);
        for( x in data){
            addLine(attacks,
                data[x]["name"]+": "+data[x]["dmg"]+" / "+data[x]["conceal"]+" / "+data[x]["capacity"]+" / "+data[x]["notes"],
                character,
                "attacks",
                data[x]["id"],
                true
            );
        }

    });
    var addattack = $("<div class='addattackdiv' ></div>");
    addattack.appendTo(inner);
    var text = $( "<input type='text' placeholder='name/dmg/conceal/capacity/notes'>");
    text.appendTo(addattack);
    addattack.append("<button class='newattackbutton' id='atk"+character+"'>Add</button>");
    addattack.hide()
    $(".newattackbutton#atk"+character).click(function(event){
        var atkjson = JSON.stringify({"attack":text.val()});
        $.post("../characters/"+character+"/attacks",
            {"data":atkjson},
            function(content){
                console.log("got back "+content);
                var newattack = $.parseJSON(content);
                var capacity = "-";
                if( newattack["capacity"] != "0" ){
                    capacity = newattack["capacity"];
                }
                var newstring =  newattack["name"]+ ": " + newattack["dmg"]
                     + " / " + newattack["conceal"]
                     + " / " + capacity
                     + " / " + newattack["notes"];
                addLine(
                    attacks,
                    newstring,
                    character,
                    "attacks",
                    newattack["id"],
                    false
                );
                text.val('');
            }
        );

    });
}
