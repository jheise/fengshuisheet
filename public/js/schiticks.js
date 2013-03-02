function addSchitick(contain,schitick,character,id){
    console.log("addSchitick called with "+schitick);
    /*contain.append("<div class='schitick' id='"+id+"'></div>");*/
    /*var schitickdiv = contain.find(".schitick#"+id);*/
    var schitickdiv = $("<div class='schitick'></div>");
    schitickdiv.appendTo(contain);
    schitickdiv.append("<span class='schitickspan'>"+schitick+"</span>");
    schitickdiv.append("<span class='removethis' id='schitick"+id+"'>X</span>");
    $("#schitick"+id).click(function(event){
            /*console.log("delete clicked");*/
            var target = $(this).parent();
            /*console.log("first test");*/
            /*console.log(this);*/
            /*console.log("second test");*/
            /*console.log($(this));*/
            $.delete_("../characters/"+character+"/schiticks/"+id,function(content){
                if( content == "success" ){
                    target.remove();
                } else {
                    console.log(content);
                }
            });
            /*console.log( "this.class is " + $(this).attr("class"));*/
            /*console.log( "this.id is " + $(this).attr("id"));*/
            /*console.log( "this.parent.id is " + target.attr("id"));*/
            /*console.log( "this.parent.class is " + target.attr("class"));*/
            /*console.log( "this.parent.parent.id is " + character);*/
            /*target.remove();*/

    });
}

function loadSchiticks(contain,character){
    contain.append("<div class='schitickouter'></div>")
    var outer = contain.find(".schitickouter");
    outer.append("<span class='header'><b>Schiticks</b></span>");
    outer.append("<div class='schitickinner'></div>");
    var inner = contain.find(".schitickinner");
    inner.append("<div class='schiticks' id='"+character+"'></div>");
    var schiticks = inner.find(".schiticks");
    $.get("../characters/"+character+"/schiticks",function(content){
        var data = $.parseJSON(content);
        for( x in data ){
            var schitickstring = data[x]["schitick"]+" / "+data[x]["chi"]+" / "+data[x]["shots"]+" / "+data[x]["notes"];
            addSchitick(schiticks,schitickstring,character,data[x]["id"]);
        }
    });
    inner.append( "<div class='schitickadd' id='"+character+"'></div>");
    var add = inner.find(".schitickadd");
    add.append("<textarea class='newschitick' rows='1' cols='20' style='resize:none'>");
    add.append("<button class='newschitickbutton' id='"+character+"'>Add</button>");
    $(".newschitickbutton#"+character).click(function(event){
        var text = $(this).parent().find(".newschitick").val();
        var hashtext = { "schitick":text };
        var jsontext = JSON.stringify(hashtext)
        $.post("../characters/"+character+"/schiticks",{"data":jsontext}).done(function(content){
            console.log( "got back "+content );
            schiticks.append( "<span class='schitick'>"+text+"</span>");
            $(this).parent().find(".newschitick").val('');
        });
        console.log( "json version of data is "+jsontext);

        /*alert("newschitick clicked with text " + text);*/
    });
    /*add.hide();*/

}
