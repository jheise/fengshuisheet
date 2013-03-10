function addLine(contain,newline,character,addtype,id,dohide){
    console.log("addLine called with "+newline);
    var newdiv = $("<div class='"+addtype+"'></div>");
    newdiv.appendTo(contain);
    newdiv.append("<span class='"+addtype+"span'>"+newline+"</span>");
    var removethis = $("<span class='removethis' id='"+addtype+id+"'>X</span>");
    removethis.appendTo(newdiv);
    if( dohide ){
        removethis.hide();
    }
    $("#"+addtype+id).click(function(event){
            var target = $(this).parent();
            $.delete_("../characters/"+character+"/"+addtype+"/"+id,function(content){
                if( content == "success" ){
                    target.remove();
                } else {
                    console.log(content);
                }
            });
    });
}
