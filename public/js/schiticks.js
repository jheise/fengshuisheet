function addSchitick(contain,schitick,character,id,dohide){
    console.log("addSchitick called with "+schitick);
    var schitickdiv = $("<div class='schitick'></div>");
    schitickdiv.appendTo(contain);
    schitickdiv.append("<span class='schitickspan'>"+schitick+"</span>");
    var removethis = $("<span class='removethis' id='schitick"+id+"'>X</span>");
    removethis.appendTo(schitickdiv);
    if( dohide ){
        removethis.hide();
    }
    $("#schitick"+id).click(function(event){
            var target = $(this).parent();
            $.delete_("../characters/"+character+"/schiticks/"+id,function(content){
                if( content == "success" ){
                    target.remove();
                } else {
                    console.log(content);
                }
            });
    });
}

function loadSchiticks(contain,character){
    var outer = $("<div class='schitickouter'></div>");
    outer.appendTo(contain);
    outer.append("<span class='header'><b>Schiticks</b></span>");
    var inner =$("<div class='schitickinner'></div>");
    inner.appendTo(outer);
    var schiticks = $("<div class='schiticks' id='"+character+"'></div>");
    schiticks.appendTo(inner);
    $.get("../characters/"+character+"/schiticks",function(content){
        var data = $.parseJSON(content);
        for( x in data ){
            var schitickstring = data[x]["schitick"]+" / "+data[x]["chi"]+" / "+data[x]["shots"]+" / "+data[x]["notes"];
            addSchitick(schiticks,schitickstring,character,data[x]["id"],true);
        }
    });
    var add = $( "<div class='schitickadd' id='"+character+"'></div>");
    add.appendTo(inner);
    var text = $("<input type='text'>");
    text.appendTo(add);
    add.append("<button class='newschitickbutton' id='"+character+"'>Add</button>");
    $(".newschitickbutton#"+character).click(function(event){
        var textdata = text.val();
        var jsontext = JSON.stringify({"schitick":textdata});
        $.post("../characters/"+character+"/schiticks",
            {"data":jsontext},
            function(content){
                console.log( "got back "+content );
                var newschitick = $.parseJSON(content);
                var newstring =  newschitick["schitick"] + " / " + newschitick["chi"] + " / " + newschitick["shots"] + " / " + newschitick["notes"];
                addSchitick(schiticks,newstring,character,newschitick["id"],false);
                text.val('');
        });
    });
    add.hide();
}
