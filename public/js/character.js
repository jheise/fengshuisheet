function addEdit(contain,character){
    var editdiv = $("<div class='edit' id='"+character+"'></div>");
    editdiv.appendTo(contain);
    editdiv.append("<span class='editbutton' id='"+character+"'><button type='button'>Edit</button></span>");
    $(".removethis").hide();
    $(".editbutton#"+character).click(function(event){
        console.log( "you clicked edit on "+character );
        $(".schitickadd#"+character).slideToggle(0);
        $(".skilladd").slideToggle(0);
        $(".addgeardiv").slideToggle(0);
        $(".addattackdiv").slideToggle(0);
        $(".removethis").slideToggle(0);
    });
}

function addCharacter(character){
    console.log("addCharacter called for " + character)
    /* add a div for the character to the characters div */
    $('.characters').append( '<div class="character" id="' + character + '">' + "</div>");
    /* grab the div that just got made and add basic divs to be filled out */ 
    var contain = $(".character#"+character);
    contain.append("<span class='char_id'>"+ character + "</span>");
    var char_data = $("<div class='char_data'></div>");
    char_data.appendTo(contain);
    var char_add = $("<div class='char_attr'></div>");
    char_add.appendTo(char_data);

    loadInfo(char_data,character);
    loadSkills(char_add,character);
    loadSchiticks(char_add,character);
    loadAttacks(char_add,character);
    loadGear(char_add,character);

    /* all character info is loaded, create edit button and do things */
    addEdit(char_add,character);
}

$(document).ready(function() {
    $.get("../characters",function(content){
        var characters = $.parseJSON(content);
        for ( x in characters ){
            console.log("adding " + characters[x]);
            addCharacter(characters[x]);
        }
        $(".char_data").slideToggle(5);
        $(".char_id").click(function(event){
            console.log(".character has been clicked " + characters[x]);
            $(this).next(this).slideToggle(300);
            $(".dice").slideToggle(300);
        });
    });
});
