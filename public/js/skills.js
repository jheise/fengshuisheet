function addSkill(contain, skill, character, id, dohide){
    console.log("addSkill called with "+skill+"with id "+id);
    var skilldiv = $("<div class='skill'></div>");
    skilldiv.appendTo(contain);
    skilldiv.append("<span class='skillspan'>"+skill+"</span>");
    var removethis = $("<span class='removethis' id='skill"+character+id+"'>X</span>");
    removethis.appendTo(skilldiv);
    if( dohide ){
        removethis.hide();
    }
    $("#skill"+character+id).click(function(event){
        var target = $(this).parent();
        $.delete_("../characters/"+character+"/skills/"+id,function(content){
            if( content == "success" ){
                target.remove();
            } else {
                console.log("got back "+content+".");
            }
        });
    });

}

function loadSkills(contain,character){
    var outer =  $("<div class='skillsouter'></div>");
    outer.appendTo(contain);
    outer.append("<span class='header'><b>Skills</b></span>");
    var inner = $("<div class='skillsinner'></div>");
    inner.appendTo(outer);
    var skills = $("<div class='skills'></div>");
    skills.appendTo(inner);
    $.get("../characters/"+character+"/skills",function(content){
        var data = $.parseJSON(content);
        for( x in data){
        /*inner.append("<span class='skill'>"+data[x]["skill"]+": " + data[x]["ga"]+" / "+data[x]["bon"]+" / "+data[x]["av"]+"</span>");*/
        /*console.log("adding skill with id " + newskill["id"]);*/
            skillstr = data[x]["skill"]+": " + data[x]["ga"]+" / "+data[x]["bon"]+" / "+data[x]["av"];
            addSkill(skills,skillstr,character,data[x]["id"],true);
        }
    });
    var addsk = $("<div class='skilladd'></div>");
    addsk.appendTo(inner);
    var textsk = $("<input type='text' placeholder='skill name/atribute/ga/bonus'>");
    textsk.appendTo(addsk);
    addsk.append("<button class='newskillbutton' id='sk"+character+"'>Add</button>");
    addsk.hide();

    $(".newskillbutton#sk"+character).click(function(event){
        var skilltext = textsk.val();
        var skilljson = JSON.stringify({"skill":skilltext});
        $.post("../characters/"+character+"/skills",
            {"data":skilljson},
            function(content){
                console.log("got back "+content);
                var newskill = $.parseJSON(content);
                var newstring = newskill["skill"] + ": " + newskill["ga"] + " / " + newskill["bon"] + " / " + newskill["av"];
                addSkill(skills,newstring,character,newskill["id"],false);
                textsk.val('');
            });
    });
}
